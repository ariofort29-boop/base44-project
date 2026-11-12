<?php
/**
 * Cinematic hero widget.
 *
 * Elementor's native Video widget plays a film; it cannot drive the playback
 * head from the scroll position. This widget is that native capability
 * expressed as a real Elementor widget: every string, the film, the poster and
 * the statistics are editor controls, and the scroll behaviour lives in
 * assets/js/mr-hero.js (with a static poster fallback for reduced motion).
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Typography;

/**
 * Scroll-scrubbed hero.
 */
class MR_Store_Widget_Hero extends Widget_Base {

	/**
	 * Widget name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'mr-hero';
	}

	/**
	 * Widget title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'MR — هیرو سینمایی', 'mr-store' );
	}

	/**
	 * Panel icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-video-playlist';
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
		return array( 'hero', 'video', 'scroll', 'mr store' );
	}

	/**
	 * Scripts this widget needs.
	 *
	 * @return array
	 */
	public function get_script_depends() {
		return array( 'mr-store-hero' );
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
	 * Registers every editable control.
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'mr_hero_media',
			array( 'label' => __( 'فیلم و تصویر', 'mr-store' ) )
		);

		$this->add_control(
			'video_url',
			array(
				'label'       => __( 'فیلم هیرو (MP4)', 'mr-store' ),
				'type'        => Controls_Manager::MEDIA,
				'media_types' => array( 'video' ),
				'description' => __( 'فیلم با اسکرول جلو می‌رود. اگر خالی بماند، تصویر پوستر نمایش داده می‌شود.', 'mr-store' ),
			)
		);

		$this->add_control(
			'poster',
			array(
				'label'       => __( 'تصویر پوستر', 'mr-store' ),
				'type'        => Controls_Manager::MEDIA,
				'media_types' => array( 'image' ),
				'default'     => array( 'url' => MR_STORE_URL . 'assets/media/hero-poster.jpg' ),
			)
		);

