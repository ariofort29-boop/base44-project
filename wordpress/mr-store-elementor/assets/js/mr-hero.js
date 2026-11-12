/**
 * MR Store — cinematic hero.
 *
 * The hero film is not played: its playback head is driven by the scroll
 * position, so scrolling the 300vh section plays the footage forward and back.
 * Scroll progress is written straight to the <video> element and to a couple of
 * CSS custom properties — never to a framework state — so scrolling never
 * re-renders anything.
 *
 * The <video> is hidden until its metadata has loaded, so a slow network shows
 * the poster instead of a black box, and `prefers-reduced-motion` (or a failed
 * load) leaves a plain, fully readable hero.
 */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	function initHero(root) {
		if (!root || root.dataset.mrHeroBound === '1') {
			return;
		}
		root.dataset.mrHeroBound = '1';

		var video = root.querySelector('[data-mr-hero-player]');
		var copy = root.querySelector('[data-mr-hero-copy]');
		var hint = root.querySelector('[data-mr-hero-hint]');
		var source = root.dataset.mrHeroVideo || '';

		var frame = 0;
		var target = 0;
		var lastProgress = -1;
		var lastFade = -1;

		function staticMode() {
			root.classList.add('is-static');
			root.classList.remove('is-ready');
			if (video) {
				video.pause();
				video.hidden = true;
			}
			if (copy) {
				copy.style.opacity = '';
				copy.style.transform = '';
				copy.style.pointerEvents = '';
			}
		}

		if (!video || !source) {
			staticMode();
			return;
		}

		if (reduceMotion.matches) {
			staticMode();
			return;
		}

		video.hidden = false;

		function ready() {
			if (video.currentTime === 0) {
				video.currentTime = 0.001;
			}
			root.classList.add('is-ready');
		}

		if (video.readyState >= 2) {
			ready();
		} else {
			video.addEventListener('loadeddata', ready, { once: true });
			video.addEventListener('canplay', ready, { once: true });
			video.addEventListener('error', staticMode, { once: true });
		}

		function requestSeek() {
			if (!video || video.seeking || video.readyState < 2) {
				return;
			}
			if (Math.abs(video.currentTime - target) > 0.015) {
				video.currentTime = target;
			}
		}

		function update() {
			frame = 0;
			var rect = root.getBoundingClientRect();
			var distance = rect.height - window.innerHeight;
			if (distance <= 0) {
				return;
			}

			var progress = Math.min(1, Math.max(0, -rect.top / distance));
			var fade = Math.min(1, Math.max(0, (progress - 0.12) / 0.3));

			if (fade !== lastFade) {
				lastFade = fade;
				if (copy) {
					copy.style.opacity = (1 - fade).toFixed(3);
					copy.style.transform = 'translate3d(0,' + (-4 * fade).toFixed(2) + 'rem,0)';
					copy.style.pointerEvents = fade > 0.92 ? 'none' : '';
				}
			}

			if (hint && progress !== lastProgress) {
				hint.style.opacity = Math.max(0, 1 - progress * 9).toFixed(3);
			}

			if (progress === lastProgress) {
				return;
			}
			lastProgress = progress;

			var duration = video.duration;
			if (!duration || !isFinite(duration)) {
				return;
			}

			target = progress >= 1 ? duration - 0.001 : progress * duration;
			requestSeek();
		}

		function schedule() {
			if (!frame) {
				frame = window.requestAnimationFrame(update);
			}
		}

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		video.addEventListener('seeked', requestSeek);

		if (typeof reduceMotion.addEventListener === 'function') {
			reduceMotion.addEventListener('change', function (event) {
				if (event.matches) {
					staticMode();
					window.removeEventListener('scroll', schedule);
				}
			});
		}
	}

	function scan() {
		document.querySelectorAll('[data-mr-hero]').forEach(initHero);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}

	// Elementor editor / frontend re-render support.
	if (window.elementorFrontend && window.elementorFrontend.hooks) {
		window.elementorFrontend.hooks.addAction('frontend/element_ready/mr-hero.default', function ($scope) {
			initHero($scope[0].querySelector('[data-mr-hero]'));
		});
	}
})();
