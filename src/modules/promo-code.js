const MOCK_PROMO_CODES = {
	SPRING20: { type: 'percent', value: 20 },
	NIKE10: { type: 'percent', value: 10 },
	WELCOME15: { type: 'percent', value: 15 },
};

export default class PromoCode {
	constructor(root) {
		this.root = root;
		this.input = root.querySelector('[data-promo-input]');
		this.applyBtn = root.querySelector('[data-promo-apply]');
		this.status = root.querySelector('[data-promo-status]');
		this.summaryRoot = root.closest('.checkout-summary');
		this.subtotalEl = this.summaryRoot?.querySelector('[data-summary-subtotal]');
		this.discountEl = this.summaryRoot?.querySelector('[data-summary-discount]');
		this.totalEl = this.summaryRoot?.querySelector('[data-summary-total]');
		this.baseSubtotal = this.parseCurrency(this.subtotalEl?.textContent) ?? 0;
		this.activePromoCode = null;

		this.onApply = this.onApply.bind(this);
		this.onInput = this.onInput.bind(this);
	}

	init() {
		if (!this.input || !this.applyBtn || !this.status) return;

		this.applyBtn.addEventListener('click', this.onApply);
		this.input.addEventListener('input', this.onInput);
	}

	destroy() {
		this.applyBtn?.removeEventListener('click', this.onApply);
		this.input?.removeEventListener('input', this.onInput);
	}

	onApply() {
		const raw = this.input.value.trim();
		const code = raw.toUpperCase();

		if (!code) {
			this.setState('error', 'Enter a promo code first.');
			return;
		}

		const promo = MOCK_PROMO_CODES[code];
		if (!promo) {
			this.setState('error', 'Promo code was not found.');
			return;
		}

		const discount = this.calculateDiscount(this.baseSubtotal, promo);
		const total = Math.max(this.baseSubtotal - discount, 0);

		this.input.value = code;
		this.activePromoCode = code;
		this.updateSummary(discount, total);
		this.setState('success', `Promo code applied. You saved ${this.formatCurrency(discount)}.`);
	}

	onInput() {
		this.clearState();
	}

	setState(state, message) {
		this.root.classList.remove('is-error', 'is-success');
		this.root.classList.add(state === 'error' ? 'is-error' : 'is-success');

		this.status.hidden = false;
		this.status.textContent = message;
		this.status.setAttribute('aria-live', 'polite');

		if (state === 'error') {
			this.input.setAttribute('aria-invalid', 'true');
			return;
		}

		this.input.removeAttribute('aria-invalid');
	}

	clearState() {
		this.root.classList.remove('is-error', 'is-success');
		this.status.hidden = true;
		this.status.textContent = '';
		this.input.removeAttribute('aria-invalid');
	}

	parseCurrency(rawValue) {
		if (!rawValue) return null;
		const normalized = rawValue.replace(/[^\d.-]/g, '');
		const parsed = Number.parseFloat(normalized);
		return Number.isFinite(parsed) ? parsed : null;
	}

	formatCurrency(value) {
		return `$${value.toFixed(2)}`;
	}

	calculateDiscount(subtotal, promo) {
		if (promo.type === 'fixed') {
			return Math.min(promo.value, subtotal);
		}

		if (promo.type === 'percent') {
			return Number(((subtotal * promo.value) / 100).toFixed(2));
		}

		return 0;
	}

	updateSummary(discount, total) {
		if (this.discountEl) {
			this.discountEl.textContent = discount > 0 ? `-${this.formatCurrency(discount)}` : this.formatCurrency(0);
		}

		if (this.totalEl) {
			this.totalEl.textContent = this.formatCurrency(total);
		}
	}

	setSubtotal(nextSubtotal) {
		this.baseSubtotal = Number.isFinite(nextSubtotal) ? nextSubtotal : 0;

		const activePromo = this.activePromoCode ? MOCK_PROMO_CODES[this.activePromoCode] : null;
		if (!activePromo) {
			this.updateSummary(0, this.baseSubtotal);
			return;
		}

		const discount = this.calculateDiscount(this.baseSubtotal, activePromo);
		const total = Math.max(this.baseSubtotal - discount, 0);
		this.updateSummary(discount, total);
	}
}
