<?php
/**
 * Plugin Name:       MR Store — Elementor Marketplace Kit
 * Plugin URI:        https://mirexport-store.ir/
 * Description:       Native Elementor widgets, assets and templates for the MR Store international B2B marketplace (cosmetics, FMCG, organic).
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            MR Store
 * License:           GPL-2.0-or-later
 * Text Domain:       mr-store
 * Requires Plugins:  elementor
 *
 * The plugin is the only PHP the Elementor templates depend on:
 * every section that Elementor cannot express natively (scroll-scrubbed hero
 * film, living botanical vine frames, the interactive Eurasia map, the
 * server-rendered catalogue and the quotation basket) is a real Elementor
 * widget registered here, so it stays editable in the Elementor editor.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

define( 'MR_STORE_VERSION', '1.0.0' );
define( 'MR_STORE_FILE', __FILE__ );
define( 'MR_STORE_PATH', plugin_dir_path( __FILE__ ) );
define( 'MR_STORE_URL', plugin_dir_url( __FILE__ ) );

require_once MR_STORE_PATH . 'includes/class-mr-store-data.php';
require_once MR_STORE_PATH . 'includes/class-mr-store-quote-basket.php';

/**
 * Boots the Elementor integration.
 */
final class MR_Store_Elementor {

	/**
	 * Minimum Elementor version that ships Flexbox Containers.
	 */
	const MIN_ELEMENTOR = '3.16.0';

	/**
	 * Singleton instance.
	 *
	 * @var MR_Store_Elementor|null
	 */
	private static $instance = null;

	/**
	 * Returns the singleton.
	 *
	 * @return MR_Store_Elementor
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Hooks everything up.
	 */
	private function __construct() {
		add_action( 'plugins_loaded', array( $this, 'boot' ) );
		add_action( 'admin_notices', array( $this, 'maybe_render_notice' ) );
	}

	/**
	 * True when Elementor is active and new enough.
	 *
	 * @return bool
	 */
	public static function elementor_ready() {
		return defined( 'ELEMENTOR_VERSION' ) && version_compare( ELEMENTOR_VERSION, self::MIN_ELEMENTOR, '>=' );
	}

	/**
	 * Registers widgets, category, assets and the header/footer locations.
	 */
	public function boot() {
		// Front-end assets are registered even without Elementor: they are also
		// used by the plugin's own quote basket in the footer.
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );

		if ( ! self::elementor_ready() ) {
			return;
		}

		require_once MR_STORE_PATH . 'includes/widgets/class-mr-store-widget-hero.php';
		require_once MR_STORE_PATH . 'includes/widgets/class-mr-store-widget-botanical-card.php';
		require_once MR_STORE_PATH . 'includes/widgets/class-mr-store-widget-eurasia-map.php';
		require_once MR_STORE_PATH . 'includes/widgets/class-mr-store-widget-catalog-grid.php';

		add_action( 'elementor/elements/categories_registered', array( $this, 'register_category' ) );
		add_action( 'elementor/widgets/register', array( $this, 'register_widgets' ) );
		add_action( 'elementor/frontend/after_register_scripts', array( $this, 'register_assets' ) );
		add_action( 'elementor/frontend/after_register_styles', array( $this, 'register_assets' ) );

