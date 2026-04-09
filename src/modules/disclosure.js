export default class Disclosure {
	constructor(root, options = {}) {
		this.root = root;
		this.options = {
			single: options.single ?? root.hasAttribute('data-disclosure-single'),
			allowCollapse: options.allowCollapse ?? false,
			closeOnOutside: options.closeOnOutside ?? false,
			closeOnEscape: options.closeOnEscape ?? true,
		};

		this.items = Array.from(root.querySelectorAll('[data-disclosure-item]')).map((item) => ({
			item,
			trigger: item.querySelector('[data-disclosure-trigger]'),
			panel: item.querySelector('[data-disclosure-panel]'),
		}));

		this.onRootClick = this.onRootClick.bind(this);
		this.onDocumentClick = this.onDocumentClick.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
	}

	init() {
		this.items.forEach(({ item, trigger, panel }, index) => {
			const isOpen = item.classList.contains('is-open');
			if (!trigger || !panel) return;

			if (!panel.id) {
				panel.id = `${this.root.id || 'disclosure'}-panel-${index + 1}`;
			}

			trigger.setAttribute('aria-controls', panel.id);
			trigger.setAttribute('aria-expanded', String(isOpen));
			panel.hidden = !isOpen;
		});

		this.root.addEventListener('click', this.onRootClick);

		if (this.options.closeOnOutside) {
			document.addEventListener('click', this.onDocumentClick);
		}

		if (this.options.closeOnEscape) {
			document.addEventListener('keydown', this.onKeydown);
		}
	}

	destroy() {
		this.root.removeEventListener('click', this.onRootClick);
		document.removeEventListener('click', this.onDocumentClick);
		document.removeEventListener('keydown', this.onKeydown);
	}

	onRootClick(event) {
		const trigger = event.target.closest('[data-disclosure-trigger]');
		if (!trigger || !this.root.contains(trigger)) return;

		const nextItem = trigger.closest('[data-disclosure-item]');
		const nextIndex = this.items.findIndex((item) => item.item === nextItem);
		if (nextIndex === -1) return;

		this.toggle(nextIndex);
	}

	onDocumentClick(event) {
		if (this.root.contains(event.target)) return;
		this.closeAll();
	}

	onKeydown(event) {
		if (event.key !== 'Escape') return;
		this.closeAll();
	}

	toggle(index) {
		const target = this.items[index];
		if (!target) return;

		const isOpen = target.item.classList.contains('is-open');
		if (isOpen && !this.options.allowCollapse) return;

		if (isOpen) {
			this.close(index);
			return;
		}

		if (this.options.single) {
			this.closeAll();
		}

		this.open(index);
	}

	open(index) {
		const target = this.items[index];
		if (!target || !target.trigger || !target.panel) return;

		target.item.classList.add('is-open');
		target.trigger.setAttribute('aria-expanded', 'true');
		target.panel.hidden = false;
	}

	close(index) {
		const target = this.items[index];
		if (!target || !target.trigger || !target.panel) return;

		target.item.classList.remove('is-open');
		target.trigger.setAttribute('aria-expanded', 'false');
		target.panel.hidden = true;
	}

	closeAll() {
		this.items.forEach((_, index) => this.close(index));
	}
}
