/**
 * Validates the generated Elementor templates without WordPress.
 *
 * It checks the things Elementor's importer and editor actually depend on:
 * element structure (elType/widgetType/id/settings/elements/isInner), unique
 * ids, native widgets that really exist, required control values for each
 * native widget, and — for the plugin's own widgets — that every setting in the
 * JSON is a control that the PHP widget actually registers.
 *
 * Run: node tools/validate-templates.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(HERE, '..', 'templates');
const PLUGIN_DIR = path.join(HERE, '..', 'mr-store-elementor');

const errors = [];
const warnings = [];
const report = [];

const fail = (file, where, message) => errors.push(`${file} ${where}: ${message}`);
const warn = (file, where, message) => warnings.push(`${file} ${where}: ${message}`);

/* -------------------------------------------------- native widget rules */

const NATIVE = {
	heading: ['title'],
	'text-editor': ['editor'],
	image: [],
	button: ['text', 'link'],
	'icon-box': ['title_text'],
	'icon-box': [],
	'image-box': ['title_text'],
	'icon-list': ['icon_list'],
	counter: ['ending_number', 'title'],
	divider: [],
	spacer: ['space'],
	video: [],
	html: [],
	'nav-menu': ['menu'],
	form: ['form_fields'],
	tab: [],
	'google_maps': ['address'],
	toggle: [],
	accordion: [],
	'testimonial': [],
	'progress': [],
};

/* Widgets this plugin registers, with the PHP file that defines the controls. */
const CUSTOM = {
	'mr-hero': 'widgets/class-mr-store-widget-hero.php',
	'mr-botanical-card': 'widgets/class-mr-store-widget-botanical-card.php',
	'mr-eurasia-map': 'widgets/class-mr-store-widget-eurasia-map.php',
	'mr-catalog-grid': 'widgets/class-mr-store-widget-catalog-grid.php',
};

/* Settings Elementor itself owns on every element (advanced tab + layout). */
const ELEMENTOR_TAIL = /^(_|flex_|padding|margin|background_|border_|box_shadow_|content_width|overflow|sticky|z_index|position|animation|min_height|gap|justify_content|align_items|align_content|width|height|isInner)/;

