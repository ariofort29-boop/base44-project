<?php
/**
 * Read-only access to the marketplace data that ships with the plugin.
 *
 * The React prototype kept its catalogue, suppliers and market notes in
 * JavaScript modules; they are exported to JSON here and read server-side so
 * Elementor widgets render real content without a client-side data fetch.
 *
 * @package MR_Store
 */

defined( 'ABSPATH' ) || exit;

/**
 * Caches and exposes the bundled JSON data.
 */
final class MR_Store_Data {

	const PRICE_LABEL = 'تماس با ما';

	/**
	 * Loaded JSON documents, keyed by file name.
	 *
	 * @var array<string, array>
	 */
	private static $cache = array();

	/**
	 * Reads one JSON document from assets/data.
	 *
	 * @param string $file File name without extension.
	 * @return array
	 */
	public static function load( $file ) {
		if ( isset( self::$cache[ $file ] ) ) {
			return self::$cache[ $file ];
		}

		$path = MR_STORE_PATH . 'assets/data/' . $file . '.json';
		$data = array();

		if ( is_readable( $path ) ) {
			$contents = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$decoded  = json_decode( (string) $contents, true );
			if ( is_array( $decoded ) ) {
				$data = $decoded;
			}
		}

		self::$cache[ $file ] = $data;

		return $data;
	}

	/**
	 * Returns the catalogue products.
	 *
	 * @return array
	 */
	public static function products() {
		return self::load( 'products' );
	}

	/**
	 * Returns the verified suppliers.
	 *
	 * @return array
	 */
	public static function suppliers() {
		return self::load( 'suppliers' );
	}

	/**
	 * Returns categories, popular-category list, assurance badges and countries.
	 *
	 * @return array
	 */
	public static function catalogue() {
		return self::load( 'categories' );
	}

	/**
	 * Returns the three main industries.
	 *
	 * @return array
	 */
	public static function categories() {
		$catalogue = self::catalogue();
		return isset( $catalogue['categories'] ) ? $catalogue['categories'] : array();
	}

	/**
	 * Returns target-market records for the Eurasia map.
	 *
	 * @return array
	 */
	public static function markets() {
		return self::load( 'markets' );
	}

	/**
	 * Returns the country outlines used by the Eurasia map.
	 *
	 * @return array
	 */
	public static function geo_shapes() {
		return self::load( 'eurasia-geo' );
	}

	/**
	 * Returns the trade contact details.
	 *
	 * @return array
	 */
	public static function contact() {
		$site = self::load( 'site' );
		return is_array( $site ) ? $site : array();
	}

	/**
	 * Quotation label used everywhere instead of a retail price.
	 *
	 * @return string
	 */
	public static function price_label() {
		$contact = self::contact();
		return self::PRICE_LABEL;
	}

	/**
	 * Small helper for templates: get a key with a fallback.
	 *
	 * @param string $key     Data set name.
	 * @param mixed  $default Unused legacy parameter kept for compatibility.
	 * @return mixed
	 */
	public static function get( $key, $default = null ) {
		if ( 'price_label' === $key ) {
			return self::PRICE_LABEL;
		}
		return $default;
	}
}
