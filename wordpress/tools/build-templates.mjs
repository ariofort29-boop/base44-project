/**
 * Builds the Elementor template JSON files in ../templates.
 *
 * Every page of the prototype is expressed with native Elementor structure:
 * Flexbox Containers plus native widgets (heading, text-editor, image, button,
 * icon-box, image-box, icon-list, counter, divider, nav-menu, form). Only where
 * Elementor genuinely cannot do the job — the scroll-scrubbed hero, the
 * botanical vine card, the Eurasia map and the catalogue grid — the plugin's own
 * registered widgets are used, and they are editable in the Elementor panel
 * like any other widget.
 *
 * Run:  node tools/build-templates.mjs
 * Then: node tools/validate-templates.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(HERE, '..', 'templates');

/* ------------------------------------------------------------------ ids */

let idCounter = 0;
const id = () => (0xa10000 + idCounter++).toString(16).slice(-7);

/* --------------------------------------------------------------- tokens */

const C = {
	page: '#071710',
	deep: '#05100b',
	navy: '#0c2419',
	surface: '#10291f',
	surface2: '#0a1e16',
	line: '#33604b',
	emerald: '#1f8a5f',
	emeraldSoft: '#45c58c',
	botanical: '#2c8a63',
	mint: '#163a2b',
	gold: '#c98a5e',
	goldSoft: '#f0d9b8',
	ivory: '#f6f1e6',
	soft: 'rgba(169,195,178,0.65)',
	onDark: 'rgba(246,241,230,0.7)',
};

const FONT_BODY = 'Vazirmatn';
const FONT_DISPLAY = 'Fraunces';

const IMG = {
	cosmetics: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
	fmcg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
	organic: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
	warehouse: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80',
	honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
	skincare: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
	pickles: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=80',
};

/* -------------------------------------------------------------- helpers */

const px = (size, unit = 'px') => ({ unit, size: String(size), sizes: [] });

const dim = (top, right, bottom, left, unit = 'px') => ({
	unit,
	top: String(top),
	right: String(right),
	bottom: String(bottom),
	left: String(left),
	isLinked: top === right && right === bottom && bottom === left,
});

const gap = (size, unit = 'px') => ({
	column: String(size),
	row: String(size),
	isLinked: true,
	unit,
	size,
});

/** Section padding with real side gutters on tablets and phones. */
const box = (top, bottom = top, side = 8) => ({
	padding: dim(top, side, bottom, side),
	padding_tablet: dim(Math.round(top * 0.8), 20, Math.round(bottom * 0.8), 20),
	padding_mobile: dim(Math.round(top * 0.7), 16, Math.round(bottom * 0.7), 16),
});

/** Typography controls for one widget prefix. */
const ty = (prefix, { size, tablet, mobile, weight = '600', family, lineHeight, spacing, transform }) => {
	const out = { [`${prefix}_typography`]: 'custom' };
	if (family) out[`${prefix}_font_family`] = family;
	if (weight) out[`${prefix}_font_weight`] = String(weight);
	if (size) out[`${prefix}_font_size`] = px(size);
	if (tablet) out[`${prefix}_font_size_tablet`] = px(tablet);
	if (mobile) out[`${prefix}_font_size_mobile`] = px(mobile);
	if (lineHeight) out[`${prefix}_line_height`] = { unit: 'em', size: String(lineHeight), sizes: [] };
	if (spacing) out[`${prefix}_letter_spacing`] = px(spacing);
	if (transform) out[`${prefix}_text_transform`] = transform;
	return out;
};

const widget = (widgetType, settings = {}, extra = {}) => ({
	id: id(),
	elType: 'widget',
	widgetType,
	settings,
	elements: [],
	isInner: false,
	...extra,
});

const container = (settings = {}, elements = [], extra = {}) => ({
	id: id(),
	elType: 'container',
	settings: {
		content_width: 'boxed',
		flex_direction: 'column',
		flex_gap: gap(24),
		...settings,
	},
	elements,
	isInner: Boolean(extra.isInner),
});

/* -------------------------------------------------------- core widgets */

const widthStyle = (width) =>
	width
		? {
				_element_width: 'custom',
				_element_custom_width: { unit: '%', size: String(width), sizes: [] },
			}
		: {};

const heading = (title, opts = {}) =>
	widget('heading', {
		title,
		header_size: opts.level || 'h2',
		align: opts.align || 'left',
		title_color: opts.color || C.ivory,
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...widthStyle(opts.width),
		...ty('typography', {
			size: opts.size || 32,
			tablet: opts.tablet,
			mobile: opts.mobile,
			weight: opts.weight || '700',
			family: opts.display ? FONT_DISPLAY : FONT_BODY,
			lineHeight: opts.lineHeight || 1.5,
		}),
		_margin: dim(opts.mt ?? 0, 0, opts.mb ?? 12, 0),
	});

const text = (html, opts = {}) =>
	widget('text-editor', {
		editor: /^</.test(html) ? html : `<p>${html}</p>`,
		text_color: opts.color || C.soft,
		align: opts.align || 'left',
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...widthStyle(opts.width),
		...ty('typography', {
			size: opts.size || 15,
			mobile: opts.mobileSize,
			weight: opts.weight || '400',
			lineHeight: opts.lineHeight || 1.95,
		}),
		_margin: dim(opts.mt ?? 0, 0, opts.mb ?? 0, 0),
	});

const eyebrow = (label, opts = {}) =>
	widget('text-editor', {
		editor: `<p>${label}</p>`,
		text_color: opts.color || C.goldSoft,
		_css_classes: opts.classes || 'mr-eyebrow',
		...ty('typography', { size: 11, weight: '600', spacing: 1.4, transform: 'uppercase' }),
	});

const button = (label, url, opts = {}) =>
	widget('button', {
		text: label,
		link: { url: url || '#', is_external: '', nofollow: '', custom_attributes: '' },
		align: opts.align || 'left',
		size: 'md',
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...ty('typography', { size: 14, weight: '600' }),
		background_color:
			opts.variant === 'outline' ? C.surface : opts.variant === 'ghost' ? 'rgba(246,241,230,0.14)' : C.emerald,
		button_text_color: opts.variant === 'ivory' ? C.deep : C.ivory,
		hover_color: opts.variant === 'ivory' ? C.deep : C.ivory,
		button_background_hover_color:
			opts.variant === 'ivory' ? '#ffffff' : opts.variant === 'outline' ? C.mint : C.botanical,
		border_border: 'solid',
		border_width: dim(1, 1, 1, 1),
		border_color:
			opts.variant === 'ivory'
				? 'rgba(255,255,255,0.6)'
				: opts.variant === 'outline'
					? 'rgba(51,96,75,0.55)'
					: opts.variant === 'ghost'
						? 'rgba(255,255,255,0.5)'
						: C.emerald,
		border_radius: px(999),
		text_padding: dim(12, 24, 12, 24),
		_margin: dim(0, opts.mr ?? 12, 0, 0),
	});

const iconBox = (icon, title, description, opts = {}) =>
	widget('icon-box', {
		selected_icon: { value: icon, library: 'fa-solid' },
		title_text: title,
		description_text: description,
		position: opts.position || 'top',
		title_size: opts.titleTag || 'h3',
		primary_color: opts.iconColor || C.emeraldSoft,
		title_color: opts.titleColor || C.ivory,
		description_color: opts.descriptionColor || C.soft,
		icon_size: px(opts.iconSize || 20),
		icon_space: px(opts.iconSpace ?? 12),
		text_align: opts.align || 'left',
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...ty('title_typography', { size: opts.titleSize || 15, weight: '700', lineHeight: 1.6 }),
		...ty('description_typography', { size: opts.descriptionSize || 12, weight: '400', lineHeight: 1.85 }),
		...(opts.padding ? { _padding: opts.padding } : {}),
		...(opts.background
			? { _background_background: 'classic', _background_color: opts.background }
			: {}),
		...(opts.radius ? { _border_radius: dim(opts.radius, opts.radius, opts.radius, opts.radius) } : {}),
		...widthStyle(opts.width),
	});

