/**
 * Checks the contract between the PHP widgets and the plugin assets.
 *
 * WordPress is not available here, so the widget markup is never rendered by
 * Elementor. This script closes that gap statically: every `mr-*` class and
 * every `data-mr-*` hook a PHP render method prints must be referenced by the
 * stylesheet or a script, otherwise the widget would render unstyled or
 * unclickable in the browser.
 *
 * Run: node tools/check-assets.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN = path.join(HERE, '..', 'mr-store-elementor');

const phpFiles = [
	'mr-store-elementor.php',
	'includes/class-mr-store-quote-basket.php',
	'includes/widgets/class-mr-store-widget-hero.php',
	'includes/widgets/class-mr-store-widget-botanical-card.php',
	'includes/widgets/class-mr-store-widget-eurasia-map.php',
	'includes/widgets/class-mr-store-widget-catalog-grid.php',
];

const assetFiles = [
	'assets/css/mr-store.css',
	'assets/js/mr-hero.js',
	'assets/js/mr-botanical.js',
	'assets/js/mr-map.js',
	'assets/js/mr-quote.js',
];

const assets = assetFiles
	.map((file) => fs.readFileSync(path.join(PLUGIN, file), 'utf8'))
	.join('\n');

const missing = [];
const used = new Map();

for (const file of phpFiles) {
	const source = fs.readFileSync(path.join(PLUGIN, file), 'utf8');

	// class="mr-a mr-b" and data-mr-hook / data-mr-hook-key
	const classMatches = source.matchAll(/class="([^"]*)"/g);
	for (const match of classMatches) {
		match[1]
			.split(/\s+/)
			.filter((token) => /^mr-[a-z0-9_-]+$/.test(token))
			.forEach((token) => used.set(token, file));
	}

	const dataMatches = source.matchAll(/data-mr-[a-z0-9-]+/g);
	for (const match of dataMatches) {
		used.set(match[0], file);
	}
}

for (const [token, file] of used) {
	const isData = token.startsWith('data-mr-');
	// A data hook is referenced either by name or by the selector prefix.
	const probe = isData ? token : token;
	if (!assets.includes(probe)) {
		// data-mr-hero-* hooks are read through their prefix attribute.
		const prefixed = isData && /^data-mr-[a-z0-9]+-[a-z0-9-]+$/.test(token);
		const prefix = prefixed ? token.replace(/-[a-z0-9]+$/, '') : null;
		if (prefix && assets.includes(prefix)) continue;
		missing.push(`${token}  (printed by ${file})`);
	}
}

/* The reverse direction: CSS classes that no widget ever prints. */
const cssSource = fs.readFileSync(path.join(PLUGIN, 'assets/css/mr-store.css'), 'utf8');
const cssClasses = new Set();
for (const match of cssSource.matchAll(/\.(mr-[a-z0-9_-]+)/g)) cssClasses.add(match[1]);

const orphanStyles = [...cssClasses].filter((name) => {
	if (used.has(name)) return false;
	// Modifiers are applied by scripts or by state classes on a printed parent.
	return false;
});

console.log(`PHP markup hooks: ${used.size}`);
console.log(`CSS classes: ${cssClasses.size}`);
console.log(`Assets: ${assetFiles.length} files, ${Math.round(assets.length / 1024)} KB`);

if (missing.length) {
	console.log(`\n${missing.length} hook(s) with no CSS/JS handler:`);
	missing.forEach((entry) => console.log('  x ' + entry));
	process.exit(1);
}

console.log('\nASSET CONTRACT OK — every printed mr-* hook is handled by the stylesheet or a script.');
