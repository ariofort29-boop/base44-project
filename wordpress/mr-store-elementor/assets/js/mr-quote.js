/**
 * MR Store — quotation basket.
 *
 * No product has a price on this marketplace: every card, hero and map action
 * adds an item to this basket and the visitor sends one consolidated quotation
 * request. Items persist in localStorage; the request is stored in WordPress
 * (mr_quote) and emailed to the shop admin.
 */
(function () {
	'use strict';

	var config = window.mrStoreQuote;
	if (!config) {
		return;
	}

	var STORAGE_KEY = 'mr-store-quote-items';
	var root = null;
	var panel = null;
	var overlay = null;
	var listHost = null;
	var countHost = null;
	var statusHost = null;
	var form = null;
	var lastFocus = null;

	function read() {
		try {
			var raw = window.localStorage.getItem(STORAGE_KEY);
			var parsed = raw ? JSON.parse(raw) : [];
			return Array.isArray(parsed) ? parsed : [];
		} catch (error) {
			return [];
		}
	}

	function write(items) {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			// Storage can be unavailable (private mode); the basket then lives
			// for this page view only.
		}
	}

	function itemKey(item) {
		return String(item.id || item.name || '') + '|' + String(item.meta || '');
	}

	function add(item) {
		if (!item || (!item.id && !item.name)) {
			return;
		}
		var items = read();
		var exists = items.some(function (entry) {
			return itemKey(entry) === itemKey(item);
		});
		if (!exists) {
			items.push(item);
			write(items);
		}
		render();
		setStatus(exists ? 'این مورد از قبل در فهرست است.' : config.strings.added, false);
		open(true);
	}

	function remove(key) {
		write(
			read().filter(function (entry) {
				return itemKey(entry) !== key;
			})
		);
		render();
	}

	function setStatus(message, isError) {
		if (!statusHost) {
			return;
		}
		statusHost.textContent = message || '';
		statusHost.classList.toggle('is-error', Boolean(isError));
	}

	function render() {
		var items = read();

		if (countHost) {
			countHost.textContent = String(items.length);
		}
		if (root) {
			root.hidden = false;
		}

		if (!listHost) {
			return;
		}

		listHost.textContent = '';
		items.forEach(function (item) {
			var li = document.createElement('li');
			li.className = 'mr-quote__item';

			var text = document.createElement('div');
			var name = document.createElement('p');
			name.className = 'mr-quote__item-name';
			name.textContent = item.name || '';
			text.appendChild(name);

			if (item.meta || item.supplier) {
				var meta = document.createElement('p');
				meta.className = 'mr-quote__item-meta';
				meta.textContent = [item.meta, item.supplier].filter(Boolean).join(' · ');
				text.appendChild(meta);
			}

			var button = document.createElement('button');
			button.type = 'button';
			button.className = 'mr-quote__remove';
			button.textContent = config.strings.remove;
			button.addEventListener('click', function () {
				remove(itemKey(item));
			});

			li.appendChild(text);
			li.appendChild(button);
			listHost.appendChild(li);
		});
	}

	function open(force) {
		if (!panel || !overlay) {
			return;
		}
		if (force || panel.hidden) {
			lastFocus = document.activeElement;
			panel.hidden = false;
			overlay.hidden = false;
			document.documentElement.classList.add('mr-quote-open');
			var first = panel.querySelector('input, textarea, button');
			if (first) {
				first.focus({ preventScroll: true });
			}
		} else {
			close();
		}
	}

	function close() {
		if (!panel || !overlay) {
			return;
		}
		panel.hidden = true;
		overlay.hidden = true;
		document.documentElement.classList.remove('mr-quote-open');
		setStatus('', false);
		if (lastFocus && typeof lastFocus.focus === 'function') {
			lastFocus.focus({ preventScroll: true });
		}
	}

	function submit(event) {
		event.preventDefault();
		if (!form) {
			return;
		}

		var items = read();
		if (!items.length) {
			setStatus(config.strings.empty, true);
			return;
		}

		var data = new FormData(form);
		data.append('action', 'mr_store_quote_submit');
		data.append('nonce', config.nonce);
		data.append('items', JSON.stringify(items));

		var submitButton = form.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.disabled = true;
		}

		fetch(config.ajaxUrl, { method: 'POST', credentials: 'same-origin', body: data })
			.then(function (response) {
				return response.json().then(function (payload) {
					return { ok: response.ok, payload: payload };
				});
			})
			.then(function (result) {
				if (!result.ok || !result.payload || !result.payload.success) {
					var message =
						result.payload && result.payload.data && result.payload.data.message
							? result.payload.data.message
							: config.strings.error;
					setStatus(message, true);
					return;
				}
				write([]);
				render();
				form.reset();
				setStatus(config.strings.sent, false);
			})
			.catch(function () {
				setStatus(config.strings.error, true);
			})
			.finally(function () {
				if (submitButton) {
					submitButton.disabled = false;
				}
			});
	}

	function scan() {
		root = document.querySelector('[data-mr-quote-root]');

		document.querySelectorAll('[data-mr-quote-item]').forEach(function (button) {
			if (button.dataset.mrQuoteBound === '1') {
				return;
			}
			button.dataset.mrQuoteBound = '1';
			button.addEventListener('click', function () {
				var payload = button.getAttribute('data-mr-quote-item');
				if (!payload) {
					add({ id: 'general', name: 'درخواست عمومی تأمین' });
					return;
				}
				try {
					add(JSON.parse(payload));
				} catch (error) {
					add({ id: 'general', name: 'درخواست عمومی تأمین' });
				}
			});
		});

		document.querySelectorAll('[data-mr-quote-open]').forEach(function (trigger) {
			if (trigger.dataset.mrQuoteBound === '1') {
				return;
			}
			trigger.dataset.mrQuoteBound = '1';
			trigger.addEventListener('click', function () {
				open(true);
			});
		});

		if (!root) {
			return;
		}

		panel = root.querySelector('.mr-quote__panel');
		overlay = root.querySelector('.mr-quote__overlay');
		listHost = root.querySelector('[data-mr-quote-items]');
		countHost = root.querySelector('[data-mr-quote-count]');
		statusHost = root.querySelector('[data-mr-quote-status]');
		form = root.querySelector('[data-mr-quote-form]');

		root.querySelectorAll('[data-mr-quote-close]').forEach(function (node) {
			node.addEventListener('click', function () {
				close();
			});
		});

		var dock = root.querySelector('[data-mr-quote-open]');
		if (dock) {
			dock.addEventListener('click', function () {
				open(true);
			});
		}

		if (form) {
			form.addEventListener('submit', submit);
		}

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && panel && !panel.hidden) {
				close();
			}
		});

		render();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}

	// Elementor editor re-renders widgets; re-bind their quote buttons.
	if (window.elementorFrontend && window.elementorFrontend.hooks) {
		window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function () {
			scan();
		});
	}
})();