const image = (url, opts = {}) =>
	widget('image', {
		image: { url: url || '', id: '', size: '', alt: opts.alt || '' },
		image_size: 'full',
		align: opts.align || 'center',
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...(opts.radius ? { _border_radius: dim(opts.radius, opts.radius, opts.radius, opts.radius) } : {}),
	});

const imageBox = (url, title, description, opts = {}) =>
	widget('image-box', {
		image: { url: url || '', id: '', alt: opts.alt || title },
		image_size: 'full',
		title_text: title,
		description_text: description,
		position: opts.position || 'top',
		title_size: opts.titleTag || 'h3',
		title_color: opts.titleColor || C.ivory,
		description_color: opts.descriptionColor || C.soft,
		...(opts.classes ? { _css_classes: opts.classes } : {}),
		...ty('title_typography', { size: opts.titleSize || 16, weight: '700', lineHeight: 1.6 }),
		...ty('description_typography', { size: 12, weight: '400', lineHeight: 1.9 }),
	});

const iconList = (items, opts = {}) =>
	widget('icon-list', {
		icon_list: items.map((item, index) => ({
			_id: String(index + 1).padStart(3, '0') + 'a',
			text: item.text,
			selected_icon: { value: item.icon || 'fas fa-check', library: 'fa-solid' },
			...(item.link ? { link: { url: item.link, is_external: '', nofollow: '' } } : {}),
		})),
		space_between: px(opts.space || 10),
		icon_color: opts.iconColor || C.emeraldSoft,
		text_color: opts.textColor || C.soft,
		icon_size: px(opts.iconSize || 12),
		text_indent: px(opts.indent ?? 8),
		divider: opts.divider ? 'yes' : '',
		...ty('icon_typography', { size: opts.size || 13, weight: '500', lineHeight: 1.85 }),
		...(opts.classes ? { _css_classes: opts.classes } : {}),
	});

const counter = (number, title, opts = {}) =>
	widget('counter', {
		starting_number: 0,
		ending_number: number,
		...(opts.suffix ? { suffix: opts.suffix } : {}),
		title,
		number_color: opts.numberColor || C.ivory,
		title_color: opts.titleColor || C.soft,
		...ty('typography_number', { size: 34, weight: '700', family: FONT_DISPLAY, lineHeight: 1.2 }),
		...ty('typography_title', { size: 12, weight: '400' }),
		...widthStyle(opts.width),
	});

const divider = (opts = {}) =>
	widget('divider', {
		color: opts.color || 'rgba(51,96,75,0.4)',
		weight: px(opts.weight || 1),
		width: { unit: '%', size: String(opts.width || 100), sizes: [] },
		gap: px(opts.gap || 16),
	});

const custom = (widgetType, settings) => widget(widgetType, settings);

/* ----------------------------------------------------------- containers */

const section = (settings, children) =>
	container({ flex_direction: 'column', flex_gap: gap(24), ...settings }, children);

const row = (children, settings = {}) =>
	container({ content_width: 'full', flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(20), ...settings }, children, {
		isInner: true,
	});

const column = (children, width, settings = {}) =>
	container(
		{
			content_width: 'full',
			flex_direction: 'column',
			flex_gap: gap(12),
			flex_basis: { unit: '%', size: String(width), sizes: [] },
			_element_width: 'custom',
			_element_custom_width: { unit: '%', size: String(width), sizes: [] },
			...settings,
		},
		children,
		{ isInner: true }
	);

/* ------------------------------------------------------------ page: home */

