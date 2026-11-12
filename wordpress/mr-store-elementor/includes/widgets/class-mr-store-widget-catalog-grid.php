<?php
/**
 * Catalogue grid widget.
 *
 * Renders the marketplace catalogue (products or verified suppliers) on the
 * server from the bundled JSON, with real Elementor controls for the heading,
 * the industry filter, the number of cards and the column count. Prices are
 * never printed: every card's action is a quotation request, as on the live
 * prototype.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use Elementor\Group_Control_Typography;

/**
 * Product / supplier grid.
 */
class MR_Store_Widget_Catalog_Grid extends Widget_Base {

	/**
	 * Widget name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'mr-catalog-grid';
	}

	/**
	 * Widget title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'MR — شبکه محصولات و تأمین‌کنندگان', 'mr-store' );
	}

	/**
	 * Panel icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-products';
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
		return array( 'products', 'catalogue', 'suppliers', 'grid', 'wholesale' );
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
			'mr_grid_source',
			array( 'label' => __( 'منبع داده', 'mr-store' ) )
		);

		$this->add_control(
			'source',
			array(
				'label'   => __( 'نوع فهرست', 'mr-store' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'products'  => __( 'محصولات', 'mr-store' ),
					'suppliers' => __( 'تأمین‌کنندگان', 'mr-store' ),
				),
				'default' => 'products',
			)
		);

		$this->add_control(
			'category',
			array(
				'label'     => __( 'صنعت', 'mr-store' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'all'       => __( 'همه صنایع', 'mr-store' ),
					'cosmetics' => __( 'آرایشی و بهداشتی', 'mr-store' ),
					'fmcg'      => __( 'کالاهای مصرفی (FMCG)', 'mr-store' ),
					'organic'   => __( 'ارگانیک و طبیعی', 'mr-store' ),
				),
				'default'   => 'all',
				'condition' => array( 'source' => 'products' ),
			)
		);

		$this->add_control(
			'limit',
			array(
				'label'   => __( 'تعداد کارت', 'mr-store' ),
				'type'    => Controls_Manager::NUMBER,
				'min'     => 2,
				'max'     => 48,
				'default' => 6,
			)
		);

		$this->add_responsive_control(
			'columns',
			array(
				'label'          => __( 'ستون‌ها', 'mr-store' ),
				'type'           => Controls_Manager::SELECT,
				'options'        => array(
					'2' => '2',
					'3' => '3',
					'4' => '4',
				),
				'default'        => '3',
				'tablet_default' => '2',
				'mobile_default' => '1',
				'selectors'      => array(
					'{{WRAPPER}} .mr-grid' => '--mr-columns: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'show_filters',
			array(
				'label'        => __( 'نمایش جستجو و فیلتر', 'mr-store' ),
				'type'         => Controls_Manager::SWITCHER,
				'return_value' => 'yes',
				'default'      => 'yes',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_grid_heading',
			array( 'label' => __( 'عنوان بخش', 'mr-store' ) )
		);

		$this->add_control(
			'eyebrow',
			array(
				'label'   => __( 'برچسب بالای عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'عرضه عمده تأییدشده',
			)
		);

		$this->add_control(
			'title',
			array(
				'label'   => __( 'عنوان', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'پیشنهادهای برگزیده این هفته',
			)
		);

		$this->add_control(
			'description',
			array(
				'label'   => __( 'توضیح', 'mr-store' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => 2,
				'default' => 'انتخابی از محصولات تأمین‌کنندگان بررسی‌شده، با اسناد آماده صادرات و حداقل سفارش منعطف.',
			)
		);

		$this->add_control(
			'more_text',
			array(
				'label'   => __( 'متن لینک «همه محصولات»', 'mr-store' ),
				'type'    => Controls_Manager::TEXT,
				'default' => 'مشاهده همه محصولات',
			)
		);

		$this->add_control(
			'more_link',
			array(
				'label'   => __( 'لینک «همه محصولات»', 'mr-store' ),
				'type'    => Controls_Manager::URL,
				'default' => array( 'url' => '/products' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'mr_grid_style',
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
				'selectors' => array( '{{WRAPPER}} .mr-product' => 'background: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'رنگ عنوان کارت', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#f6f1e6',
				'selectors' => array( '{{WRAPPER}} .mr-product__title' => 'color: {{VALUE}};' ),
			)
		);

		$this->add_control(
			'accent_color',
			array(
				'label'     => __( 'رنگ تأکیدی', 'mr-store' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#45c58c',
				'selectors' => array( '{{WRAPPER}} .mr-products' => '--mr-accent: {{VALUE}};' ),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'card_title_typography',
				'label'    => __( 'تایپوگرافی عنوان کارت', 'mr-store' ),
				'selector' => '{{WRAPPER}} .mr-product__title',
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Current search term from the URL.
	 *
	 * @return string
	 */
	private function search_term() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only filter.
		return isset( $_GET['mr_q'] ) ? sanitize_text_field( wp_unslash( $_GET['mr_q'] ) ) : '';
	}

	/**
	 * Current industry from the URL, so links such as ?category=cosmetics work.
	 *
	 * @return string
	 */
	private function requested_category() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only filter.
		$requested = isset( $_GET['category'] ) ? sanitize_key( wp_unslash( $_GET['category'] ) ) : '';
		if ( ! $requested ) {
			// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only filter.
			$requested = isset( $_GET['mr_cat'] ) ? sanitize_key( wp_unslash( $_GET['mr_cat'] ) ) : '';
		}
		return in_array( $requested, array( 'cosmetics', 'fmcg', 'organic' ), true ) ? $requested : '';
	}

	/**
	 * Current sort key from the URL.
	 *
	 * @return string
	 */
	private function sort_key() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only filter.
		$sort = isset( $_GET['mr_sort'] ) ? sanitize_key( wp_unslash( $_GET['mr_sort'] ) ) : 'featured';
		return in_array( $sort, array( 'featured', 'rating', 'name' ), true ) ? $sort : 'featured';
	}

	/**
	 * Renders the grid.
	 */
	protected function render() {
		$s       = $this->get_settings_for_display();
		$source  = 'suppliers' === $s['source'] ? 'suppliers' : 'products';
		$limit   = max( 2, (int) $s['limit'] );
		$term    = $this->search_term();
		$sort    = $this->sort_key();
		$cat     = $this->requested_category();
		if ( ! $cat && 'all' !== $s['category'] ) {
			$cat = $s['category'];
		}
		$more    = ! empty( $s['more_link']['url'] ) ? $s['more_link']['url'] : '';
		$records = 'suppliers' === $source ? $this->filtered_suppliers( $term, $limit ) : $this->filtered_products( $cat, $term, $sort, $limit );
		$price   = MR_Store_Data::price_label();
		?>
		<div class="mr-products">
			<?php if ( ! empty( $s['title'] ) || ! empty( $s['eyebrow'] ) ) : ?>
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

					<?php if ( $more && ! empty( $s['more_text'] ) ) : ?>
						<a class="mr-section__action" href="<?php echo esc_url( $more ); ?>">
							<?php echo esc_html( $s['more_text'] ); ?> <span aria-hidden="true">&#8592;</span>
						</a>
					<?php endif; ?>
				</header>
			<?php endif; ?>

			<?php if ( 'yes' === $s['show_filters'] && 'products' === $source ) : ?>
				<nav class="mr-filters__cats" aria-label="<?php esc_attr_e( 'فیلتر صنعت', 'mr-store' ); ?>">
					<?php
					$base = get_permalink();
					foreach ( array(
						''          => __( 'همه صنایع', 'mr-store' ),
						'cosmetics' => __( 'آرایشی و بهداشتی', 'mr-store' ),
						'fmcg'      => __( 'کالاهای مصرفی (FMCG)', 'mr-store' ),
						'organic'   => __( 'ارگانیک و طبیعی', 'mr-store' ),
					) as $slug => $label ) :
						$url = $slug ? add_query_arg( 'category', $slug, $base ) : $base;
						?>
						<a class="mr-filters__cat<?php echo $cat === $slug ? ' is-active' : ''; ?>"
							href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a>
					<?php endforeach; ?>
				</nav>

				<form class="mr-filters" method="get" action="<?php echo esc_url( get_permalink() ); ?>">
					<?php if ( $cat ) : ?>
						<input type="hidden" name="category" value="<?php echo esc_attr( $cat ); ?>" />
					<?php endif; ?>
					<label class="mr-filters__search">
						<span class="screen-reader-text"><?php esc_html_e( 'جستجوی محصول', 'mr-store' ); ?></span>
						<input type="search" name="mr_q" value="<?php echo esc_attr( $term ); ?>" placeholder="<?php esc_attr_e( 'جستجوی محصول، تأمین‌کننده یا بازار…', 'mr-store' ); ?>" />
					</label>
					<label class="mr-filters__sort">
						<span class="screen-reader-text"><?php esc_html_e( 'مرتب‌سازی', 'mr-store' ); ?></span>
						<select name="mr_sort">
							<option value="featured" <?php selected( $sort, 'featured' ); ?>><?php esc_html_e( 'پیشنهاد ما', 'mr-store' ); ?></option>
							<option value="rating" <?php selected( $sort, 'rating' ); ?>><?php esc_html_e( 'بیشترین امتیاز', 'mr-store' ); ?></option>
							<option value="name" <?php selected( $sort, 'name' ); ?>><?php esc_html_e( 'نام محصول', 'mr-store' ); ?></option>
						</select>
					</label>
					<button type="submit" class="mr-btn mr-btn--primary"><?php esc_html_e( 'جستجو', 'mr-store' ); ?></button>
				</form>
			<?php endif; ?>

			<?php if ( empty( $records ) ) : ?>
				<p class="mr-empty"><?php esc_html_e( 'موردی با این فیلتر پیدا نشد. عبارت دیگری را امتحان کنید.', 'mr-store' ); ?></p>
			<?php elseif ( 'suppliers' === $source ) : ?>
				<div class="mr-grid">
					<?php foreach ( $records as $supplier ) : ?>
						<?php $this->render_supplier( $supplier, $price ); ?>
					<?php endforeach; ?>
				</div>
			<?php else : ?>
				<div class="mr-grid">
					<?php foreach ( $records as $product ) : ?>
						<?php $this->render_product( $product, $price ); ?>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Filters products by industry, term and sort.
	 *
	 * @param string $category Industry slug or empty.
	 * @param string $term     Search term.
	 * @param string $sort     Sort key.
	 * @param int    $limit    Max records.
	 * @return array
	 */
	private function filtered_products( $category, $term, $sort, $limit ) {
		$list = MR_Store_Data::products();

		if ( $category ) {
			$list = array_values(
				array_filter(
					$list,
					static function ( $product ) use ( $category ) {
						return isset( $product['category'] ) && $category === $product['category'];
					}
				)
			);
		}

		if ( '' !== $term ) {
			$needle = mb_strtolower( $term );
			$list   = array_values(
				array_filter(
					$list,
					static function ( $product ) use ( $needle ) {
						$haystack = mb_strtolower(
							implode(
								' ',
								array(
									isset( $product['name'] ) ? $product['name'] : '',
									isset( $product['nameFa'] ) ? $product['nameFa'] : '',
									isset( $product['subcategory'] ) ? $product['subcategory'] : '',
									isset( $product['subcategoryFa'] ) ? $product['subcategoryFa'] : '',
									isset( $product['supplier'] ) ? $product['supplier'] : '',
									isset( $product['country'] ) ? $product['country'] : '',
									isset( $product['countryFa'] ) ? $product['countryFa'] : '',
									isset( $product['descFa'] ) ? $product['descFa'] : '',
								)
							)
						);
						return false !== mb_strpos( $haystack, $needle );
					}
				)
			);
		}

		if ( 'rating' === $sort ) {
			usort(
				$list,
				static function ( $a, $b ) {
					return ( $b['rating'] ?? 0 ) <=> ( $a['rating'] ?? 0 );
				}
			);
		} elseif ( 'name' === $sort ) {
			usort(
				$list,
				static function ( $a, $b ) {
					return strcmp( (string) ( $a['nameFa'] ?? '' ), (string) ( $b['nameFa'] ?? '' ) );
				}
			);
		}

		return array_slice( $list, 0, $limit );
	}

	/**
	 * Filters suppliers by search term.
	 *
	 * @param string $term  Search term.
	 * @param int    $limit Max records.
	 * @return array
	 */
	private function filtered_suppliers( $term, $limit ) {
		$list = MR_Store_Data::suppliers();

		if ( '' !== $term ) {
			$needle = mb_strtolower( $term );
			$list   = array_values(
				array_filter(
					$list,
					static function ( $supplier ) use ( $needle ) {
						$haystack = mb_strtolower(
							implode(
								' ',
								array(
									isset( $supplier['name'] ) ? $supplier['name'] : '',
									isset( $supplier['country'] ) ? $supplier['country'] : '',
									isset( $supplier['countryFa'] ) ? $supplier['countryFa'] : '',
									isset( $supplier['blurbFa'] ) ? $supplier['blurbFa'] : '',
									isset( $supplier['categoriesFa'] ) ? implode( ' ', (array) $supplier['categoriesFa'] ) : '',
								)
							)
						);
						return false !== mb_strpos( $haystack, $needle );
					}
				)
			);
		}

		return array_slice( $list, 0, $limit );
	}

	/**
	 * Prints one product card.
	 *
	 * @param array  $product Product record.
	 * @param string $price   Quotation label.
	 */
	private function render_product( $product, $price ) {
		$meta = trim(
			( $product['subcategoryFa'] ?? '' ) . ' · ' . ( $product['countryFa'] ?? '' )
		);
		?>
		<article class="mr-product">
			<figure class="mr-product__media">
				<?php if ( ! empty( $product['image'] ) ) : ?>
					<img src="<?php echo esc_url( $product['image'] ); ?>" alt="<?php echo esc_attr( $product['nameFa'] ?? $product['name'] ); ?>" loading="lazy" decoding="async" />
				<?php endif; ?>
				<span class="mr-product__tag"><?php echo esc_html( $product['subcategoryFa'] ?? '' ); ?></span>
			</figure>

			<div class="mr-product__body">
				<h3 class="mr-product__title"><?php echo esc_html( $product['nameFa'] ?? $product['name'] ); ?></h3>
				<p class="mr-product__supplier">
					<?php echo esc_html( $product['supplier'] ?? '' ); ?> · <?php echo esc_html( $product['countryFa'] ?? '' ); ?>
				</p>
				<p class="mr-product__desc"><?php echo esc_html( $product['descFa'] ?? '' ); ?></p>

				<dl class="mr-product__facts">
					<div>
						<dt><?php esc_html_e( 'حداقل سفارش', 'mr-store' ); ?></dt>
						<dd><?php echo esc_html( $product['moqFa'] ?? '' ); ?></dd>
					</div>
					<div>
						<dt><?php esc_html_e( 'قیمت', 'mr-store' ); ?></dt>
						<dd><?php echo esc_html( $price ); ?></dd>
					</div>
				</dl>

				<button type="button" class="mr-btn mr-btn--outline mr-product__cta"
					data-mr-quote-item="<?php echo esc_attr( wp_json_encode( array( 'id' => $product['id'] ?? '', 'name' => $product['nameFa'] ?? '', 'meta' => $meta, 'supplier' => $product['supplier'] ?? '' ) ) ); ?>">
					<?php echo esc_html( $price ); ?>
				</button>
			</div>
		</article>
		<?php
	}

	/**
	 * Prints one supplier card.
	 *
	 * @param array  $supplier Supplier record.
	 * @param string $price    Quotation label.
	 */
	private function render_supplier( $supplier, $price ) {
		$initials = '';
		foreach ( array_slice( preg_split( '/\s+/', (string) ( $supplier['name'] ?? '' ) ), 0, 2 ) as $word ) {
			$initials .= mb_substr( $word, 0, 1 );
		}
		$meta = trim( ( $supplier['countryFa'] ?? '' ) . ' · ' . ( $supplier['yearsFa'] ?? '' ) );
		?>
		<article class="mr-product mr-supplier">
			<div class="mr-supplier__head">
				<span class="mr-supplier__avatar"><?php echo esc_html( $initials ); ?></span>
				<div>
					<h3 class="mr-product__title"><?php echo esc_html( $supplier['name'] ?? '' ); ?></h3>
					<p class="mr-product__supplier"><?php echo esc_html( $meta ); ?></p>
				</div>
				<span class="mr-supplier__verified" title="<?php esc_attr_e( 'تأییدشده', 'mr-store' ); ?>">&#10003;</span>
			</div>

			<div class="mr-product__body">
				<p class="mr-product__desc"><?php echo esc_html( $supplier['blurbFa'] ?? '' ); ?></p>

				<?php if ( ! empty( $supplier['categoriesFa'] ) ) : ?>
					<ul class="mr-card__chips">
						<?php foreach ( (array) $supplier['categoriesFa'] as $category ) : ?>
							<li><span class="mr-card__chip"><?php echo esc_html( $category ); ?></span></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>

				<p class="mr-product__facts-line">
					<span><?php echo esc_html( $supplier['productsFa'] ?? '' ); ?></span>
					<span>★ <?php echo esc_html( $supplier['rating'] ?? '' ); ?></span>
				</p>

				<button type="button" class="mr-btn mr-btn--outline mr-product__cta"
					data-mr-quote-item="<?php echo esc_attr( wp_json_encode( array( 'id' => $supplier['id'] ?? '', 'name' => 'استعلام از ' . ( $supplier['name'] ?? '' ), 'meta' => $meta, 'supplier' => $supplier['name'] ?? '' ) ) ); ?>">
					<?php echo esc_html( $price ); ?>
				</button>
			</div>
		</article>
		<?php
	}
}
