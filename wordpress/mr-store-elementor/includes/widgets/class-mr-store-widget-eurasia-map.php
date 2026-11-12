<?php
/**
 * Interactive Eurasia markets widget.
 *
 * Native Elementor widgets cannot draw a geographic map from real country
 * outlines, so the map is a widget: the heading, description and CTA stay
 * Elementor controls and assets/js/mr-map.js paints the outlines from the
 * bundled Natural Earth data, with a keyboard-reachable country list that
 * mirrors the pointer interaction.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use Elementor\Group_Control_Typography;

/**
 * Eurasia target-markets map.
 */
class MR_Store_Widget_Eurasia_Map extends Widget_Base {

	/**
	 * Widget name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'mr-eurasia-map';
	}

	/**
	 * Widget title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'MR — نقشه بازارهای اوراسیا', 'mr-store' );
	}

	/**
	 * Panel icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-google-maps';
	}

	/**
	 * Widget category.
	 *
	 * @return array
	 */
	public function get_categories() {
		return array( 'mr-store' );
	}

	/**
	 * Search keywords.
	 *
	 * @return array
	 */
	public function get_keywords() {
		return array( 'map', 'markets', 'eurasia', 'country' );
	}

	/**
	 * Scripts this widget needs.
	 *
	 * @return array
	 */
	public function get_script_depends() {
		return array( 'mr-store-map' );
	}

	/**
	 * Styles this widget needs.
	 *
	 * @return array
	 */
	public function get_style_depends() {
		return array( 'mr-store' );
	}

	/**
	 * Registers controls.
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'mr_map_content',
			array( 'label' => __( 'محتوا', 'mr-store' ) )
		);

		$this->add_control(
			'eyebrow',
			array(
				'label'   => __( 'برچسب بالای عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'بازارهای هدف · TARGET MARKETS',
			)
		);

		$this->add_control(
			'title',
			array(
				'label'   => __( 'عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'Our Markets Across Eurasia',
			)
		);

		$this->add_control(
			'description',
			array(
				'label'   => __( 'توضیح (انگلیسی)', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 2,
				'default' => 'Connecting markets, building partnerships, and creating opportunities across the Eurasian region.',
			)
		);

		$this->add_control(
			'description_fa',
			array(
				'label'   => __( 'توضیح (فارسی)', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 2,
				'default' => 'بازارهای هدف ما در سراسر اوراسیا؛ اتصال بازارها، ساخت شراکت‌های بلندمدت و آفرینش فرصت برای واردکنندگان و توزیع‌کنندگان منطقه.',
			)
		);

		$this->add_control(
			'default_country',
			array(
				'label'   => __( 'کشور پیش‌فرض', 'mr-store' ),
				'type'    => Controls_Manager::SELECT,
				'options' => $this->country_options(),
				'default' => 'IRN',
			)
		);

		$this->add_control(
			'reference_iso2',
			array(
				'label'       => __( 'کشور مبدأ (مرکز شبکه)', 'mr-store' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => 'ir',
				'description' => __( 'کد دوحرفی کشور مبدأ روی نقشه.', 'mr-store' ),
			)
		);

		$this->add_control(
			'cta_text',
			array(
				'label'   => __( 'متن لینک استعلام', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'استعلام برای این بازار',
			)
		);

		$this->add_control(
			'cta_link',
			array(
				'label'   => __( 'لینک استعلام', 'mr-store' ),
				'type'    => Controls_Manager::URL,
				'default' => array( 'url' => '/contact' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_map_style',
			array(
				'label' => __( 'استایل', 'mr-store' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'map_background',
			array(
				'label'     => __( 'پس‌زمینه نقشه', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#08190f',
				'selectors' => array( '{{WRAPPER}} .mr-map__canvas' => 'background: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'country_color',
			array(
				'label'     => __( 'رنگ کشورهای هدف', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#1f8a5f',
				'selectors' => array( '{{WRAPPER}} .mr-map' => '--mr-map-target: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'country_hover_color',
			array(
				'label'     => __( 'رنگ کشور فعال', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#45c58c',
				'selectors' => array( '{{WRAPPER}} .mr-map' => '--mr-map-active: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'label'    => __( 'تایپوگرافی عنوان', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-section__title',
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Builds the country dropdown from the bundled market list.
	 *
	 * @return array<string,string>
	 */
	private function country_options() {
		$options = array();
		foreach ( MR_Store_Data::markets() as $market ) {
			if ( empty( $market['id'] ) ) {
				continue;
			}
			$options[ $market['id'] ] = isset( $market['nameFa'] )
				? $market['nameFa'] . ' — ' . $market['name']
				: $market['name'];
		}
		return $options;
	}