const homePage = () => [
	/* 1 — cinematic hero */
	section(
		{
			content_width: 'full',
			flex_gap: gap(0),
			padding: dim(0, 0, 0, 0),
			background_background: 'classic',
			background_color: C.deep,
		},
		[
			custom('mr-hero', {
				// The films ship with the plugin, so a fresh import works at once;
				// replace them with Media Library files from the widget panel.
				video_url: { url: '/wp-content/plugins/mr-store-elementor/assets/media/hero-cinematic.mp4', id: '', alt: '' },
				poster: { url: '/wp-content/plugins/mr-store-elementor/assets/media/hero-poster.jpg', id: '', alt: '' },
				scroll_length: { unit: 'vh', size: 300, sizes: [] },
				eyebrow: 'بازار عمده‌فروشی بین‌المللی',
				title: 'تأمین عمده از',
				title_highlight: 'تأمین‌کنندگان معتبر',
				subtitle:
					'محصولات آرایشی و بهداشتی، کالاهای مصرفی و ارگانیک از تولیدکنندگان بررسی‌شده برای واردکنندگان و توزیع‌کنندگان در بیش از ۱۸۰ کشور.',
				cta_primary_text: 'استعلام قیمت عمده',
				cta_primary_link: { url: '/contact/', is_external: '', nofollow: '' },
				cta_secondary_text: 'مشاهده محصولات',
				cta_secondary_link: { url: '/products/', is_external: '', nofollow: '' },
				scroll_hint: 'برای دیدن فیلم اسکرول کنید',
				show_brandbar: 'yes',
				brand_initials: 'MR',
				brand_name: 'MR STORE',
				brand_tagline: 'بازار عمده‌فروشی بین‌المللی',
				brand_cta_text: 'گفتگو با کارشناس تجارت',
				brand_cta_link: { url: '/contact/', is_external: '', nofollow: '' },
				stats: [
					{ _id: '1a1', value: '۱۲٫۴۰۰+', label: 'تأمین‌کننده تأییدشده' },
					{ _id: '1a2', value: '۱۸۰+', label: 'کشور مقصد' },
					{ _id: '1a3', value: '۳', label: 'صنعت اصلی' },
				],
				overlay_color: 'rgba(5,16,11,0.55)',
				title_color: C.ivory,
				highlight_color: C.goldSoft,
			}),
		]
	),

	/* 2 — assurance badges */
	section(
		{
			...box(28),
			background_background: 'classic',
			background_color: C.surface,
			border_border: 'solid',
			border_width: dim(0, 0, 1, 0),
			border_color: 'rgba(51,96,75,0.35)',
		},
		[
			row(
				[
					iconBox('fas fa-seedling', '۱۰۰٪ ارگانیک', 'مواد اولیه با منشأ طبیعی', {
						width: 25,
						position: 'left',
						titleSize: 13,
						descriptionSize: 11,
					}),
					iconBox('fas fa-certificate', 'کنترل کیفیت', 'محصولات دارای گواهی و بازرسی', {
						width: 25,
						position: 'left',
						titleSize: 13,
						descriptionSize: 11,
					}),
					iconBox('fas fa-ship', 'ارسال جهانی', 'حمل تجمیعی تا درب انبار شما', {
						width: 25,
						position: 'left',
						titleSize: 13,
						descriptionSize: 11,
					}),
					iconBox('fas fa-headset', 'پشتیبانی بازرگانی', 'مدیر اختصاصی از استعلام تا تحویل', {
						width: 25,
						position: 'left',
						titleSize: 13,
						descriptionSize: 11,
					}),
				],
				{ flex_gap: gap(24) }
			),
		]
	),

	/* 3 — category strip */
	section(
		{
			...box(20),
			background_background: 'classic',
			background_color: C.surface,
			border_border: 'solid',
			border_width: dim(0, 0, 1, 0),
			border_color: 'rgba(51,96,75,0.35)',
		},
		[
			row(
				[
					['fas fa-sparkles', 'آرایشی و بهداشتی', '/products/?category=cosmetics'],
					['fas fa-leaf', 'دمنوش و گیاهان خشک', '/products/?category=organic'],
					['fas fa-seedling', 'غذای ارگانیک و سوپرفود', '/products/?category=organic'],
					['fas fa-tint', 'روغن و عصاره گیاهی', '/products/?category=organic'],
					['fas fa-box-open', 'ترشی و کنسرو', '/products/?category=fmcg'],
					['fas fa-soap', 'صابون و شوینده طبیعی', '/products/?category=cosmetics'],
					['fas fa-flask', 'اسانس‌ها', '/products/?mr_q=Essential'],
					['fas fa-th', 'همه دسته‌ها', '/products/'],
				].map(([icon, label, url]) =>
					iconBox(icon, label, '', {
						width: 12.5,
						align: 'center',
						iconSize: 18,
						titleSize: 12,
						iconSpace: 8,
						classes: 'mr-category-chip',
						padding: dim(8, 4, 8, 4),
					})
				),
				{ flex_gap: gap(4) }
			),
		]
	),

	/* 4 — main industries */
	section(
		{ ...box(72), background_background: 'classic', background_color: C.surface },
		[
			eyebrow('صنایع محصول'),
			heading('سه صنعت، یک بازار عمده‌فروشی معتبر', {
				level: 'h2',
				size: 30,
				mobile: 24,
				display: true,
				mb: 10,
			}),
			text(
				'تولیدکنندگان و عمده‌فروشان هر سه صنعت اصلی از نظر گواهی‌ها، ظرفیت تولید و آمادگی صادرات بررسی شده‌اند.',
				{ size: 14, mb: 8 }
			),
			button('مشاهده همه محصولات', '/products/', { variant: 'outline', mr: 0 }),
			row(
				[
					custom('mr-botanical-card', {
						image: { url: IMG.cosmetics, id: '', alt: 'آرایشی و بهداشتی' },
						badge: '۱۰+',
						title: 'آرایشی و بهداشتی',
						title_tag: 'h3',
						text: 'مراقبت پوست، مراقبت مو و محصولات زیبایی از تولیدکنندگان دارای گواهی، با قابلیت ردیابی کامل مواد اولیه.',
						link_text: 'مشاهده آرایشی و بهداشتی',
						link: { url: '/products/?category=cosmetics', is_external: '', nofollow: '' },
						vine_seed: 11,
						animation: 'fadeInUp',
						animation_duration: 'fast',
						items: [
							{ _id: 'c1', label: 'مراقبت پوست' },
							{ _id: 'c2', label: 'مراقبت مو' },
							{ _id: 'c3', label: 'مراقبت بدن' },
							{ _id: 'c4', label: 'محصولات زیبایی' },
							{ _id: 'c5', label: 'آرایش' },
							{ _id: 'c6', label: 'آرایشی طبیعی' },
							{ _id: 'c7', label: 'صابون و شوینده' },
						],
					}),
					custom('mr-botanical-card', {
						image: { url: IMG.fmcg, id: '', alt: 'کالاهای مصرفی سریع‌المصرف' },
						badge: '۱۰+',
						title: 'کالاهای مصرفی سریع‌المصرف (FMCG)',
						title_tag: 'h3',
						text: 'کالاهای مصرفی روزمره با بسته‌بندی آماده عرضه، به صورت بار کامل کانتینر یا پالت ترکیبی.',
						link_text: 'مشاهده FMCG',
						link: { url: '/products/?category=fmcg', is_external: '', nofollow: '' },
						vine_seed: 23,
						animation: 'fadeInUp',
						animation_duration: 'fast',
						animation_delay: 120,
						items: [
							{ _id: 'f1', label: 'غذای بسته‌بندی‌شده' },
							{ _id: 'f2', label: 'نوشیدنی' },
							{ _id: 'f3', label: 'چای و قهوه' },
							{ _id: 'f4', label: 'تنقلات' },
							{ _id: 'f5', label: 'ترشی و کنسرو' },
							{ _id: 'f6', label: 'شوینده خانگی' },
							{ _id: 'f7', label: 'بهداشت فردی' },
						],
					}),
					custom('mr-botanical-card', {
						image: { url: IMG.organic, id: '', alt: 'محصولات ارگانیک و طبیعی' },
						badge: '۱۱+',
						title: 'ارگانیک و طبیعی',
						title_tag: 'h3',
						text: 'گیاهان دارویی، روغن‌های سردفشرده و سوپرفودهای ارگانیک با گواهی‌های بین‌المللی.',
						link_text: 'مشاهده ارگانیک',
						link: { url: '/products/?category=organic', is_external: '', nofollow: '' },
						vine_seed: 37,
						animation: 'fadeInUp',
						animation_duration: 'fast',
						animation_delay: 240,
						items: [
							{ _id: 'o1', label: 'گیاهان خشک' },
							{ _id: 'o2', label: 'دمنوش' },
							{ _id: 'o3', label: 'روغن گیاهی' },
							{ _id: 'o4', label: 'عسل طبیعی' },
							{ _id: 'o5', label: 'سوپرفود' },
							{ _id: 'o6', label: 'ادویه' },
						],
					}),
				],
				{ flex_gap: gap(20), align_items: 'stretch' }
			),
		]
	),

	/* 5 — featured products */
	section(
		{ ...box(72), background_background: 'classic', background_color: C.surface2 },
		[
			custom('mr-catalog-grid', {
				source: 'products',
				category: 'all',
				limit: 6,
				columns: '3',
				columns_tablet: '2',
				columns_mobile: '1',
				show_filters: '',
				eyebrow: 'عرضه عمده تأییدشده',
				title: 'پیشنهادهای برگزیده این هفته',
				description:
					'انتخابی از محصولات تأمین‌کنندگان بررسی‌شده، با اسناد آماده صادرات و حداقل سفارش منعطف.',
				more_text: 'مشاهده همه محصولات',
				more_link: { url: '/products/', is_external: '', nofollow: '' },
				card_background: C.surface,
				title_color: C.ivory,
				accent_color: C.emeraldSoft,
			}),
		]
	),

	/* 6 — wholesale programme band */
	section(
		{ ...box(0, 72), background_background: 'classic', background_color: C.surface },
		[
			row(
				[
					column(
						[
							eyebrow('برنامه عمده‌فروشی'),
							heading('خرید عمده برای کسب‌وکار شما', {
								level: 'h2',
								size: 28,
								mobile: 22,
								display: true,
								mb: 10,
							}),
							text(
								'از یک پالت تا برنامه‌های کانتینری مستمر — شرایط شفاف، استاندارد کیفیت توافق‌شده و برنامه تأمین متناسب با بازار شما.',
								{ size: 14, color: 'rgba(246,241,230,0.68)' }
							),
							row(
								[
									button('استعلام قیمت عمده', '#quote', {
										variant: 'ivory',
										classes: 'mr-quote-trigger',
										mr: 0,
									}),
									button('شرایط عمده‌فروشی', '/wholesale/', { variant: 'ghost', mr: 0 }),
								],
								{ flex_gap: gap(12) }
							),
						],
						54,
						{ justify_content: 'center' }
					),
					column(
						[
							iconBox('fas fa-boxes', 'بار ترکیبی', 'چند تأمین‌کننده در یک محموله تجمیع می‌شود.', {
								position: 'left',
								titleSize: 14,
								descriptionSize: 11,
								background: 'rgba(255,255,255,0.08)',
								radius: 16,
								padding: dim(12, 14, 12, 14),
								iconColor: C.goldSoft,
							}),
							iconBox('fas fa-file-invoice', 'اسناد صادرات', 'گواهی مبدأ، گواهی بهداشت و پشتیبانی برچسب‌گذاری.', {
								position: 'left',
								titleSize: 14,
								descriptionSize: 11,
								background: 'rgba(255,255,255,0.08)',
								radius: 16,
								padding: dim(12, 14, 12, 14),
								iconColor: C.goldSoft,
							}),
							iconBox('fas fa-headset', 'مدیر اختصاصی', 'یک مدیر حساب از استعلام تا تحویل.', {
								position: 'left',
								titleSize: 14,
								descriptionSize: 11,
								background: 'rgba(255,255,255,0.08)',
								radius: 16,
								padding: dim(12, 14, 12, 14),
								iconColor: C.goldSoft,
							}),
						],
						40,
						{ justify_content: 'center', flex_gap: gap(12) }
					),
				],
				{
					padding: dim(36, 32, 36, 32),
					padding_mobile: dim(24, 18, 24, 18),
					flex_gap: gap(28),
					background_background: 'classic',
					background_image: { url: IMG.warehouse, id: '', size: '', alt: '' },
					background_position: 'center center',
					background_size: 'cover',
					background_overlay_background: 'classic',
					background_overlay_color: C.navy,
					background_overlay_opacity: { unit: 'px', size: 0.92, sizes: [] },
					border_radius: dim(24, 24, 24, 24),
					align_items: 'center',
				}
			),
		]
	),

	/* 7 — Eurasia markets */
	section(
		{ ...box(72), background_background: 'classic', background_color: C.surface2 },
		[
			custom('mr-eurasia-map', {
				eyebrow: 'بازارهای هدف · TARGET MARKETS',
				title: 'Our Markets Across Eurasia',
				description:
					'Connecting markets, building partnerships, and creating opportunities across the Eurasian region.',
				description_fa:
					'بازارهای هدف ما در سراسر اوراسیا؛ اتصال بازارها، ساخت شراکت‌های بلندمدت و آفرینش فرصت برای واردکنندگان و توزیع‌کنندگان منطقه.',
				default_country: 'IRN',
				reference_iso2: 'ir',
				cta_text: 'استعلام برای این بازار',
				cta_link: { url: '/contact/', is_external: '', nofollow: '' },
				map_background: '#08190f',
				country_color: C.emerald,
				country_hover_color: C.emeraldSoft,
			}),
		]
	),

	/* 8 — popular categories / collections / why us */
	section(
		{ ...box(0, 72), background_background: 'classic', background_color: C.surface },
		[
			row(
				[
					column(
						[
							heading('دسته‌های پرطرفدار', { level: 'h2', size: 18, mb: 12 }),
							iconList(
								[
									{ text: 'آرایشی طبیعی', link: '/products/?category=cosmetics' },
									{ text: 'دمنوش گیاهی', link: '/products/?category=organic' },
									{ text: 'ترشی و کنسرو', link: '/products/?category=fmcg' },
									{ text: 'روغن و عصاره گیاهی', link: '/products/?category=organic' },
									{ text: 'غذای ارگانیک', link: '/products/?category=organic' },
									{ text: 'اسانس‌ها', link: '/products/?mr_q=Essential' },
									{ text: 'صابون طبیعی', link: '/products/?category=cosmetics' },
									{ text: 'گیاهان خشک و ادویه', link: '/products/?category=fmcg' },
								],
								{ icon: 'fas fa-leaf', size: 13, space: 12, divider: true }
							),
							button('همه محصولات', '/products/', { variant: 'outline', mr: 12 }),
						],
						30,
						{
							padding: dim(20, 20, 20, 20),
							background_background: 'classic',
							background_color: C.surface2,
							border_radius: dim(16, 16, 16, 16),
							border_border: 'solid',
							border_width: dim(1, 1, 1, 1),
							border_color: 'rgba(51,96,75,0.25)',
						}
					),
					column(
						[
							imageBox(
								IMG.skincare,
								'مراقبت طبیعی برای زیبایی سالم',
								'مراقبت پوست، مو و زیبایی گیاهی از تولیدکنندگان دارای گواهی.',
								{ titleSize: 15, classes: 'mr-image-card' }
							),
							imageBox(
								IMG.pickles,
								'ترشی و غذاهای تخمیری طبیعی',
								'دستورهای سنتی با بسته‌بندی پایدار و برچسب آماده عرضه در هر بازار.',
								{ titleSize: 15, classes: 'mr-image-card' }
							),
						],
						36,
						{ flex_gap: gap(16) }
					),
					column(
						[
							heading('چرا MR Store؟', { level: 'h2', size: 18, mb: 10 }),
							iconList(
								[
									{ text: 'تأمین‌کنندگان تأییدشده با کارخانه‌های بازرسی‌شده' },
									{ text: 'معاملات امن و تضمین تجاری' },
									{ text: 'لجستیک جهانی از تولیدکننده تا درب انبار' },
									{ text: 'پشتیبانی اختصاصی در منطقه زمانی شما' },
								],
								{ icon: 'fas fa-check-circle', size: 13, space: 12 }
							),
							heading('پشتیبانی تأمین', { level: 'h3', size: 15, mt: 12, mb: 6 }),
							text(
								'تیم بازرگانی ما ظرفیت تولید، اسناد و زمان‌بندی حمل را پیش از هر پیش‌فاکتور بررسی می‌کند.',
								{ size: 12 }
							),
							button('دنبال تأمین‌کننده هستید؟', '/contact/', { variant: 'outline', mr: 12 }),
						],
						30,
						{ justify_content: 'center' }
					),
				],
				{ flex_gap: gap(20), align_items: 'stretch' }
			),
		]
	),

	/* 9 — explore paths */
	section(
		{ ...box(72), background_background: 'classic', background_color: C.surface2 },
		[
			eyebrow('مسیرهای همکاری'),
			heading('از کجا شروع می‌کنید؟', { level: 'h2', size: 28, mobile: 22, display: true, mb: 10 }),
			text('هر مسیر شما را به یک کارشناس تجارت اختصاصی متصل می‌کند؛ از انتخاب محصول تا استعلام قیمت عمده.', {
				size: 14,
				mb: 8,
			}),
			row(
				[
					['fas fa-box-open', 'محصولات عمده', 'کاتالوگ کامل محصولات آرایشی، مصرفی و ارگانیک با حداقل سفارش مشخص.', '/products/'],
					['fas fa-building', 'تأمین‌کنندگان', 'تولیدکنندگان بررسی‌شده و ظرفیت صادرات هر یک.', '/suppliers/'],
					['fas fa-handshake', 'شرایط عمده‌فروشی', 'مراحل استعلام، نمونه، قرارداد و حمل‌ونقل تجمیعی.', '/wholesale/'],
					['fas fa-layer-group', 'همکاری با ما', 'برند اختصاصی، نمایندگی توزیع و همکاری بازارگاهی.', '/partnership/'],
					['fas fa-info-circle', 'درباره MR Store', 'داستان ما، ارزش‌ها و مسیر رشد در تجارت طبیعی.', '/about/'],
					['fas fa-envelope', 'تماس و استعلام', 'گفتگو با کارشناس تجارت و ثبت درخواست همکاری.', '/contact/'],
				].map(([icon, title, body, url]) =>
					column(
						[
							iconBox(icon, title, body, { position: 'left', titleSize: 14, descriptionSize: 12 }),
							button('ادامه مسیر', url, { variant: 'outline', mr: 0 }),
						],
						31,
						{
							padding: dim(20, 20, 20, 20),
							background_background: 'classic',
							background_color: C.surface,
							border_radius: dim(16, 16, 16, 16),
							border_border: 'solid',
							border_width: dim(1, 1, 1, 1),
							border_color: 'rgba(51,96,75,0.2)',
						}
					)
				),
				{ flex_gap: gap(16) }
			),
		]
	),

	/* 10 — trade contact band */
	section(
		{ ...box(72), background_background: 'classic', background_color: C.deep },
		[
			row(
				[
					column(
						[
							eyebrow('شروع همکاری'),
							heading('سفارش عمده بعدی شما با یک گفتگو شروع می‌شود', {
								level: 'h2',
								size: 28,
								mobile: 22,
								display: true,
								mb: 10,
							}),
							text(
								'فهرست محصولات، حجم تقریبی و بازار مقصد را برای ما بنویسید. تیم بازرگانی MR Store شرایط تأمین، نمونه و حمل‌ونقل را برای شما آماده می‌کند.',
								{ size: 14, color: 'rgba(246,241,230,0.62)' }
							),
							row(
								[
									button('استعلام قیمت عمده', '#quote', {
										variant: 'ivory',
										classes: 'mr-quote-trigger',
										mr: 0,
									}),
									button('درخواست همکاری', '/partnership/', { variant: 'ghost', mr: 0 }),
								],
								{ flex_gap: gap(12) }
							),
						],
						52,
						{ justify_content: 'center' }
					),
					column(
						[
							iconBox('fas fa-envelope', 'ایمیل بازرگانی', 'trade@mrstore.global', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 14,
							}),
							iconBox('fas fa-phone', 'تلفن', '+971 4 000 1188', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 14,
							}),
							iconBox('fas fa-map-marker-alt', 'دفتر مرکزی', 'دبی · استانبول · شانگهای', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 14,
							}),
							iconBox('fas fa-clock', 'زمان پاسخ', 'حداکثر یک روز کاری', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 14,
							}),
						],
						44,
						{ flex_gap: gap(12), justify_content: 'center' }
					),
				],
				{ flex_gap: gap(32), align_items: 'center' }
			),
		]
	),
];