		$this->add_control(
			'scroll_length',
			array(
				'label'      => __( 'طول اسکرول (vh)', 'mr-store' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array(
					'px' => array(
						'min'  => 100,
						'max'  => 500,
						'step' => 10,
					),
				),
				'default'    => array( 'size' => 300 ),
				'selectors'  => array(
					'{{WRAPPER}} .mr-hero' => '--mr-hero-length: {{SIZE}}vh;',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_hero_copy',
			array( 'label' => __( 'متن هیرو', 'mr-store' ) )
		);

		$this->add_control(
			'eyebrow',
			array(
				'label'   => __( 'برچسب بالای عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'بازار عمده‌فروشی بین‌المللی',
			)
		);

		$this->add_control(
			'title',
			array(
				'label'   => __( 'عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 3,
				'default' => 'تأمین عمده از',
			)
		);

		$this->add_control(
			'title_highlight',
			array(
				'label'   => __( 'بخش برجسته عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'تأمین‌کنندگان معتبر',
			)
		);

		$this->add_control(
			'subtitle',
			array(
				'label'   => __( 'توضیح', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 3,
				'default' => 'محصولات آرایشی و بهداشتی، کالاهای مصرفی و ارگانیک از تولیدکنندگان بررسی‌شده برای واردکنندگان و توزیع‌کنندگان در بیش از ۱۸۰ کشور.',
			)
		);

		$this->add_control(
			'cta_primary_text',
			array(
				'label'   => __( 'دکمه اصلی', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'استعلام قیمت عمده',
			)
		);

		$this->add_control(
			'cta_primary_link',
			array(
				'label'       => __( 'لینک دکمه اصلی', 'mr-store' ),
				'type'        => Controls_Manager::URL,
				'default'     => array( 'url' => '#contact' ),
				'placeholder' => __( 'مثلاً /contact', 'mr-store' ),
			)
		);

		$this->add_control(
			'cta_secondary_text',
			array(
				'label'   => __( 'دکمه دوم', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'مشاهده محصولات',
			)
		);

		$this->add_control(
			'cta_secondary_link',
			array(
				'label'       => __( 'لینک دکمه دوم', 'mr-store' ),
				'type'        => Controls_Manager::URL,
				'default'     => array( 'url' => '/products' ),
				'placeholder' => __( 'مثلاً /products', 'mr-store' ),
			)
		);

		$this->add_control(
			'scroll_hint',
			array(
				'label'   => __( 'راهنمای اسکرول', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'برای دیدن فیلم اسکرول کنید',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_hero_brandbar',
			array( 'label' => __( 'نوار برند', 'mr-store' ) )
		);

		$this->add_control(
			'show_brandbar',
			array(
				'label'        => __( 'نمایش نوار برند', 'mr-store' ),
				'type'         => Controls_Manager::SWITCHER,
				'return_value' => 'yes',
				'default'      => 'yes',
			)
		);

		$this->add_control(
			'brand_initials',
			array(
				'label'     => __( 'نشانه', 'mr-store' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => 'MR',
				'condition' => array( 'show_brandbar' => 'yes' ),
			)
		);

		$this->add_control(
			'brand_name',
			array(
				'label'     => __( 'نام برند', 'mr-store' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => 'MR STORE',
				'condition' => array( 'show_brandbar' => 'yes' ),
			)
		);

		$this->add_control(
			'brand_tagline',
			array(
				'label'     => __( 'زیرنویس برند', 'mr-store' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => 'بازار عمده‌فروشی بین‌المللی',
				'condition' => array( 'show_brandbar' => 'yes' ),
			)
		);

		$this->add_control(
			'brand_cta_text',
			array(
				'label'     => __( 'دکمه نوار برند', 'mr-store' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => 'گفتگو با کارشناس تجارت',
				'condition' => array( 'show_brandbar' => 'yes' ),
			)
		);

		$this->add_control(
			'brand_cta_link',
			array(
				'label'     => __( 'لینک دکمه نوار برند', 'mr-store' ),
				'type'      => Controls_Manager::URL,
				'default'   => array( 'url' => '/contact' ),
				'condition' => array( 'show_brandbar' => 'yes' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_hero_stats',
			array( 'label' => __( 'آمار هیرو', 'mr-store' ) )
		);

		$stats = new Repeater();

		$stats->add_control(
			'value',
			array(
				'label'   => __( 'عدد', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => '۱۲٫۴۰۰+',
			)
		);

		$stats->add_control(
			'label',
			array(
				'label'   => __( 'برچسب', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'تأمین‌کننده تأییدشده',
			)
		);

		$this->add_control(
			'stats',
			array(
				'label'       => __( 'آمار', 'mr-store' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $stats->get_controls(),
				'default'     => array(
					array( 'value' => '۱۲٫۴۰۰+', 'label' => 'تأمین‌کننده تأییدشده' ),
					array( 'value' => '۱۸۰+', 'label' => 'کشور مقصد' ),
					array( 'value' => '۳', 'label' => 'صنعت اصلی' ),
				),
				'title_field' => '{{{ value }}} — {{{ label }}}',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_hero_style',
			array(
				'label' => __( 'استایل', 'mr-store' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'overlay_color',
			array(
				'label'     => __( 'رنگ پوشش فیلم', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(5,16,11,0.55)',
				'selectors' => array(
					'{{WRAPPER}} .mr-hero__scrim' => 'background: linear-gradient(180deg, {{VALUE}} 0%, rgba(5,16,11,0.15) 45%, #05100b 100%);',
				),
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'رنگ عنوان', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#f6f1e6',
				'selectors' => array( '{{WRAPPER}} .mr-hero__title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'highlight_color',
			array(
				'label'     => __( 'رنگ بخش برجسته', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#f0d9b8',
				'selectors' => array( '{{WRAPPER}} .mr-hero__highlight' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'label'    => __( 'تایپوگرافی عنوان', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-hero__title',
			)
		);

		$this->add_control(
			'subtitle_color',
			array(
				'label'     => __( 'رنگ توضیح', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(246,241,230,0.72)',
				'selectors' => array( '{{WRAPPER}} .mr-hero__subtitle' => 'color: {{VALUE}};' ),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Renders the hero.
	 */
	protected function render() {
		$s       = $this->get_settings_for_display();
		$video   = ! empty( $s['video_url']['url'] ) ? $s['video_url']['url'] : '';
		$poster  = ! empty( $s['poster']['url'] ) ? $s['poster']['url'] : '';
		$primary = ! empty( $s['cta_primary_link']['url'] ) ? $s['cta_primary_link']['url'] : '#';
		$second  = ! empty( $s['cta_secondary_link']['url'] ) ? $s['cta_secondary_link']['url'] : '';
		$brand   = ! empty( $s['brand_cta_link']['url'] ) ? $s['brand_cta_link']['url'] : '/contact';
		$stats   = is_array( $s['stats'] ) ? $s['stats'] : array();
		?>
		<section class="mr-hero<?php echo $video ? '' : ' is-static'; ?>" data-mr-hero <?php echo $video ? 'data-mr-hero-video="' . esc_url( $video ) . '"' : ''; ?>>
			<div class="mr-hero__stage">
				<?php if ( $poster ) : ?>
					<img class="mr-hero__media" src="<?php echo esc_url( $poster ); ?>" alt="" aria-hidden="true" decoding="async" />
				<?php endif; ?>

				<video class="mr-hero__media mr-hero__video" data-mr-hero-player
					<?php echo $poster ? 'poster="' . esc_url( $poster ) . '"' : ''; ?>
					muted playsinline preload="auto" disablepictureinpicture disableremoteplayback
					aria-hidden="true" tabindex="-1" hidden>
					<?php if ( $video ) : ?>
						<source src="<?php echo esc_url( $video ); ?>" type="video/mp4" />
					<?php endif; ?>
				</video>

				<div class="mr-hero__scrim" aria-hidden="true"></div>

				<?php if ( 'yes' === $s['show_brandbar'] ) : ?>
					<div class="mr-hero__bar">
						<a class="mr-hero__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
							<span class="mr-hero__brand-mark"><?php echo esc_html( $s['brand_initials'] ); ?></span>
							<span class="mr-hero__brand-text">
								<span class="mr-hero__brand-name"><?php echo esc_html( $s['brand_name'] ); ?></span>
								<span class="mr-hero__brand-tagline"><?php echo esc_html( $s['brand_tagline'] ); ?></span>
							</span>
						</a>

						<?php if ( ! empty( $s['brand_cta_text'] ) ) : ?>
							<a class="mr-btn mr-btn--ghost mr-hero__bar-cta" href="<?php echo esc_url( $brand ); ?>">
								<?php echo esc_html( $s['brand_cta_text'] ); ?>
								<span aria-hidden="true">&#8592;</span>
							</a>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<div class="mr-hero__inner">
					<div class="mr-hero__copy" data-mr-hero-copy>
						<?php if ( ! empty( $s['eyebrow'] ) ) : ?>
							<p class="mr-eyebrow"><span class="mr-eyebrow__line"></span><?php echo esc_html( $s['eyebrow'] ); ?></p>
						<?php endif; ?>

						<h1 class="mr-hero__title">
							<?php echo esc_html( $s['title'] ); ?>
							<?php if ( ! empty( $s['title_highlight'] ) ) : ?>
								<span class="mr-hero__highlight"><?php echo esc_html( $s['title_highlight'] ); ?></span>
							<?php endif; ?>
						</h1>

						<?php if ( ! empty( $s['subtitle'] ) ) : ?>
							<p class="mr-hero__subtitle"><?php echo esc_html( $s['subtitle'] ); ?></p>
						<?php endif; ?>

						<div class="mr-hero__actions">
							<?php if ( ! empty( $s['cta_primary_text'] ) ) : ?>
								<button type="button" class="mr-btn mr-btn--gold" data-mr-quote-open>
									<?php echo esc_html( $s['cta_primary_text'] ); ?>
								</button>
							<?php endif; ?>

							<?php if ( ! empty( $s['cta_secondary_text'] ) && $second ) : ?>
								<a class="mr-btn mr-btn--outline" href="<?php echo esc_url( $second ); ?>">
									<?php echo esc_html( $s['cta_secondary_text'] ); ?>
								</a>
							<?php endif; ?>
						</div>

						<?php if ( ! empty( $stats ) ) : ?>
							<dl class="mr-hero__stats">
								<?php foreach ( $stats as $stat ) : ?>
									<div class="mr-hero__stat">
										<dt><?php echo esc_html( isset( $stat['value'] ) ? $stat['value'] : '' ); ?></dt>
										<dd><?php echo esc_html( isset( $stat['label'] ) ? $stat['label'] : '' ); ?></dd>
									</div>
								<?php endforeach; ?>
							</dl>
						<?php endif; ?>
					</div>

					<?php if ( ! empty( $s['scroll_hint'] ) ) : ?>
						<p class="mr-hero__hint" data-mr-hero-hint>
							<span class="mr-hero__hint-line" aria-hidden="true"></span>
							<?php echo esc_html( $s['scroll_hint'] ); ?>
						</p>
					<?php endif; ?>
				</div>
			</div>
			<div class="mr-hero__spacer" aria-hidden="true"></div>
		</section>
		<?php
	}
}
