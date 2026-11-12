<?php
/**
 * Botanical card widget.
 *
 * The site's signature is a living vine that draws itself around every card
 * edge. Elementor has no native "animated border" control, and an HTML widget
 * would make the card uneditable, so the card is a real widget with normal
 * Elementor controls and assets/js/mr-botanical.js draws the vine into it.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * Card with an animated botanical frame.
 */
class MR_Store_Widget_Botanical_Card extends Widget_Base {

	/**
	 * Widget name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'mr-botanical-card';
	}

	/**
	 * Widget title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'MR — کارت گیاهی', 'mr-store' );
	}

	/**
	 * Panel icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-image-box';
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
		return array( 'card', 'category', 'vine', 'botanical' );
	}

	/**
	 * Scripts this widget needs.
	 *
	 * @return array
	 */
	public function get_script_depends() {
		return array( 'mr-store-botanical' );
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
			'mr_card_content',
			array( 'label' => __( 'محتوا', 'mr-store' ) )
		);

		$this->add_control(
			'image',
			array(
				'label'       => __( 'تصویر', 'mr-store' ),
				'type'        => Controls_Manager::MEDIA,
				'media_types' => array( 'image' ),
			)
		);

		$this->add_control(
			'badge',
			array(
				'label'       => __( 'برچسب گوشه تصویر', 'mr-store' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '',
				'description' => __( 'مثلاً ۱۰+ برای تعداد زیردسته‌ها.', 'mr-store' ),
			)
		);

		$this->add_control(
			'title',
			array(
				'label'   => __( 'عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'آرایشی و بهداشتی',
			)
		);

		$this->add_control(
			'title_tag',
			array(
				'label'   => __( 'سطح تیتر', 'mr-store' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'h2' => 'H2',
					'h3' => 'H3',
					'h4' => 'H4',
					'p'  => __( 'پاراگراف', 'mr-store' ),
				),
				'default' => 'h3',
			)
		);

		$this->add_control(
			'text',
			array(
				'label'   => __( 'توضیح', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 3,
				'default' => 'مراقبت پوست، مراقبت مو و محصولات زیبایی از تولیدکنندگان دارای گواهی، با قابلیت ردیابی کامل مواد اولیه.',
			)
		);

		$chips = new Repeater();

		$chips->add_control(
			'label',
			array(
				'label'   => __( 'برچسب', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'مراقبت پوست',
			)
		);

		$chips->add_control(
			'link',
			array(
				'label' => __( 'لینک', 'mr-store' ),
				'type'  => Controls_Manager::URL,
			)
		);

		$this->add_control(
			'items',
			array(
				'label'       => __( 'زیردسته‌ها', 'mr-store' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $chips->get_controls(),
				'default'     => array(
					array( 'label' => 'مراقبت پوست' ),
					array( 'label' => 'مراقبت مو' ),
					array( 'label' => 'مراقبت بدن' ),
				),
				'title_field' => '{{{ label }}}',
			)
		);

		$this->add_control(
			'link_text',
			array(
				'label'   => __( 'متن لینک پایین کارت', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'مشاهده دسته‌بندی',
			)
		);

		$this->add_control(
			'link',
			array(
				'label'       => __( 'لینک پایین کارت', 'mr-store' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'مثلاً /products', 'mr-store' ),
			)
		);

		$this->add_control(
			'vine_seed',
			array(
				'label'       => __( 'دانه تصادفی گیاه', 'mr-store' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 7,
				'description' => __( 'عدد متفاوت، گیاه متفاوت. اندازه تصادفی هر کارت را تغییر ندهید تا طراحی یکدست بماند.', 'mr-store' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_card_style',
			array(
				'label' => __( 'استایل', 'mr-store' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'card_background',
			array(
				'label'     => __( 'پس‌زمینه کارت', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#10291f',
				'selectors' => array( '{{WRAPPER}} .mr-card' => 'background: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'رنگ عنوان', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#f6f1e6',
				'selectors' => array( '{{WRAPPER}} .mr-card__title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'رنگ متن', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(169,195,178,0.68)',
				'selectors' => array( '{{WRAPPER}} .mr-card__text' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'link_color',
			array(
				'label'     => __( 'رنگ لینک', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#45c58c',
				'selectors' => array(
					'{{WRAPPER}} .mr-card__link' => 'color: {{VALUE}};',
					'{{WRAPPER}} .mr-card__chip' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'title_typography',
				'label'    => __( 'تایپوگرافی عنوان', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-card__title',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'card_border',
				'label'    => __( 'حاشیه', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-card',
			)
		);

		$this->add_control(
			'card_radius',
			array(
				'label'      => __( 'گردی گوشه‌ها', 'mr-store' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 48,
						'step' => 1,
					),
				),
				'default'    => array( 'size' => 24 ),
				'selectors'  => array( '{{WRAPPER}} .mr-card' => 'border-radius: {{SIZE}}{{UNIT}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'card_shadow',
				'label'    => __( 'سایه', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-card',
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Renders the card.
	 */
	protected function render() {
		$s    = $this->get_settings_for_display();
		$tag  = in_array( $s['title_tag'], array( 'h2', 'h3', 'h4', 'p' ), true ) ? $s['title_tag'] : 'h3';
		$link = ! empty( $s['link']['url'] ) ? $s['link']['url'] : '';
		$img  = ! empty( $s['image']['url'] ) ? $s['image']['url'] : '';
		$seed = ! empty( $s['vine_seed'] ) ? (int) $s['vine_seed'] : 7;
		$items = is_array( $s['items'] ) ? $s['items'] : array();
		?>
		<article class="mr-card" data-mr-vine data-mr-vine-seed="<?php echo esc_attr( $seed ); ?>" data-mr-vine-radius="24">
			<?php if ( $img ) : ?>
				<figure class="mr-card__media">
					<img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $s['title'] ); ?>" loading="lazy" decoding="async" />
					<span class="mr-card__media-scrim" aria-hidden="true"></span>
					<figcaption class="mr-card__media-foot">
						<<?php echo esc_attr( $tag ); ?> class="mr-card__media-title"><?php echo esc_html( $s['title'] ); ?></<?php echo esc_attr( $tag ); ?>>
						<?php if ( ! empty( $s['badge'] ) ) : ?>
							<span class="mr-card__badge"><?php echo esc_html( $s['badge'] ); ?></span>
						<?php endif; ?>
					</figcaption>
				</figure>
			<?php elseif ( ! empty( $s['title'] ) ) : ?>
				<<?php echo esc_attr( $tag ); ?> class="mr-card__title"><?php echo esc_html( $s['title'] ); ?></<?php echo esc_attr( $tag ); ?>>
			<?php endif; ?>

			<div class="mr-card__body">
				<?php if ( ! empty( $s['text'] ) ) : ?>
					<p class="mr-card__text"><?php echo esc_html( $s['text'] ); ?></p>
				<?php endif; ?>

				<?php if ( ! empty( $items ) ) : ?>
					<ul class="mr-card__chips">
						<?php foreach ( $items as $item ) : ?>
							<?php
							$chip_url = ! empty( $item['link']['url'] ) ? $item['link']['url'] : '';
							$chip_tag = $chip_url ? 'a' : 'span';
							?>
							<li>
								<<?php echo esc_attr( $chip_tag ); ?> class="mr-card__chip"
									<?php echo $chip_url ? 'href="' . esc_url( $chip_url ) . '"' : ''; ?>>
									<?php echo esc_html( isset( $item['label'] ) ? $item['label'] : '' ); ?>
								</<?php echo esc_attr( $chip_tag ); ?>>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>

				<?php if ( $link && ! empty( $s['link_text'] ) ) : ?>
					<a class="mr-card__link" href="<?php echo esc_url( $link ); ?>">
						<?php echo esc_html( $s['link_text'] ); ?>
						<span aria-hidden="true">&#8592;</span>
					</a>
				<?php endif; ?>
			</div>
		</article>
		<?php
	}
}