/* --------------------------------------------------------- page: products */

const productsPage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('کاتالوگ عمده‌فروشی'),
			heading('محصولات عمده', { level: 'h1', size: 36, mobile: 26, display: true, mb: 10 }),
			text(
				'محصولات آماده صادرات از تولیدکنندگان تأییدشده در سه صنعت آرایشی و بهداشتی، کالاهای مصرفی و ارگانیک. قیمت هر قلم بر پایه حجم سفارش و بازار مقصد اعلام می‌شود.',
				{ size: 15 }
			),
		]
	),
	section(
		{ ...box(16, 64), background_background: 'classic', background_color: C.page },
		[
			custom('mr-catalog-grid', {
				source: 'products',
				category: 'all',
				limit: 12,
				columns: '3',
				columns_tablet: '2',
				columns_mobile: '1',
				show_filters: 'yes',
				eyebrow: '',
				title: '',
				description: '',
				more_text: '',
				more_link: { url: '', is_external: '', nofollow: '' },
				card_background: C.surface,
				title_color: C.ivory,
				accent_color: C.emeraldSoft,
			}),
		]
	),
];

/* -------------------------------------------------------- page: suppliers */

const suppliersPage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('شبکه تأییدشده'),
			heading('تأمین‌کنندگان و تولیدکنندگان', { level: 'h1', size: 36, mobile: 26, display: true, mb: 10 }),
			text(
				'هر تأمین‌کننده در MR Store از نظر سابقه تجاری و گواهی‌ها بررسی شده و حداقل دو خریدار بین‌المللی او را تأیید کرده‌اند.',
				{ size: 15 }
			),
		]
	),
	section(
		{ ...box(16, 64), background_background: 'classic', background_color: C.page },
		[
			custom('mr-catalog-grid', {
				source: 'suppliers',
				category: 'all',
				limit: 12,
				columns: '3',
				columns_tablet: '2',
				columns_mobile: '1',
				show_filters: '',
				eyebrow: 'شرکای بازرسی‌شده',
				title: 'تولیدکنندگانی که پشت محصولات هستند',
				description: 'تمام همکاری‌ها بر پایه حداقل سفارش شفاف، اسناد کامل و ظرفیت صادرات واقعی شکل می‌گیرد.',
				more_text: '',
				more_link: { url: '', is_external: '', nofollow: '' },
				card_background: C.surface,
				title_color: C.ivory,
				accent_color: C.emeraldSoft,
			}),
		]
	),
];