/** Reads every control name a PHP widget registers. */
function phpControls(file) {
	const source = fs.readFileSync(path.join(PLUGIN_DIR, 'includes', file), 'utf8');
	const names = new Set();

	const patterns = [
		/add_(?:responsive_)?control\(\s*'([a-z0-9_]+)'/g,
		/add_group_control\(\s*[^,]+,\s*array\(\s*'name'\s*=>\s*'([a-z0-9_]+)'/g,
	];

	for (const pattern of patterns) {
		let match;
		while ((match = pattern.exec(source))) names.add(match[1]);
	}

	return names;
}

const customControls = {};
for (const [type, file] of Object.entries(CUSTOM)) {
	customControls[type] = phpControls(file);
	if (customControls[type].size === 0) {
		errors.push(`plugin includes/${file}: no controls parsed`);
	}
}

/* ------------------------------------------------------------- traversal */

function walk(file, elements, where, seen) {
	if (!Array.isArray(elements)) {
		fail(file, where, 'elements is not an array');
		return;
	}

	elements.forEach((element, index) => {
		const at = `${where}[${index}]`;

		if (!element || typeof element !== 'object') {
			fail(file, at, 'element is not an object');
			return;
		}

		['id', 'elType', 'settings', 'elements', 'isInner'].forEach((key) => {
			if (!(key in element)) fail(file, at, `missing "${key}"`);
		});

		if (typeof element.id !== 'string' || !/^[0-9a-z]{5,8}$/.test(element.id)) {
			fail(file, at, `id "${element.id}" is not a 5–8 char lowercase alphanumeric string`);
		} else if (seen.has(element.id)) {
			fail(file, at, `duplicate id "${element.id}"`);
		} else {
			seen.add(element.id);
		}

		if (typeof element.isInner !== 'boolean') {
			fail(file, at, 'isInner is not a boolean');
		}

		if (element.settings === null || typeof element.settings !== 'object' || Array.isArray(element.settings)) {
			fail(file, at, 'settings is not an object');
		}

		if (element.elType === 'container') {
			if (element.isInner && element.settings.content_width && element.settings.content_width !== 'full') {
				warn(file, at, `inner container uses content_width "${element.settings.content_width}"`);
			}
			walk(file, element.elements, at, seen);
			return;
		}

		if (element.elType !== 'widget') {
			fail(file, at, `unknown elType "${element.elType}"`);
			return;
		}

		if (element.elements && element.elements.length) {
			fail(file, at, 'a widget must not contain child elements');
		}

		const type = element.widgetType;

		if (CUSTOM[type]) {
			const allowed = customControls[type];
			Object.keys(element.settings).forEach((key) => {
				if (ELEMENTOR_TAIL.test(key)) return;
				const base = key.replace(/_(tablet|mobile)$/, '');
				if (!allowed.has(base)) {
					fail(file, at, `${type}: setting "${key}" is not registered by the widget`);
				}
			});
			return;
		}

		if (!NATIVE[type]) {
			fail(file, at, `unknown widgetType "${type}"`);
			return;
		}

		(NATIVE[type] || []).forEach((key) => {
			const value = element.settings[key];
			const empty =
				value === undefined ||
				value === null ||
				value === '' ||
				(Array.isArray(value) && value.length === 0);
			if (empty) fail(file, at, `${type}: required setting "${key}" is empty`);
		});

		if (type === 'html') {
			fail(file, at, 'an HTML widget is used — native widgets must replace it');
		}

		if (type === 'icon-list' && Array.isArray(element.settings.icon_list)) {
			element.settings.icon_list.forEach((item, i) => {
				if (!item.text) fail(file, `${at}.icon_list[${i}]`, 'item without text');
				if (!item.selected_icon || !item.selected_icon.value) {
					fail(file, `${at}.icon_list[${i}]`, 'item without an icon');
				}
			});
		}

		if (type === 'form' && Array.isArray(element.settings.form_fields)) {
			const ids = new Set();
			element.settings.form_fields.forEach((field, i) => {
				if (!field._id) fail(file, `${at}.form_fields[${i}]`, 'field without _id');
				if (ids.has(field._id)) fail(file, `${at}.form_fields[${i}]`, 'duplicate field _id');
				ids.add(field._id);
				if (!field.field_type) fail(file, `${at}.form_fields[${i}]`, 'field without field_type');
				if (!field.field_label) fail(file, `${at}.form_fields[${i}]`, 'field without field_label');
			});
			if (!element.settings.email_to) warn(file, at, 'form has no email_to recipient');
		}

		if ((type === 'image' || type === 'image-box') && element.settings.image) {
			if (!element.settings.image.url) fail(file, at, `${type}: image without url`);
		}
	});
}

function count(elements, tally) {
	elements.forEach((element) => {
		tally.total += 1;
		if (element.elType === 'container') {
			tally.containers += 1;
			count(element.elements || [], tally);
			return;
		}
		tally.widgets += 1;
		tally.types[element.widgetType] = (tally.types[element.widgetType] || 0) + 1;
	});
	return tally;
}

/* ------------------------------------------------------------------ main */

const files = fs.readdirSync(TEMPLATE_DIR).filter((name) => name.endsWith('.json')).sort();

if (!files.length) {
	console.error('no templates found in templates/');
	process.exit(1);
}

const totalTally = { total: 0, containers: 0, widgets: 0, types: {} };

for (const file of files) {
	const raw = fs.readFileSync(path.join(TEMPLATE_DIR, file), 'utf8');
	let doc;

	try {
		doc = JSON.parse(raw);
	} catch (error) {
		fail(file, 'root', `invalid JSON — ${error.message}`);
		continue;
	}

	['version', 'title', 'type', 'content', 'page_settings'].forEach((key) => {
		if (!(key in doc)) fail(file, 'root', `missing "${key}"`);
	});

	if (doc.version !== '0.4') warn(file, 'root', `version is "${doc.version}", Elementor exports use "0.4"`);
	if (!['page', 'section', 'header', 'footer', 'container'].includes(doc.type)) {
		fail(file, 'root', `unsupported template type "${doc.type}"`);
	}
	if (!Array.isArray(doc.content) || doc.content.length === 0) {
		fail(file, 'root', 'content is empty');
		continue;
	}
	if (doc.page_settings === null || typeof doc.page_settings !== 'object') {
		fail(file, 'root', 'page_settings is not an object/array');
	}

	if (doc.page_settings && doc.page_settings.template === 'elementor_header_footer') {
		// Elementor Full Width: keeps the theme's header/footer locations.
	} else if (doc.type === 'page') {
		warn(file, 'root', 'page template is not "elementor_header_footer"');
	}

	const tally = count(doc.content, { total: 0, containers: 0, widgets: 0, types: {} });
	totalTally.total += tally.total;
	totalTally.containers += tally.containers;
	totalTally.widgets += tally.widgets;
	Object.entries(tally.types).forEach(([type, n]) => {
		totalTally.types[type] = (totalTally.types[type] || 0) + n;
	});

	walk(file, doc.content, 'content', new Set());

	report.push({
		file,
		type: doc.type,
		sections: doc.content.length,
		elements: tally.total,
		widgets: tally.widgets,
		mb: (Buffer.byteLength(raw) / 1024 / 1024).toFixed(2),
	});
}

/* ---------------------------------------------------------------- output */

const pad = (value, n) => String(value).padEnd(n);

console.log('\nTemplate'.padEnd(18) + 'type'.padEnd(10) + 'sections'.padEnd(10) + 'elements'.padEnd(10) + 'widgets');
console.log('-'.repeat(56));
report.forEach((row) => {
	console.log(
		pad(row.file, 18) + pad(row.type, 10) + pad(row.sections, 10) + pad(row.elements, 10) + row.widgets
	);
});
console.log('-'.repeat(56));
console.log(
	pad('total', 18) + pad('', 10) + pad('', 10) + pad(totalTally.total, 10) + totalTally.widgets
);

console.log('\nWidgets used:');
Object.entries(totalTally.types)
	.sort((a, b) => b[1] - a[1])
	.forEach(([type, n]) => console.log(`  ${type.padEnd(20)} ${n}`));

const customUsed = Object.keys(totalTally.types).filter((type) => CUSTOM[type]);
console.log(`\nNative widget types: ${Object.keys(totalTally.types).length - customUsed.length}`);
console.log(`Plugin widget types: ${customUsed.length} (${customUsed.join(', ')})`);

if (warnings.length) {
	console.log(`\n${warnings.length} warning(s):`);
	warnings.forEach((message) => console.log('  ! ' + message));
}

if (errors.length) {
	console.log(`\n${errors.length} error(s):`);
	errors.forEach((message) => console.log('  x ' + message));
	console.log('\nVALIDATION FAILED');
	process.exit(1);
}

console.log('\nVALIDATION PASSED — structure, ids, widgets and controls all check out.');
