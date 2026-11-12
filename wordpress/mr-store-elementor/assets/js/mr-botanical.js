/**
 * MR Store — living botanical vine frame.
 *
 * Draws a stem that walks the card's rounded-rectangle perimeter with a slow
 * organic wobble, then unfolds leaves along it. Geometry is measured in CSS
 * pixels and painted into an absolutely positioned SVG, so stems and leaves
 * keep their real proportions at any card size. Growth is a CSS animation; the
 * only JavaScript is the one-off measurement and an IntersectionObserver that
 * waits until the card is on screen.
 */
(function () {
	'use strict';

	var TAU = Math.PI * 2;
	var LEAF_PATH = 'M0 0 C 2.4 -3.1 3 -8 0 -12.6 C -3 -8 -2.4 -3.1 0 0 Z';

	function toSeed(seed) {
		if (typeof seed === 'number') {
			return Math.abs(seed) % 100000;
		}
		var hash = 0;
		var text = String(seed);
		for (var i = 0; i < text.length; i += 1) {
			hash = (hash * 31 + text.charCodeAt(i)) | 0;
		}
		return Math.abs(hash) % 100000;
	}

	function mulberry32(input) {
		var a = input >>> 0;
		return function () {
			a = (a + 0x6d2b79f5) >>> 0;
			var t = a;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	function buildPerimeter(width, height, radius, inset) {
		var x0 = inset;
		var y0 = inset;
		var x1 = width - inset;
		var y1 = height - inset;
		var r = Math.max(3, Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2));
		var segments = [];

		function line(x, y, dx, dy, len) {
			if (len > 0.5) {
				segments.push({ x: x, y: y, dx: dx, dy: dy, len: len });
			}
		}

		function arc(cx, cy, a0, a1) {
			segments.push({ cx: cx, cy: cy, a0: a0, a1: a1, radius: r, len: Math.abs(a1 - a0) * r });
		}

		line(x0 + r, y0, 1, 0, x1 - x0 - 2 * r);
		arc(x1 - r, y0 + r, -Math.PI / 2, 0);
		line(x1, y0 + r, 0, 1, y1 - y0 - 2 * r);
		arc(x1 - r, y1 - r, 0, Math.PI / 2);
		line(x1 - r, y1, -1, 0, x1 - x0 - 2 * r);
		arc(x0 + r, y1 - r, Math.PI / 2, Math.PI);
		line(x0, y1 - r, 0, -1, y1 - y0 - 2 * r);
		arc(x0 + r, y0 + r, Math.PI, Math.PI * 1.5);

		var total = segments.reduce(function (sum, segment) {
			return sum + segment.len;
		}, 0);

		return { segments: segments, total: total };
	}

	function pointAt(segments, total, distance) {
		var rest = distance % total;
		for (var i = 0; i < segments.length; i += 1) {
			var segment = segments[i];
			if (rest > segment.len) {
				rest -= segment.len;
				continue;
			}
			if (segment.a0 !== undefined) {
				var angle = segment.a0 + (segment.a1 - segment.a0) * (rest / segment.len);
				return {
					x: segment.cx + segment.radius * Math.cos(angle),
					y: segment.cy + segment.radius * Math.sin(angle),
					tx: -Math.sin(angle),
					ty: Math.cos(angle)
				};
			}
			return {
				x: segment.x + segment.dx * rest,
				y: segment.y + segment.dy * rest,
				tx: segment.dx,
				ty: segment.dy
			};
		}
		return { x: 0, y: 0, tx: 1, ty: 0 };
	}

	function buildFrame(width, height, radius, inset, density, seed) {
		var rand = mulberry32(seed * 7919 + 13);
		var perimeter = buildPerimeter(width, height, radius, inset);
		var step = 6;
		var amplitude = 1.2 + rand() * 0.9;
		var waveA = 0.03 + rand() * 0.018;
		var waveB = 0.085 + rand() * 0.03;
		var phase = rand() * TAU;
		var points = [];
		var length = 0;
		var previous = null;

		for (var distance = 0; distance <= perimeter.total; distance += step) {
			var point = pointAt(perimeter.segments, perimeter.total, distance);
			var wobble =
				Math.sin(distance * waveA + phase) * amplitude +
				Math.sin(distance * waveB + phase * 1.7) * 0.55;
			var x = point.x - point.ty * wobble;
			var y = point.y + point.tx * wobble;
			if (previous) {
				length += Math.hypot(x - previous[0], y - previous[1]);
			}
			previous = [x, y];
			points.push(x.toFixed(1) + ' ' + y.toFixed(1));
		}

		var gap = Math.max(30, perimeter.total / density);
		var leaves = [];
		var cursor = gap * 0.4;
		var index = 0;

		while (cursor < perimeter.total && leaves.length < density + 8) {
			var anchor = pointAt(perimeter.segments, perimeter.total, cursor);
			var nx = -anchor.ty;
			var ny = anchor.tx;
			var jitter = (rand() - 0.5) * 0.85;
			leaves.push({
				x: anchor.x.toFixed(1),
				y: anchor.y.toFixed(1),
				angle: ((Math.atan2(nx, -ny) + jitter) * (180 / Math.PI)).toFixed(1),
				scale: (0.62 + rand() * 0.55).toFixed(2),
				delay: (0.18 + (cursor / perimeter.total) * 1.55).toFixed(2),
				swayDelay: (1.6 + rand() * 2.4).toFixed(2),
				tone: index % 3 === 0 ? 'light' : 'dark'
			});
			cursor += gap * (0.78 + rand() * 0.5);
			index += 1;
		}

		return {
			stem: 'M' + points.join(' L'),
			length: length,
			leaves: leaves
		};
	}

	function svgEl(name, attrs) {
		var node = document.createElementNS('http://www.w3.org/2000/svg', name);
		Object.keys(attrs || {}).forEach(function (key) {
			node.setAttribute(key, attrs[key]);
		});
		return node;
	}

	function paint(host) {
		var width = host.clientWidth;
		var height = host.clientHeight;
		if (width < 40 || height < 40) {
			return;
		}

		var seed = toSeed(host.dataset.mrVineSeed || 1);
		var radius = parseFloat(host.dataset.mrVineRadius || '18');
		var density = parseInt(host.dataset.mrVineDensity || '22', 10);
		var frame = buildFrame(width, height, radius, 3, density, seed);
		var gradientId = 'mr-vine-leaf-' + seed;

		var svg = host.querySelector('svg.mr-vine');
		if (!svg) {
			svg = svgEl('svg', {
				class: 'mr-vine',
				'aria-hidden': 'true',
				focusable: 'false'
			});
			host.appendChild(svg);
		}

		svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
		svg.setAttribute('preserveAspectRatio', 'none');
		svg.textContent = '';

		var defs = svgEl('defs');
		var gradient = svgEl('linearGradient', { id: gradientId, x1: '0', y1: '0', x2: '0.3', y2: '1' });
		[['0%', '#6fc494'], ['55%', '#3d9366'], ['100%', '#1a4f36']].forEach(function (stop) {
			gradient.appendChild(svgEl('stop', { offset: stop[0], 'stop-color': stop[1] }));
		});
		defs.appendChild(gradient);
		svg.appendChild(defs);

		svg.appendChild(
			svgEl('path', { class: 'mr-vine__stem', d: frame.stem, style: '--mr-vine-len:' + frame.length })
		);
		svg.appendChild(
			svgEl('path', {
				class: 'mr-vine__stem-glint',
				d: frame.stem,
				style: '--mr-vine-len:' + frame.length
			})
		);

		frame.leaves.forEach(function (leaf) {
			var group = svgEl('g', {
				transform: 'translate(' + leaf.x + ' ' + leaf.y + ') rotate(' + leaf.angle + ')'
			});
			var sway = svgEl('g', { class: 'mr-vine__sway', style: '--mr-sway-delay:' + leaf.swayDelay + 's' });
			var scale = svgEl('g', { transform: 'scale(' + leaf.scale + ')' });

			scale.appendChild(
				svgEl('path', {
					class: 'mr-vine__leaf',
					d: LEAF_PATH,
					fill: leaf.tone === 'light' ? 'url(#' + gradientId + ')' : '#2a744f',
					style: '--mr-leaf-delay:' + leaf.delay + 's'
				})
			);
			scale.appendChild(
				svgEl('path', {
					class: 'mr-vine__vein',
					d: 'M0 0 L0 -11',
					'stroke-width': '0.45',
					style: '--mr-leaf-delay:' + leaf.delay + 's'
				})
			);

			sway.appendChild(scale);
			group.appendChild(sway);
			svg.appendChild(group);
		});
	}

	function initVine(host) {
		if (!host || host.dataset.mrVineBound === '1') {
			return;
		}
		host.dataset.mrVineBound = '1';

		if (window.getComputedStyle(host).position === 'static') {
			host.style.position = 'relative';
		}

		paint(host);

		if (typeof ResizeObserver === 'function') {
			var width = host.clientWidth;
			var height = host.clientHeight;
			var observer = new ResizeObserver(function () {
				if (host.clientWidth !== width || host.clientHeight !== height) {
					width = host.clientWidth;
					height = host.clientHeight;
					paint(host);
				}
			});
			observer.observe(host);
		}

		var svg = host.querySelector('svg.mr-vine');

		if (typeof IntersectionObserver === 'undefined') {
			if (svg) {
				svg.classList.add('is-active');
			}
			return;
		}

		var seen = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting && svg) {
						svg.classList.add('is-active');
						seen.disconnect();
					}
				});
			},
			{ rootMargin: '80px' }
		);

		seen.observe(host);
	}

	function scan(scope) {
		(scope || document).querySelectorAll('[data-mr-vine]').forEach(initVine);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			scan();
		});
	} else {
		scan();
	}

	if (window.elementorFrontend && window.elementorFrontend.hooks) {
		window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
			scan($scope[0]);
		});
	}

	// The map re-paints its details card, whose vine has to be drawn again.
	window.MRStoreBotanical = { init: initVine, scan: scan };
})();