/* -------------------------------------------------------- page: wholesale */

const wholesalePage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('برنامه عمده‌فروشی'),
			heading('خرید عمده با اطمینان', { level: 'h1', size: 36, mobile: 26, display: true, mb: 10 }),
			text(
				'یک فرایند ساختاریافته تأمین برای واردکنندگان، توزیع‌کنندگان و زنجیره‌های خرده‌فروشی — از نخستین نمونه تا برنامه‌های کانتینری مستمر.',
				{ size: 15 }
			),
			row(
				[
					button('استعلام قیمت عمده', '#quote', { variant: 'ivory', classes: 'mr-quote-trigger', mr: 0 }),
					button('گفتگو با کارشناس تجارت', '/contact/', { variant: 'outline', mr: 0 }),
				],
				{ flex_gap: gap(12) }
			),
		]
	),
	section(
		{ ...box(32, 56), background_background: 'classic', background_color: C.page },
		[
			eyebrow('فرایند کار'),
			heading('سه گام از استعلام تا تحویل', { level: 'h2', size: 28, mobile: 22, display: true, mb: 10 }),
			text('شما با یک مدیر بازرگانی کار می‌کنید که تأمین‌کنندگان، نمونه‌ها، کنترل کیفیت و حمل را هماهنگ می‌کند.', {
				size: 14,
			}),
			row(
				[
					[
						'fas fa-clipboard-list',
						'نیاز خود را ارسال کنید',
						'مشخصات محصول، حجم سفارش، بسته‌بندی و بازار مقصد را بفرستید. تیم ما تا ۲۴ ساعت امکان‌سنجی را اعلام می‌کند.',
					],
					[
						'fas fa-handshake',
						'انتخاب، نمونه و مذاکره',
						'تولیدکنندگان بررسی‌شده را معرفی می‌کنیم، نمونه هماهنگ می‌شود و حداقل سفارش، زمان تحویل و شرایط پرداخت نهایی می‌شود.',
					],
					[
						'fas fa-ship',
						'قرارداد و حمل',
						'ثبت سفارش با بازرسی، بررسی برچسب‌گذاری و حمل تجمیعی تا انبار شما انجام می‌شود.',
					],
				].map(([icon, title, body]) =>
					column([iconBox(icon, title, body, { titleSize: 16, descriptionSize: 12 })], 31, {
						padding: dim(22, 20, 22, 20),
						background_background: 'classic',
						background_color: C.surface,
						border_radius: dim(18, 18, 18, 18),
						border_border: 'solid',
						border_width: dim(1, 1, 1, 1),
						border_color: 'rgba(51,96,75,0.25)',
					})
				),
				{ flex_gap: gap(16) }
			),
		]
	),
	section(
		{ ...box(48, 56), background_background: 'classic', background_color: C.surface2 },
		[
			row(
				[
					column(
						[
							eyebrow('شرایط تجاری'),
							heading('شرایطی که با کسب‌وکار واقعی واردات می‌خواند', {
								level: 'h2',
								size: 26,
								mobile: 20,
								display: true,
								mb: 10,
							}),
							text(
								'هر پیش‌فاکتور همین شش متغیر را شفاف اعلام می‌کند تا تأمین‌کنندگان را در شرایط برابر مقایسه کنید و هزینه نهایی را پیش از تعهد برنامه‌ریزی کنید.',
								{ size: 14 }
							),
							row(
								[
									button('مشاهده محصولات', '/products/', { variant: 'outline', mr: 0 }),
									button('درخواست شرایط', '/contact/', { variant: 'outline', mr: 0 }),
								],
								{ flex_gap: gap(12) }
							),
						],
						42,
						{ justify_content: 'center' }
					),
					column(
						[
							iconList(
								[
									{ text: 'حداقل سفارش — از یک پالت · بار کامل کانتینر برای کالاهای مصرفی' },
									{ text: 'زمان تحویل — ۱۵ تا ۳۵ روز بر اساس تولید و بسته‌بندی' },
									{ text: 'شرایط پرداخت — پیش‌پرداخت و مانده، اعتبار اسنادی یا پرداخت امانی' },
									{ text: 'بسته‌بندی — آماده عرضه، برند اختصاصی یا فله صنعتی' },
									{ text: 'اسناد — گواهی مبدأ، گواهی بهداشت، برگه ایمنی و فهرست مواد' },
									{ text: 'حمل — FOB، CIF، DAP و DDP به بیش از ۱۸۰ کشور' },
								],
								{ icon: 'fas fa-check', size: 13, space: 14, divider: true }
							),
						],
						54,
						{
							padding: dim(24, 24, 24, 24),
							background_background: 'classic',
							background_color: C.surface,
							border_radius: dim(18, 18, 18, 18),
						}
					),
				],
				{ flex_gap: gap(28), align_items: 'center' }
			),
		]
	),
	section(
		{ ...box(48, 64), background_background: 'classic', background_color: C.page },
		[
			row(
				[
					column(
						[
							heading('برنامه فصلی در پیش دارید؟', {
								level: 'h2',
								size: 24,
								mobile: 20,
								display: true,
								mb: 8,
							}),
							text('پیش‌بینی فروش خود را با ما در میان بگذارید تا ظرفیت تولید کالاهای کلیدی شما رزرو شود.', {
								size: 14,
							}),
						],
						64,
						{ justify_content: 'center' }
					),
					column([button('استعلام قیمت عمده', '#quote', { variant: 'ivory', classes: 'mr-quote-trigger', mr: 0 })], 32, {
						justify_content: 'center',
						align_items: 'flex-end',
					}),
				],
				{
					padding: dim(28, 28, 28, 28),
					flex_gap: gap(24),
					background_background: 'classic',
					background_color: C.surface,
					border_radius: dim(20, 20, 20, 20),
					border_border: 'solid',
					border_width: dim(1, 1, 1, 1),
					border_color: 'rgba(201,138,94,0.35)',
					align_items: 'center',
				}
			),
		]
	),
];

