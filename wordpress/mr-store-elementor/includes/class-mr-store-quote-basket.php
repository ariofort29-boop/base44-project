<?php
/**
 * Quotation basket: the storefront's "no prices, request a quote" workflow.
 *
 * The React prototype kept the basket in React state and never persisted an
 * inquiry. Here the basket lives in the browser (localStorage) and every sent
 * request is stored as an `mr_quote` entry in WordPress, so nothing is lost
 * when a visitor closes the tab.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers the quote entry type, the AJAX endpoint and the site-wide basket.
 */
final class MR_Store_Quote_Basket {

	/**
	 * Non-public post type holding submitted quotation requests.
	 */
	const POST_TYPE = 'mr_quote';

	/**
	 * Singleton instance.
	 *
	 * @var MR_Store_Quote_Basket|null
	 */
	private static $instance = null;

	/**
	 * Returns the singleton.
	 *
	 * @return MR_Store_Quote_Basket
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Hooks the class in.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'wp_ajax_mr_store_quote_submit', array( $this, 'handle_submit' ) );
		add_action( 'wp_ajax_nopriv_mr_store_quote_submit', array( $this, 'handle_submit' ) );
		add_action( 'wp_footer', array( $this, 'render_basket' ), 20 );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'admin_column_value' ), 10, 2 );
	}

	/**
	 * Stores a quotation request as an admin-visible entry.
	 */
	public function register_post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'          => array(
					'name'          => __( 'استعلام‌ها', 'mr-store' ),
					'singular_name' => __( 'استعلام', 'mr-store' ),
					'menu_name'     => __( 'استعلام‌های عمده', 'mr-store' ),
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_rest'    => false,
				'menu_icon'       => 'dashicons-clipboard',
				'supports'        => array( 'title', 'editor' ),
				'capability_type' => 'post',
				'map_meta_cap'    => true,
			)
		);
	}

	/**
	 * Persists a basket submission.
	 */
	public function handle_submit() {
		check_ajax_referer( 'mr_store_quote', 'nonce' );

		$name    = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
		$company = isset( $_POST['company'] ) ? sanitize_text_field( wp_unslash( $_POST['company'] ) ) : '';
		$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
		$country = isset( $_POST['country'] ) ? sanitize_text_field( wp_unslash( $_POST['country'] ) ) : '';
		$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
		$items   = isset( $_POST['items'] ) ? json_decode( wp_unslash( $_POST['items'] ), true ) : array();

		if ( ! $name || ! is_email( $email ) ) {
			wp_send_json_error( array( 'message' => __( 'نام و ایمیل کاری الزامی است.', 'mr-store' ) ), 400 );
		}

		$clean_items = array();
		if ( is_array( $items ) ) {
			foreach ( $items as $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}
				$clean_items[] = array(
					'name'    => isset( $item['name'] ) ? sanitize_text_field( $item['name'] ) : '',
					'meta'    => isset( $item['meta'] ) ? sanitize_text_field( $item['meta'] ) : '',
					'qty'     => isset( $item['qty'] ) ? sanitize_text_field( $item['qty'] ) : '',
					'supplier' => isset( $item['supplier'] ) ? sanitize_text_field( $item['supplier'] ) : '',
				);
			}
		}

		$body = array();
		foreach ( $clean_items as $item ) {
			$body[] = trim( $item['name'] . ' — ' . $item['meta'] . ' — ' . $item['supplier'] );
		}

		$post_id = wp_insert_post(
			array(
				'post_type'    => self::POST_TYPE,
				'post_status'  => 'publish',
				'post_title'   => trim( $name . ( $company ? ' · ' . $company : '' ) ),
				'post_content' => implode( "\n", $body ) . "\n\n" . $message,
				'meta_input'   => array(
					'mr_name'    => $name,
					'mr_company' => $company,
					'mr_email'   => $email,
					'mr_country' => $country,
					'mr_items'   => wp_json_encode( $clean_items ),
				),
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			wp_send_json_error( array( 'message' => __( 'ثبت درخواست ممکن نشد.', 'mr-store' ) ), 500 );
		}

		wp_mail(
			(string) get_option( 'admin_email' ),
			sprintf( /* translators: 1: contact name, 2: company */ __( 'استعلام عمده جدید — %1$s (%2$s)', 'mr-store' ), $name, $company ),
			sprintf(
				"نام: %s\nشرکت: %s\nایمیل: %s\nکشور: %s\n\nاقلام:\n%s\n\nتوضیح:\n%s\n\n%s",
				$name,
				$company,
				$email,
				$country,
				implode( "\n", $body ),
				$message,
				admin_url( 'post.php?post=' . $post_id . '&action=edit' )
			)
		);

		wp_send_json_success(
			array(
				'id'      => $post_id,
				'message' => __( 'درخواست شما ثبت شد.', 'mr-store' ),
			)
		);
	}

	/**
	 * Renders the floating trigger and the basket dialog on every page.
	 */
	public function render_basket() {
		if ( is_admin() ) {
			return;
		}
		?>
		<div class="mr-quote" data-mr-quote-root hidden>
			<button type="button" class="mr-quote__dock" data-mr-quote-open>
				<span class="mr-quote__dock-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18l-1.6 10.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 6Z"/><path d="M8.5 6a3.5 3.5 0 0 1 7 0"/></svg>
				</span>
				<span class="mr-quote__dock-label"><?php esc_html_e( 'فهرست استعلام', 'mr-store' ); ?></span>
				<span class="mr-quote__count" data-mr-quote-count>0</span>
			</button>

			<div class="mr-quote__overlay" data-mr-quote-close hidden></div>

			<div class="mr-quote__panel" role="dialog" aria-modal="true" aria-labelledby="mr-quote-title" hidden>
				<header class="mr-quote__head">
					<h2 id="mr-quote-title"><?php esc_html_e( 'استعلام قیمت عمده', 'mr-store' ); ?></h2>
					<button type="button" class="mr-quote__close" data-mr-quote-close aria-label="<?php esc_attr_e( 'بستن', 'mr-store' ); ?>">&times;</button>
				</header>

				<div class="mr-quote__body">
					<ul class="mr-quote__items" data-mr-quote-items></ul>

					<form class="mr-quote__form" data-mr-quote-form>
						<div class="mr-quote__grid">
							<label><span><?php esc_html_e( 'نام و نام خانوادگی *', 'mr-store' ); ?></span><input required name="name" type="text" autocomplete="name" /></label>
							<label><span><?php esc_html_e( 'نام شرکت', 'mr-store' ); ?></span><input name="company" type="text" autocomplete="organization" /></label>
							<label><span><?php esc_html_e( 'ایمیل کاری *', 'mr-store' ); ?></span><input required name="email" type="email" autocomplete="email" /></label>
							<label><span><?php esc_html_e( 'کشور مقصد', 'mr-store' ); ?></span><input name="country" type="text" autocomplete="country-name" /></label>
						</div>
						<label class="mr-quote__wide"><span><?php esc_html_e( 'توضیح درخواست', 'mr-store' ); ?></span><textarea name="message" rows="4"></textarea></label>

						<p class="mr-quote__status" data-mr-quote-status role="status"></p>

						<button type="submit" class="mr-btn mr-btn--gold"><?php esc_html_e( 'ارسال درخواست', 'mr-store' ); ?></button>
					</form>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Adds a contact column to the quote-entry list table.
	 *
	 * @param array $columns Existing columns.
	 * @return array
	 */
	public function admin_columns( $columns ) {
		$columns['mr_contact'] = __( 'تماس', 'mr-store' );
		return $columns;
	}

	/**
	 * Prints the contact column value.
	 *
	 * @param string $column  Column key.
	 * @param int    $post_id Post id.
	 */
	public function admin_column_value( $column, $post_id ) {
		if ( 'mr_contact' !== $column ) {
			return;
		}
		printf(
			'%s<br><span class="description">%s · %s</span>',
			esc_html( (string) get_post_meta( $post_id, 'mr_email', true ) ),
			esc_html( (string) get_post_meta( $post_id, 'mr_company', true ) ),
			esc_html( (string) get_post_meta( $post_id, 'mr_country', true ) )
		);
	}
}
