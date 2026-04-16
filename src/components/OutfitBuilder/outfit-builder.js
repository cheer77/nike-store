import './outfit-builder.scss';
import productsData from '../../data/productsData';
import { getProductUrl } from '../../router/routes';

const ADDONS = [
	{ id: 'socks', name: 'Performance Socks', price: 18.0 },
	{ id: 'hoodie', name: 'Tech Fleece Hoodie', price: 99.0 },
	{ id: 'cap', name: 'Club Cap', price: 28.0 },
];

export default class OutfitBuilder {
	constructor(cart, onUpdate) {
		this.cart = cart;
		this.onUpdate = onUpdate;
		this.products = productsData;
		this.selectedProductId = this.products[0]?.id ?? null;
		this.selectedAddons = new Set();
	}

	render() {
		this.el = document.createElement('section');
		this.el.classList.add('outfit-builder', 'cont');
		this.el.innerHTML = this.template();
		this.bindEvents();
		this.renderSelectedProduct();
		this.renderSummary();
		return this.el;
	}

	bindEvents() {
		this.productSelect = this.el.querySelector('[data-outfit-product]');
		this.previewImg = this.el.querySelector('[data-outfit-img]');
		this.previewTitle = this.el.querySelector('[data-outfit-title]');
		this.previewPrice = this.el.querySelector('[data-outfit-price]');
		this.previewLink = this.el.querySelector('[data-outfit-link]');
		this.summaryTotal = this.el.querySelector('[data-outfit-total]');
		this.summarySavings = this.el.querySelector('[data-outfit-savings]');
		this.summaryDetails = this.el.querySelector('[data-outfit-details]');
		this.status = this.el.querySelector('[data-outfit-status]');
		this.addSneakerBtn = this.el.querySelector('[data-outfit-add-sneaker]');

		this.productSelect?.addEventListener('change', () => {
			this.selectedProductId = Number(this.productSelect.value);
			this.renderSelectedProduct();
			this.renderSummary();
		});

		this.el.querySelectorAll('[data-outfit-addon]').forEach((checkbox) => {
			checkbox.addEventListener('change', () => {
				const addonId = checkbox.dataset.outfitAddon;
				if (!addonId) return;
				if (checkbox.checked) {
					this.selectedAddons.add(addonId);
				} else {
					this.selectedAddons.delete(addonId);
				}
				this.renderSummary();
			});
		});

		this.addSneakerBtn?.addEventListener('click', () => {
			const product = this.getSelectedProduct();
			if (!product) return;
			const added = this.cart.add(product);
			if (added) {
				if (this.status) this.status.textContent = `${product.name} added to cart.`;
				if (this.onUpdate) this.onUpdate();
				this.renderSelectedProduct();
			} else if (this.status) {
				this.status.textContent = `No more stock left for ${product.name}.`;
			}
		});
	}

	getSelectedProduct() {
		return this.products.find((item) => item.id === this.selectedProductId) || this.products[0] || null;
	}

	getSelectedAddons() {
		return ADDONS.filter((addon) => this.selectedAddons.has(addon.id));
	}

	renderSelectedProduct() {
		const product = this.getSelectedProduct();
		if (!product) return;

		const cartItem = this.cart.getItems().find((item) => item.id === product.id);
		const quantityInCart = cartItem ? cartItem.quantity : 0;
		const stockLeft = product.stock - quantityInCart;

		if (this.previewImg) {
			this.previewImg.src = product.img;
			this.previewImg.alt = product.name;
		}
		if (this.previewTitle) this.previewTitle.textContent = product.name;
		if (this.previewPrice) this.previewPrice.textContent = `$ ${product.price}`;
		if (this.previewLink) this.previewLink.href = getProductUrl(product.id);
		if (this.addSneakerBtn) {
			this.addSneakerBtn.disabled = stockLeft <= 0;
			this.addSneakerBtn.textContent = stockLeft <= 0 ? 'Out of stock' : 'Add Sneaker to Cart';
		}
	}

	renderSummary() {
		const product = this.getSelectedProduct();
		if (!product) return;

		const addons = this.getSelectedAddons();
		const addonsTotal = addons.reduce((sum, item) => sum + item.price, 0);
		const rawTotal = Number(product.price) + addonsTotal;
		const discount = addons.length >= 2 ? rawTotal * 0.07 : 0;
		const total = rawTotal - discount;

		if (this.summaryTotal) this.summaryTotal.textContent = `$ ${total.toFixed(2)}`;
		if (this.summarySavings) this.summarySavings.textContent = discount > 0 ? `$ ${discount.toFixed(2)}` : '$ 0.00';
		if (this.summaryDetails) {
			const addonNames = addons.length ? addons.map((item) => item.name).join(', ') : 'No extras selected';
			this.summaryDetails.textContent = addonNames;
		}
	}

	template() {
		return /*html*/ `
			<div class="outfit-builder__inner">
				<div class="outfit-builder__head">
					<p class="outfit-builder__eyebrow">Outfit Builder</p>
					<h2 class="outfit-builder__title">Build your full Nike look</h2>
				</div>

				<div class="outfit-builder__layout">
					<div class="outfit-builder__controls">
						<label class="outfit-builder__label" for="outfit-product">Choose sneaker</label>
						<select id="outfit-product" class="outfit-builder__select" data-outfit-product>
							${this.products
								.map(
									(product) =>
										`<option value="${product.id}" ${product.id === this.selectedProductId ? 'selected' : ''}>${product.name} - $ ${product.price}</option>`
								)
								.join('')}
						</select>

						<p class="outfit-builder__label">Pick extras</p>
						<div class="outfit-builder__addons">
							${ADDONS.map(
								(addon) => `
									<label class="outfit-builder__addon">
										<input type="checkbox" data-outfit-addon="${addon.id}" />
										<span>${addon.name}</span>
										<strong>$ ${addon.price.toFixed(2)}</strong>
									</label>
								`
							).join('')}
						</div>
					</div>

					<div class="outfit-builder__preview">
						<img src="" alt="" class="outfit-builder__img" data-outfit-img />
						<div class="outfit-builder__preview-body">
							<h3 data-outfit-title></h3>
							<p class="outfit-builder__sneaker-price" data-outfit-price></p>
							<a href="#" data-outfit-link>Open product page</a>
						</div>
					</div>

					<div class="outfit-builder__summary">
						<p class="outfit-builder__summary-title">Outfit Summary</p>
						<p class="outfit-builder__summary-total" data-outfit-total>$ 0.00</p>
						<p class="outfit-builder__summary-row">Bundle savings: <strong data-outfit-savings>$ 0.00</strong></p>
						<p class="outfit-builder__summary-row">Selected extras: <span data-outfit-details>No extras selected</span></p>
						<button type="button" class="outfit-builder__add-btn" data-outfit-add-sneaker>Add Sneaker to Cart</button>
						<p class="outfit-builder__status" data-outfit-status></p>
					</div>
				</div>
			</div>
		`;
	}
}