/* ------------------------------------------------------ page: partnership */

const partnershipPage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('همکاری'),
			heading('با شبکه MR Store رشد کنید', { level: 'h1', size: 36, mobile: 26, display: true, mb: 10 }),
			text(
				'چه تولیدکننده باشید، چه توزیع‌کننده یا نماینده خریداران، همکاری‌های تجاری بلندمدت را بر پایه توانمندی‌های شما می‌سازیم.',
				{ size: 15 }
			),
			row(
				[
					button('درخواست همکاری', '/contact/', { variant: 'ivory', mr: 0 }),
					button('تماس با ما', '/contact/', { variant: 'outline', mr: 0 }),
				],
				{ flex_gap: gap(12) }
			),
		]
	),
	section(
		{ ...box(32, 56), background_background: 'classic', background_color: C.page },
		[
			eyebrow('برنامه‌ها'),
			heading('سه مسیر برای همکاری', { level: 'h2', size: 28, mobile: 22, display: true, mb: 10 }),
			text('هر برنامه با یک جلسه بررسی تناسب تجاری، محدوده مشخص و اهداف فصلی قابل اندازه‌گیری آغاز می‌شود.', {
				size: 14,
			}),
			row(
				[
					[
						'fas fa-layer-group',
						'برند اختصاصی',
						'برند خود را روی فرمولاسیون‌های آزموده با شرکای تولید دارای گواهی و برچسب‌گذاری منطبق توسعه دهید.',
						['انطباق فرمولاسیون', 'بسته‌بندی و طرح گرافیکی', 'تیراژ تولید از ۳٫۰۰۰ واحد'],
					],
					[
						'fas fa-truck',
						'شریک توزیع',
						'توافق‌نامه منطقه‌ای انحصاری برای واردکنندگان و توزیع‌کنندگان با انبارش و انطباق محلی.',
						['انحصار منطقه‌ای', 'بسته‌های بازاریابی', 'پشتیبانی برنامه‌ریزی موجودی'],
					],
					[
						'fas fa-bullhorn',
						'شریک بازارگاه',
						'آژانس‌ها، بازارگاه‌ها و زنجیره‌های خرده‌فروشی که خریداران واجد شرایط را به شبکه ما معرفی می‌کنند.',
						['شرایط معرفی مشتری', 'میز خریدار اختصاصی', 'بازبینی فصلی'],
					],
				].map(([icon, title, body, points]) =>
					column(
						[
							iconBox(icon, title, body, { titleSize: 16, descriptionSize: 12 }),
							iconList(
								points.map((point) => ({ text: point })),
								{ icon: 'fas fa-check', size: 12, space: 8 }
							),
							button('ثبت درخواست', '/contact/', { variant: 'outline', mr: 0 }),
						],
						31,
						{
							padding: dim(22, 20, 22, 20),
							background_background: 'classic',
							background_color: C.surface,
							border_radius: dim(18, 18, 18, 18),
							border_border: 'solid',
							border_width: dim(1, 1, 1, 1),
							border_color: 'rgba(51,96,75,0.25)',
						}
					)
				),
				{ flex_gap: gap(16) }
			),
		]
	),
	section(
		{ ...box(48, 64), background_background: 'classic', background_color: C.surface2 },
		[
			row(
				[
					column(
						[
							eyebrow('آنچه ارائه می‌دهیم'),
							heading('زیرساخت تجارت، نه فقط معرفی', {
								level: 'h2',
								size: 26,
								mobile: 20,
								display: true,
								mb: 10,
							}),
							text(
								'شرکای ما به تأمین بررسی‌شده، لجستیک تجمیعی، بازرسی کیفیت و پشتیبانی اسناد دسترسی دارند — همان لایه عملیاتی که تجارت فرامرزی را قابل اتکا می‌کند.',
								{ size: 14 }
							),
						],
						40,
						{ justify_content: 'center' }
					),
					column(
						[
							row(
								[
									counter(12400, 'تأمین‌کننده تأییدشده', { suffix: '+', width: 50 }),
									counter(180, 'کشور مقصد', { suffix: '+', width: 50 }),
								],
								{ flex_gap: gap(16) }
							),
							row(
								[
									counter(24, 'زمان پاسخ استعلام', { suffix: ' ساعت', width: 50 }),
									counter(98.6, 'ارسال به‌موقع', { suffix: '٪', width: 50 }),
								],
								{ flex_gap: gap(16) }
							),
						],
						56,
						{ flex_gap: gap(16), justify_content: 'center' }
					),
				],
				{ flex_gap: gap(28), align_items: 'center' }
			),
		]
	),
];

/* ------------------------------------------------------------ page: about */

