/**
 * MR Store — interactive Eurasia markets map.
 *
 * Country outlines come from Natural Earth 1:110m (public domain), projected
 * with an Albers equal-area conic so relative market size stays honest. Hover
 * previews a market, click pins it, and the chip list below the map is the
 * keyboard-reachable equivalent of the pointer interaction.
 */
(function () {
	'use strict';

	var config = window.mrStoreMap || null;

	var RAD = Math.PI / 180;

	function albers(lon, lat) {
		var phi1 = 20 * RAD;
		var phi2 = 60 * RAD;
		var lon0 = 70 * RAD;
		var lat0 = 45 * RAD;
		var n = 0.5 * (Math.sin(phi1) + Math.sin(phi2));
		var C = Math.cos(phi1) * Math.cos(phi1) + 2 * n * Math.sin(phi1);
		var rho = Math.sqrt(Math.max(0, C - 2 * n * Math.sin(lat * RAD))) / n;
		var rho0 = Math.sqrt(Math.max(0, C - 2 * n * Math.sin(lat0))) / n;
		var theta = n * (lon * RAD - lon0);
		return [rho * Math.sin(theta), rho0 - rho * Math.cos(theta)];
	}

	function project(shapes, width, height) {
		// Two passes: project every vertex, fit the bounding box, then scale.
		var projected = [];
		var minX = Infinity;
		var maxX = -Infinity;
		var minY = Infinity;
		var maxY = -Infinity;

		shapes.forEach(function (shape) {
			var rings = (shape.polygons || []).map(function (ring) {
				return ring.map(function (point) {
					var p = albers(point[0], point[1]);
					minX = Math.min(minX, p[0]);
					maxX = Math.max(maxX, p[0]);
					minY = Math.min(minY, p[1]);
					maxY = Math.max(maxY, p[1]);
					return p;
				});
			});
			projected.push({ shape: shape, rings: rings });
		});

		if (!isFinite(minX) || maxX === minX || maxY === minY) {
			return { items: [], width: width, height: height };
		}

		var spanX = maxX - minX;
		var spanY = maxY - minY;
		var pad = 12;
		var scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);

		function toPath(ring) {
			return (
				ring
					.map(function (p, index) {
						var x = pad + (p[0] - minX) * scale;
						var y = height - pad - (p[1] - minY) * scale;
						return (index === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
					})
					.join(' ') + ' Z'
			);
		}

		function toPoint(p) {
			return [pad + (p[0] - minX) * scale, height - pad - (p[1] - minY) * scale];
		}

		var items = projected.map(function (entry) {
			return {
				shape: entry.shape,
				paths: entry.rings.filter(function (ring) {
					return ring.length > 2;
				}).map(toPath),
				anchor: entry.shape.label ? toPoint(albers(entry.shape.label[0], entry.shape.label[1])) : null
			};
		});

		return { items: items, width: width, height: height };
	}

	function escapeHtml(value) {
		return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
		});
	}

	function initMap(root) {
		if (!root || root.dataset.mrMapBound === '1' || !config) {
			return;
		}
		root.dataset.mrMapBound = '1';

		var svg = root.querySelector('[data-mr-map-svg]');
		var loading = root.querySelector('[data-mr-map-loading]');
		var details = root.querySelector('[data-mr-map-details]');
		var chipsHost = root.querySelector('[data-mr-map-chips]');
		var viewWidth = 1000;

		var markets = [];
		var byId = {};
		var activeId = config.default || null;
		var pinnedId = config.default || null;

		function detailsMarkup(market, pinned) {
			if (!market) {
				return (
					'<p class="mr-map__placeholder">یک بازار را انتخاب کنید</p>' +
					'<p class="mr-map__placeholder-text">نشانگر را روی کشورهای سبز نقشه ببرید یا از فهرست پایین انتخاب کنید تا اطلاعات بازار نمایش داده شود.</p>'
				);
			}

			var business = market.businessFa
				? '<dd>' + escapeHtml(market.businessFa) + '</dd>'
				: '<dd class="is-placeholder">اطلاعات تجاری این بازار هنوز ثبت نشده است؛ این بخش برای تکمیل توسط تیم بازرگانی MR Store آماده است.</dd>';

			return (
				'<div class="mr-map__detail-head">' +
				'<img class="mr-map__flag" src="https://flagcdn.com/w80/' + escapeHtml(market.iso2) + '.png" alt="پرچم ' + escapeHtml(market.nameFa) + '" loading="lazy" />' +
				'<div>' +
				'<p class="mr-map__detail-title">' + escapeHtml(market.name) + '</p>' +
				'<p class="mr-map__detail-sub">' + escapeHtml(market.nameFa) + ' · ' + escapeHtml(market.regionFa) + '</p>' +
				'</div>' +
				'</div>' +
				'<p class="mr-map__detail-intro">' + escapeHtml(market.introFa) + '</p>' +
				'<dl class="mr-map__facts">' +
				'<div><dt>جایگاه در شبکه بازارها</dt><dd>' + escapeHtml(market.roleFa) + '</dd></div>' +
				'<div><dt>اطلاعات تجاری</dt>' + business + '</div>' +
				'</dl>' +
				(config.ctaText
					? '<a class="mr-map__cta" href="' + escapeHtml(config.ctaUrl) + '">' + escapeHtml(config.ctaText) + ' ←</a>'
					: '')
			);
		}

		function paintDetails() {
			if (!details) {
				return;
			}
			details.innerHTML = detailsMarkup(byId[activeId], activeId === pinnedId);
			details.dataset.mrVineSeed = String(activeId ? activeId.length * 13 + activeId.charCodeAt(0) : 31);
			// Re-measure the vine for the new content height.
			var svgVine = details.querySelector('svg.mr-vine');
			if (svgVine) {
				svgVine.remove();
				details.dataset.mrVineBound = '';
				if (window.MRStoreBotanical) {
					window.MRStoreBotanical.init(details);
				}
			}
		}

		function setActive(id, pin) {
			if (!byId[id]) {
				return;
			}
			activeId = id;
			if (pin) {
				pinnedId = id;
			}
			if (svg) {
				svg.querySelectorAll('.mr-map__country').forEach(function (node) {
					node.classList.toggle('is-active', node.dataset.id === id);
				});
			}
			if (chipsHost) {
				chipsHost.querySelectorAll('.mr-map__chip').forEach(function (chip) {
					chip.classList.toggle('is-active', chip.dataset.id === id);
				});
			}
			paintDetails();
		}

		function render(geo) {
			if (!svg) {
				return;
			}

			var height = Math.round(viewWidth * 0.56);
			var projection = project(geo, viewWidth, height);
			svg.setAttribute('viewBox', '0 0 ' + projection.width + ' ' + projection.height);
			svg.textContent = '';

			var ns = 'http://www.w3.org/2000/svg';
			projection.items.forEach(function (item) {
				var shape = item.shape;
				var market = byId[shape.id];
				var isTarget = Boolean(shape.target && market);
				var isHome = shape.iso2 === config.reference;
				var group = document.createElementNS(ns, 'g');

				item.paths.forEach(function (d) {
					var path = document.createElementNS(ns, 'path');
					path.setAttribute('d', d);
					path.setAttribute('class', 'mr-map__country');
					path.dataset.id = shape.id;
					if (isTarget) {
						path.classList.add('is-target');
					}
					if (isHome) {
						path.classList.add('is-home');
					}
					group.appendChild(path);
				});

				if (isTarget) {
					group.setAttribute('tabindex', '0');
					group.setAttribute('role', 'button');
					group.setAttribute('aria-label', market.nameFa);

					group.addEventListener('mouseenter', function () {
						setActive(shape.id, false);
					});
					group.addEventListener('focus', function () {
						setActive(shape.id, false);
					});
					group.addEventListener('click', function () {
						setActive(shape.id, true);
					});
					group.addEventListener('keydown', function (event) {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							setActive(shape.id, true);
						}
					});
				}

				svg.appendChild(group);

				if (isTarget && item.anchor) {
					var label = document.createElementNS(ns, 'text');
					label.setAttribute('class', 'mr-map__label');
					label.setAttribute('x', item.anchor[0].toFixed(1));
					label.setAttribute('y', item.anchor[1].toFixed(1));
					label.setAttribute('text-anchor', 'middle');
					label.textContent = market.nameFa;
					svg.appendChild(label);
				}
			});

			if (loading) {
				loading.remove();
			}
		}

		function renderChips() {
			if (!chipsHost) {
				return;
			}
			chipsHost.textContent = '';
			markets.forEach(function (market) {
				var item = document.createElement('li');
				var chip = document.createElement('button');
				chip.type = 'button';
				chip.className = 'mr-map__chip';
				chip.dataset.id = market.id;
				chip.textContent = market.nameFa;
				if (market.id === activeId) {
					chip.classList.add('is-active');
				}
				chip.addEventListener('mouseenter', function () {
					setActive(market.id, false);
				});
				chip.addEventListener('click', function () {
					setActive(market.id, true);
				});
				item.appendChild(chip);
				chipsHost.appendChild(item);
			});
		}

		var requests = [
			fetch(config.geoUrl).then(function (response) {
				return response.json();
			}),
			fetch(config.marketsUrl).then(function (response) {
				return response.json();
			})
		];

		Promise.all(requests)
			.then(function (results) {
				markets = Array.isArray(results[1]) ? results[1] : [];
				markets.forEach(function (market) {
					byId[market.id] = market;
				});
				if (!byId[activeId]) {
					activeId = markets.length ? markets[0].id : null;
					pinnedId = activeId;
				}
				renderChips();
				render(Array.isArray(results[0]) ? results[0] : []);
				paintDetails();
			})
			.catch(function () {
				if (loading) {
					loading.textContent = 'نقشه در دسترس نیست؛ از فهرست بازارها استفاده کنید.';
				}
			});
	}

	function scan() {
		document.querySelectorAll('[data-mr-map]').forEach(initMap);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}

	if (window.elementorFrontend && window.elementorFrontend.hooks) {
		window.elementorFrontend.hooks.addAction('frontend/element_ready/mr-eurasia-map.default', function ($scope) {
			initMap($scope[0].querySelector('[data-mr-map]'));
		});
	}
})();