	/**
	 * Renders the map shell; mr-map.js fills in shapes and the details panel.
	 */
	protected function render() {
		$s = $this->get_settings_for_display();

		wp_localize_script(
			'mr-store-map',
			'mrStoreMap',
			array(
				'geoUrl'     => MR_STORE_URL . 'assets/data/eurasia-geo.json',
				'marketsUrl' => MR_STORE_URL . 'assets/data/markets.json',
				'default'    => ! empty( $s['default_country'] ) ? $s['default_country'] : 'IRN',
				'reference'  => ! empty( $s['reference_iso2'] ) ? strtolower( $s['reference_iso2'] ) : 'ir',
				'ctaText'    => ! empty( $s['cta_text'] ) ? $s['cta_text'] : '',
				'ctaUrl'     => ! empty( $s['cta_link']['url'] ) ? $s['cta_link']['url'] : '/contact',
			)
		);
		?>
		<div class="mr-map" data-mr-map>
			<header class="mr-section__head">
				<?php if ( ! empty( $s['eyebrow'] ) ) : ?>
					<p class="mr-eyebrow"><span class="mr-eyebrow__line"></span><?php echo esc_html( $s['eyebrow'] ); ?></p>
				<?php endif; ?>
				<?php if ( ! empty( $s['title'] ) ) : ?>
					<h2 class="mr-section__title"><?php echo esc_html( $s['title'] ); ?></h2>
				<?php endif; ?>
				<?php if ( ! empty( $s['description'] ) ) : ?>
					<p class="mr-section__lead"><?php echo esc_html( $s['description'] ); ?></p>
				<?php endif; ?>
				<?php if ( ! empty( $s['description_fa'] ) ) : ?>
					<p class="mr-section__lead mr-section__lead--fa"><?php echo esc_html( $s['description_fa'] ); ?></p>
				<?php endif; ?>
				<span class="mr-vine-divider" aria-hidden="true"></span>
			</header>

			<div class="mr-map__grid">
				<div class="mr-map__panel">
					<div class="mr-map__canvas">
						<svg class="mr-map__svg" data-mr-map-svg role="img" aria-label="<?php esc_attr_e( 'نقشه بازارهای هدف در اوراسیا', 'mr-store' ); ?>"></svg>
						<p class="mr-map__loading" data-mr-map-loading><?php esc_html_e( 'در حال بارگذاری نقشه…', 'mr-store' ); ?></p>
					</div>
					<ul class="mr-map__legend">
						<li><span class="mr-map__swatch mr-map__swatch--target"></span><?php esc_html_e( 'بازار هدف', 'mr-store' ); ?></li>
						<li><span class="mr-map__swatch mr-map__swatch--context"></span><?php esc_html_e( 'کشورهای همسایه', 'mr-store' ); ?></li>
						<li><span class="mr-map__swatch mr-map__swatch--home"></span><?php esc_html_e( 'مرکز شبکه', 'mr-store' ); ?></li>
					</ul>
				</div>

				<aside class="mr-map__details" data-mr-map-details data-mr-vine data-mr-vine-seed="31" data-mr-vine-radius="24">
					<p class="mr-map__placeholder"><?php esc_html_e( 'یک بازار را انتخاب کنید', 'mr-store' ); ?></p>
					<p class="mr-map__placeholder-text"><?php esc_html_e( 'نشانگر را روی کشورهای سبز نقشه ببرید یا از فهرست پایین انتخاب کنید تا اطلاعات بازار نمایش داده شود.', 'mr-store' ); ?></p>
				</aside>
			</div>

			<ul class="mr-map__chips" data-mr-map-chips></ul>
		</div>
		<?php
	}
}