const aboutPage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('درباره MR Store'),
			heading('طبیعت ارزش می‌آفریند، تجارت آن را جهانی می‌کند', {
				level: 'h1',
				size: 34,
				mobile: 25,
				display: true,
				mb: 10,
			}),
			text(
				'MR Store خریداران بین‌المللی را به تولیدکنندگان و تأمین‌کنندگان محصولات آرایشی، کالاهای مصرفی و ارگانیک متصل می‌کند؛ بر پایه تأمین بررسی‌شده و شرایط شفاف.',
				{ size: 15 }
			),
		]
	),
	section(
		{ ...box(24, 56), background_background: 'classic', background_color: C.page },
		[
			row(
				[
					column(
						[
							eyebrow('داستان ما'),
							heading('یک خانه بازرگانی برای دهه پیش‌روی محصولات طبیعی', {
								level: 'h2',
								size: 26,
								mobile: 20,
								display: true,
								mb: 12,
							}),
							text(
								'کار خود را با یک میز صادرات کوچک برای تأمین مواد اولیه گیاهی برندهای اروپایی آغاز کردیم. امروز MR Store بازارگاهی است که خریداران در آن تأمین‌کنندگان را در شرایط برابر مقایسه می‌کنند و تولیدکنندگان به بازارهایی می‌رسند که پیش‌تر دسترسی نداشتند.',
								{ size: 14, mb: 12 }
							),
							text(
								'تیم ما میان دو سوی هر معامله می‌ایستد: بررسی تولیدکنندگان، کنترل گواهی‌ها، تجمیع محموله‌ها و تضمین شرایطی که اعلام می‌کنیم.',
								{ size: 14, mb: 16 }
							),
							button('گفتگو با تیم ما', '/contact/', { variant: 'outline', mr: 0 }),
						],
						52,
						{ justify_content: 'center' }
					),
					column(
						[
							image(IMG.organic, { alt: 'گیاهان خشک و ادویه روی میز بازار' }),
							image(IMG.honey, { alt: 'شیشه‌های عسل طبیعی' }),
							image(IMG.skincare, { alt: 'محصولات مراقبت پوست طبیعی' }),
						],
						44,
						{ flex_gap: gap(12) }
					),
				],
				{ flex_gap: gap(24), align_items: 'center' }
			),
		]
	),
	section(
		{ ...box(48), background_background: 'classic', background_color: C.surface2 },
		[
			eyebrow('ارزش‌های ما'),
			heading('چهار اصلی که هر معامله را می‌سازد', { level: 'h2', size: 28, mobile: 22, display: true, mb: 10 }),
			text('این اصول در نحوه انتخاب تأمین‌کننده، تدوین شرایط و پاسخ‌گویی ما مشخص است.', { size: 14 }),
			row(
				[
					['fas fa-shield-alt', 'اعتماد پیش از حجم', 'تأمین‌کنندگان پیش از عرضه نخستین محصول، از نظر گواهی، ظرفیت و سابقه صادرات بررسی می‌شوند.'],
					['fas fa-leaf', 'طبیعی به‌صورت پیش‌فرض', 'در همه دسته‌ها اولویت ما تولید ارگانیک، گیاهی و کم‌دخالت است.'],
					['fas fa-globe', 'جهانی از ابتدای طراحی', 'اسناد، برچسب‌گذاری و لجستیک از روز اول برای تجارت فرامرزی طراحی شده‌اند.'],
					['fas fa-award', 'شرایط شفاف', 'حداقل سفارش، زمان تحویل، بسته‌بندی و شرایط پرداخت از ابتدا اعلام می‌شود.'],
				].map(([icon, title, body]) =>
					column([iconBox(icon, title, body, { titleSize: 15, descriptionSize: 12 })], 23, {
						padding: dim(20, 18, 20, 18),
						background_background: 'classic',
						background_color: C.surface,
						border_radius: dim(16, 16, 16, 16),
					})
				),
				{ flex_gap: gap(16) }
			),
		]
	),
	section(
		{ ...box(48, 64), background_background: 'classic', background_color: C.page },
		[
			eyebrow('مسیر ما'),
			heading('از یک میز صادرات تا شبکه‌ای در ۱۸۰ بازار', { level: 'h2', size: 26, mobile: 20, display: true, mb: 8 }),
			iconList(
				[
					{ text: '۱۳۹۳ — آغاز فعالیت به‌عنوان میز بازرگانی منطقه‌ای محصولات آرایشی طبیعی.' },
					{ text: '۱۳۹۷ — ورود به توزیع کالاهای مصرفی در خلیج فارس و CIS.' },
					{ text: '۱۴۰۱ — راه‌اندازی بازارگاه MR Store با ۱٫۲۰۰ تأمین‌کننده تأییدشده.' },
					{ text: '۱۴۰۴ — ۱۲٫۴۰۰ تأمین‌کننده، بیش از ۱۸۰ بازار مقصد و مراکز لجستیک تجمیعی.' },
				],
				{ icon: 'fas fa-seedling', size: 14, space: 14, divider: true }
			),
		]
	),
];

/* ---------------------------------------------------------- page: contact */

const contactPage = () => [
	section(
		{ ...box(56, 24), background_background: 'classic', background_color: C.page },
		[
			eyebrow('تماس با ما'),
			heading('درباره سفارش بعدی شما صحبت کنیم', { level: 'h1', size: 36, mobile: 26, display: true, mb: 10 }),
			text(
				'بگویید چه محصولی تأمین می‌کنید، چه حجمی نیاز دارید و بازار مقصد کجاست. مدیر بازرگانی ما با گزینه‌ها و شرایط پاسخ می‌دهد.',
				{ size: 15 }
			),
		]
	),
	section(
		{ ...box(16, 56), background_background: 'classic', background_color: C.page },
		[
			row(
				[
					column(
						[
							widget('form', {
								form_name: 'استعلام بازرگانی MR Store',
								form_fields: [
									{
										_id: 'name',
										custom_id: 'name',
										field_type: 'text',
										field_label: 'نام و نام خانوادگی',
										placeholder: '',
										required: 'true',
										width: '50',
									},
									{
										_id: 'company',
										custom_id: 'company',
										field_type: 'text',
										field_label: 'نام شرکت',
										placeholder: '',
										required: '',
										width: '50',
									},
									{
										_id: 'email',
										custom_id: 'email',
										field_type: 'email',
										field_label: 'ایمیل کاری',
										placeholder: '',
										required: 'true',
										width: '50',
									},
									{
										_id: 'country',
										custom_id: 'country',
										field_type: 'text',
										field_label: 'کشور مقصد',
										placeholder: '',
										required: '',
										width: '50',
									},
									{
										_id: 'interest',
										custom_id: 'interest',
										field_type: 'select',
										field_label: 'موضوع درخواست',
										field_options:
											'خرید محصولات عمده\nهمکاری به‌عنوان تأمین‌کننده\nتولید با برند اختصاصی\nهمکاری در توزیع\nلجستیک و حمل تجمیعی',
										required: '',
										width: '100',
									},
									{
										_id: 'message',
										custom_id: 'message',
										field_type: 'textarea',
										field_label: 'توضیح درخواست',
										placeholder: '',
										required: 'true',
										width: '100',
										rows: 5,
									},
								],
								email_to: 'trade@mrstore.global',
								email_subject: 'استعلام عمده جدید از وب‌سایت MR Store',
								email_content: '[all-fields]',
								email_from_name: 'MR Store',
								submit_actions: ['email', 'message'],
								success_message:
									'سپاس از شما — تیم بازرگانی حداکثر تا یک روز کاری با گزینه‌های تأمین و شرایط قیمت عمده پاسخ می‌دهد.',
								error_message: 'ارسال پیام ممکن نشد. لطفاً دوباره تلاش کنید.',
								button_text: 'ارسال درخواست',
								button_size: 'md',
								button_background_color: C.emerald,
								button_text_color: C.ivory,
								button_background_hover_color: C.botanical,
								button_border_radius: px(999),
								field_background_color: C.mint,
								field_text_color: C.ivory,
								field_border_color: 'rgba(51,96,75,0.45)',
								label_color: C.soft,
								label_typography_typography: 'custom',
								label_typography_font_family: FONT_BODY,
								label_typography_font_size: px(12),
							}),
						],
						58,
						{
							padding: dim(24, 24, 24, 24),
							background_background: 'classic',
							background_color: C.surface,
							border_radius: dim(20, 20, 20, 20),
							border_border: 'solid',
							border_width: dim(1, 1, 1, 1),
							border_color: 'rgba(51,96,75,0.25)',
						}
					),
					column(
						[
							heading('راه‌های تماس', { level: 'h2', size: 20, mb: 12 }),
							iconBox('fas fa-envelope', 'ایمیل بازرگانی', 'trade@mrstore.global', {
								position: 'left',
								titleSize: 12,
								descriptionSize: 14,
							}),
							iconBox('fas fa-phone', 'تلفن', '+971 4 000 1188', {
								position: 'left',
								titleSize: 12,
								descriptionSize: 14,
							}),
							iconBox('fas fa-map-marker-alt', 'دفتر مرکزی', 'دبی · استانبول · شانگهای', {
								position: 'left',
								titleSize: 12,
								descriptionSize: 14,
							}),
							iconBox('fas fa-clock', 'زمان پاسخ', 'حداکثر یک روز کاری', {
								position: 'left',
								titleSize: 12,
								descriptionSize: 14,
							}),
							divider({ color: 'rgba(51,96,75,0.35)', gap: 20 }),
							text(
								'اگر تأمین‌کننده هستید و می‌خواهید محصولاتتان در MR Store عرضه شود، درخواست خود را با فهرست محصولات و گواهی‌ها ارسال کنید.',
								{ size: 12 }
							),
							button('درخواست عرضه محصول', '/partnership/', { variant: 'outline', mr: 0 }),
						],
						38,
						{
							padding: dim(24, 22, 24, 22),
							background_background: 'classic',
							background_color: C.surface2,
							border_radius: dim(20, 20, 20, 20),
						}
					),
				],
				{ flex_gap: gap(20), align_items: 'stretch' }
			),
		]
	),
];