		if ( defined( 'ELEMENTOR_PRO_VERSION' ) ) {
			add_action( 'elementor/theme/register_locations', array( $this, 'register_locations' ) );
		}
	}

	/**
	 * Adds the "MR Store" widget category.
	 *
	 * @param \Elementor\Elements_Manager $elements_manager Elementor manager.
	 */
	public function register_category( $elements_manager ) {
		$elements_manager->add_category(
			'mr-store',
			array(
				'title' => __( 'MR Store', 'mr-store' ),
				'icon'  => 'eicon-woocommerce',
			)
		);
	}

	/**
	 * Registers the plugin's four Elementor widgets.
	 *
	 * @param \Elementor\Widgets_Manager $widgets_manager Elementor manager.
	 */
	public function register_widgets( $widgets_manager ) {
		$widgets_manager->register( new MR_Store_Widget_Hero() );
		$widgets_manager->register( new MR_Store_Widget_Botanical_Card() );
		$widgets_manager->register( new MR_Store_Widget_Eurasia_Map() );
		$widgets_manager->register( new MR_Store_Widget_Catalog_Grid() );
	}

	/**
	 * Adds header/footer theme locations for Elementor Pro's Theme Builder.
	 *
	 * @param \ElementorPro\Modules\ThemeBuilder\Classes\Locations_Manager $manager Locations manager.
	 */
	public function register_locations( $manager ) {
		$manager->register_core_location( 'header' );
		$manager->register_core_location( 'footer' );
	}

	/**
	 * Declares a theme that supports Elementor Pro's header/footer locations.
	 */
	public function register_assets() {
		wp_register_style(
			'mr-store-fonts',
			'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Vazirmatn:wght@300;400;500;600;700&display=swap',
			array(),
			null
		);

		wp_register_style(
			'mr-store',
			MR_STORE_URL . 'assets/css/mr-store.css',
			array( 'mr-store-fonts' ),
			MR_STORE_VERSION
		);

		wp_register_script(
			'mr-store-botanical',
			MR_STORE_URL . 'assets/js/mr-botanical.js',
			array(),
			MR_STORE_VERSION,
			true
		);

		wp_register_script(
			'mr-store-hero',
			MR_STORE_URL . 'assets/js/mr-hero.js',
			array(),
			MR_STORE_VERSION,
			true
		);

		wp_register_script(
			'mr-store-map',
			MR_STORE_URL . 'assets/js/mr-map.js',
			array(),
			MR_STORE_VERSION,
			true
		);

		// The quote basket is site-wide: it renders in wp_footer on every page.
		wp_register_script(
			'mr-store-quote',
			MR_STORE_URL . 'assets/js/mr-quote.js',
			array(),
			MR_STORE_VERSION,
			true
		);

		wp_enqueue_style( 'mr-store' );
		wp_enqueue_script( 'mr-store-quote' );

		wp_localize_script(
			'mr-store-quote',
			'mrStoreQuote',
			array(
				'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'mr_store_quote' ),
				'priceTag' => MR_Store_Data::get( 'price_label' ),
				'strings'  => array(
					'empty'    => __( 'فهرست استعلام خالی است.', 'mr-store' ),
					'sent'     => __( 'درخواست شما ثبت شد. تیم بازرگانی حداکثر تا یک روز کاری پاسخ می‌دهد.', 'mr-store' ),
					'error'    => __( 'ارسال درخواست ممکن نشد. لطفاً دوباره تلاش کنید.', 'mr-store' ),
					'added'    => __( 'به فهرست استعلام افزوده شد.', 'mr-store' ),
					'submit'   => __( 'ارسال درخواست', 'mr-store' ),
					'email'    => __( 'ایمیل کاری', 'mr-store' ),
					'name'     => __( 'نام و نام خانوادگی', 'mr-store' ),
					'company'  => __( 'نام شرکت', 'mr-store' ),
					'country'  => __( 'کشور مقصد', 'mr-store' ),
					'message'  => __( 'توضیح درخواست', 'mr-store' ),
					'remove'   => __( 'حذف', 'mr-store' ),
					'quote'    => __( 'استعلام قیمت عمده', 'mr-store' ),
					'close'    => __( 'بستن', 'mr-store' ),
					'list'     => __( 'فهرست استعلام', 'mr-store' ),
				),
			)
		);
	}

	/**
	 * Explains what is missing when Elementor is absent or too old.
	 */
	public function maybe_render_notice() {
		if ( self::elementor_ready() ) {
			return;
		}

		printf(
			'<div class="notice notice-warning"><p>%s</p></div>',
			esc_html(
				sprintf(
					/* translators: %s: minimum Elementor version. */
					__( 'MR Store templates need Elementor %s or newer with Flexbox Containers enabled.', 'mr-store' ),
					self::MIN_ELEMENTOR
				)
			)
		);
	}
}

MR_Store_Elementor::instance();
MR_Store_Quote_Basket::instance();