/* --------------------------------------------------------- header/footer */

const headerTemplate = () => [
	section(
		{
			content_width: 'full',
			...box(10),
			background_background: 'classic',
			background_color: 'rgba(7,23,16,0.94)',
			flex_gap: gap(0),
			_css_classes: 'mr-header',
			// Elementor Pro Motion Effects: the bar follows the scroll.
			sticky: 'top',
			sticky_on: ['desktop', 'tablet', 'mobile'],
			sticky_offset: 0,
			sticky_effects_offset: 0,
		},
		[
			row(
				[
					column(
						[
							heading('MR STORE', { level: 'div', size: 18, display: true, mb: 0 }),
							text('<p>بازار عمده‌فروشی بین‌المللی</p>', {
								size: 11,
								color: 'rgba(246,241,230,0.55)',
							}),
						],
						40,
						{ flex_gap: gap(2), justify_content: 'center' }
					),
					column(
						[
							widget('nav-menu', {
								menu: 'main-menu',
								layout: 'horizontal',
								pointer: 'underline',
								color_menu_item: 'rgba(246,241,230,0.75)',
								color_menu_item_hover: C.emeraldSoft,
								color_menu_item_active: C.emeraldSoft,
								menu_typography_typography: 'custom',
								menu_typography_font_family: FONT_BODY,
								menu_typography_font_size: px(13),
								menu_typography_font_weight: '500',
							}),
						],
						40,
						{ justify_content: 'center' }
					),
					column([button('گفتگو با کارشناس تجارت', '/contact/', { variant: 'ivory', mr: 0 })], 20, {
						justify_content: 'center',
						align_items: 'flex-end',
					}),
				],
				{ justify_content: 'space-between', align_items: 'center' }
			),
		]
	),
];

const footerTemplate = () => [
	section(
		{
			...box(48, 28),
			background_background: 'classic',
			background_color: C.deep,
			border_border: 'solid',
			border_width: dim(1, 0, 0, 0),
			border_color: 'rgba(51,96,75,0.3)',
			_css_classes: 'mr-footer',
		},
		[
			row(
				[
					column(
						[
							heading('MR STORE', { level: 'div', size: 18, display: true, mb: 6 }),
							text(
								'بازارگاه عمده‌فروشی بین‌المللی محصولات آرایشی و بهداشتی، کالاهای مصرفی سریع‌المصرف و محصولات ارگانیک. هر قیمت بر پایه استعلام اعلام می‌شود.',
								{ size: 12, color: 'rgba(169,195,178,0.55)' }
							),
						],
						34
					),
					column(
						[
							heading('بازارگاه', { level: 'h3', size: 13, mb: 10 }),
							iconList(
								[
									{ text: 'محصولات عمده', link: '/products/' },
									{ text: 'تأمین‌کنندگان', link: '/suppliers/' },
									{ text: 'شرایط عمده‌فروشی', link: '/wholesale/' },
									{ text: 'همکاری', link: '/partnership/' },
								],
								{ icon: 'fas fa-angle-left', size: 12, space: 8 }
							),
						],
						20
					),
					column(
						[
							heading('صنایع', { level: 'h3', size: 13, mb: 10 }),
							iconList(
								[
									{ text: 'آرایشی و بهداشتی', link: '/products/?category=cosmetics' },
									{ text: 'کالاهای مصرفی (FMCG)', link: '/products/?category=fmcg' },
									{ text: 'ارگانیک و طبیعی', link: '/products/?category=organic' },
									{ text: 'درباره MR Store', link: '/about/' },
								],
								{ icon: 'fas fa-angle-left', size: 12, space: 8 }
							),
						],
						20
					),
					column(
						[
							heading('تماس', { level: 'h3', size: 13, mb: 10 }),
							iconBox('fas fa-envelope', 'ایمیل', 'trade@mrstore.global', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 12,
								iconSize: 12,
							}),
							iconBox('fas fa-phone', 'تلفن', '+971 4 000 1188', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 12,
								iconSize: 12,
							}),
							iconBox('fas fa-map-marker-alt', 'دفتر', 'دبی · استانبول · شانگهای', {
								position: 'left',
								titleSize: 11,
								descriptionSize: 12,
								iconSize: 12,
							}),
						],
						24
					),
				],
				{ flex_gap: gap(24) }
			),
			text('<p>© MR Store — تمام حقوق محفوظ است. قیمت‌ها فقط با استعلام اعلام می‌شود.</p>', {
				size: 11,
				color: 'rgba(169,195,178,0.45)',
				classes: 'mr-footer__legal',
				mt: 24,
			}),
		]
	),
];

/* ----------------------------------------------------------------- write */

const templates = {
	'home.json': { type: 'page', title: 'MR Store — Home', content: homePage },
	'products.json': { type: 'page', title: 'MR Store — Products', content: productsPage },
	'suppliers.json': { type: 'page', title: 'MR Store — Suppliers', content: suppliersPage },
	'wholesale.json': { type: 'page', title: 'MR Store — Wholesale', content: wholesalePage },
	'partnership.json': { type: 'page', title: 'MR Store — Partnership', content: partnershipPage },
	'about.json': { type: 'page', title: 'MR Store — About', content: aboutPage },
	'contact.json': { type: 'page', title: 'MR Store — Contact', content: contactPage },
	'header.json': { type: 'header', title: 'MR Store — Header', content: headerTemplate, pageSettings: [] },
	'footer.json': { type: 'footer', title: 'MR Store — Footer', content: footerTemplate, pageSettings: [] },
};

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [file, template] of Object.entries(templates)) {
	// Ids are generated per document, so each file is self-contained.
	idCounter = 0;

	const doc = {
		version: '0.4',
		title: template.title,
		type: template.type,
		content: template.content(),
		page_settings: template.pageSettings ?? {
			template: 'elementor_header_footer',
			hide_title: 'yes',
		},
	};

	fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify(doc, null, 1) + '\n');
	console.log('wrote', file);
}

console.log(`\n${Object.keys(templates).length} Elementor templates written to templates/`);
