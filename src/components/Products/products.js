import './products.scss';
import productsData from '../../data/productsData';
import { getProductUrl } from '../../router/routes';

const RECENTLY_VIEWED_KEY = 'internet-store-recently-viewed';
const RECENTLY_VIEWED_MAX = 6;

export default class Products {
	constructor(cart, onUpdate) {
		this.cart = cart;
		this.onUpdate = onUpdate;
		this.products = productsData;
	}

	render() {
		this.el = document.createElement('section');
		this.el.classList.add('store', 'cont');
		this.el.innerHTML = this.template();
		this.bindEvents();
		return this.el;
	}

	bindEvents() {
		this.el.addEventListener('click', (e) => {
			const btn = e.target.closest('.store__product-btn');
			if (btn) {
				this.handleAddToCart(btn);
				return;
			}

			const quickViewBtn = e.target.closest('.store__quick-btn');
			if (quickViewBtn) {
				this.handleQuickView(quickViewBtn);
				return;
			}

			const quickViewAdd = e.target.closest('[data-quick-view-add]');
			if (quickViewAdd) {
				this.handleQuickViewAdd(quickViewAdd);
				return;
			}

			const closeQuickView = e.target.closest('[data-quick-view-close]');
			if (closeQuickView) {
				this.closeQuickView();
				return;
			}

			if (e.target.classList.contains('store__quick-view-backdrop')) {
				this.closeQuickView();
				return;
			}

			const viewLink = e.target.closest('.store__product-view');
			if (viewLink) {
				const productId = Number(viewLink.dataset.productId);
				this.recordRecentlyViewed(productId);
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.closeQuickView();
			}
		});
	}

	update() {
		if (!this.el) return;

		const modal = this.el.querySelector('[data-quick-view-modal]');
		const quickViewAddButton = this.el.querySelector('[data-quick-view-add]');
		const isQuickViewOpen = Boolean(modal && !modal.hidden);
		const quickViewProductId = quickViewAddButton ? Number(quickViewAddButton.dataset.id) : null;

		this.el.innerHTML = this.template();

		if (!isQuickViewOpen || !Number.isFinite(quickViewProductId)) {
			document.body.classList.remove('quick-view-open');
			return;
		}

		this.handleQuickView({ dataset: { id: String(quickViewProductId) } });
	}

	handleAddToCart(btn) {
		const cardItem = btn.closest('.store__product');
		const stockItem = cardItem ? cardItem.querySelector('.store__product-stock') : null;

		const id = Number(btn.dataset.id);
		const product = this.products.find((product) => product.id === id);

		if (!product) return;

		const isAdded = this.cart.add(product);

		if (!isAdded) {
			if (cardItem) {
				this.disableProduct(btn, cardItem);
			}
			return;
		}

		const cartItem = this.cart.getItems().find((item) => item.id === product.id);
		const quantity = cartItem ? cartItem.quantity : 0;
		const stockLeft = product.stock - quantity;

		if (stockItem) {
			stockItem.textContent = `In stock: ${stockLeft}`;
		}

		if (stockLeft === 0 && cardItem) {
			this.disableProduct(btn, cardItem);
		}

		if (this.onUpdate) {
			this.onUpdate();
		}
	}

	disableProduct(btn, cardItem) {
		btn.disabled = true;
		btn.classList.add('store__product-btn--disabled');
		cardItem.classList.add('store__product--disabled');
	}

	updateStockUI(stockItem, product) {
		if (!stockItem) return;

		const cartItem = this.cart.getItems().find((item) => item.id === product.id);

		const quantity = cartItem ? cartItem.quantity : 0;
		const stockLeft = product.stock - quantity;

		stockItem.textContent = `Stock: ${stockLeft}`;
	}

	template() {
		return /*html*/ `
			<div class="store__products">
				${this.products
					.map((product) => {
						const cartItem = this.cart.getItems().find((item) => item.id === product.id);
						const quantityInCart = cartItem ? cartItem.quantity : 0;
						const stockLeft = product.stock - quantityInCart;

							return /*html*/ `
								<div class="store__product ${stockLeft === 0 ? 'store__product--disabled' : ''}">
									<img src="${product.img}" alt="${product.name}" class="store__product-img" />
									<div class="store__product-inner">
											<a href="${getProductUrl(product.id)}" class="store__product-view" data-product-id="${product.id}" aria-label="View ${product.name}">
											View product <span class="store__product-view-arrow" aria-hidden="true">→</span>
										</a>
										<h3 class="store__product-title">${product.name}</h3>
										<p class="store__product-price">$ ${product.price}</p>
										<p class="store__product-stock">In stock: ${stockLeft}</p>
									<button
										type="button"
										data-id="${product.id}"
										class="store__quick-btn"
									>
										Quick View
									</button>
									<button
										data-id="${product.id}"
										class="store__product-btn ${stockLeft === 0 ? 'store__product-btn--disabled' : ''}"
										${stockLeft === 0 ? 'disabled' : ''}
									>
										Add to Cart
									</button>
								</div>
							</div>
						`;
					})
					.join('')}
			</div>

			<nav class="store__pagination" aria-label="Products pagination">
				<button type="button" class="store__page-btn store__page-btn--nav" aria-label="Previous page">‹</button>
				<button type="button" class="store__page-btn store__page-btn--active" aria-current="page">1</button>
				<button type="button" class="store__page-btn">2</button>
				<button type="button" class="store__page-btn">3</button>
				<span class="store__page-dots" aria-hidden="true">…</span>
				<button type="button" class="store__page-btn">8</button>
				<button type="button" class="store__page-btn store__page-btn--nav" aria-label="Next page">›</button>
			</nav>

			<div class="store__quick-view" data-quick-view-modal hidden>
				<div class="store__quick-view-backdrop" data-quick-view-close></div>
				<div class="store__quick-view-dialog" role="dialog" aria-modal="true" aria-label="Quick product view">
					<button type="button" class="store__quick-view-close" data-quick-view-close aria-label="Close quick view">×</button>
					<img class="store__quick-view-img" src="" alt="" data-quick-view-img />
					<div class="store__quick-view-content">
						<h3 class="store__quick-view-title" data-quick-view-title></h3>
						<p class="store__quick-view-price" data-quick-view-price></p>
						<p class="store__quick-view-stock" data-quick-view-stock></p>
						<div class="store__quick-view-actions">
							<a href="#" class="store__quick-view-link" data-quick-view-link>Open product page</a>
							<button type="button" class="store__quick-view-add" data-quick-view-add>Add to cart</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	handleQuickView(button) {
		const productId = Number(button.dataset.id);
		const product = this.products.find((item) => item.id === productId);
		if (!product) return;

		this.recordRecentlyViewed(productId);

		const modal = this.el.querySelector('[data-quick-view-modal]');
		const img = this.el.querySelector('[data-quick-view-img]');
		const title = this.el.querySelector('[data-quick-view-title]');
		const price = this.el.querySelector('[data-quick-view-price]');
		const stock = this.el.querySelector('[data-quick-view-stock]');
		const link = this.el.querySelector('[data-quick-view-link]');
		const addButton = this.el.querySelector('[data-quick-view-add]');
		if (!modal || !img || !title || !price || !stock || !link || !addButton) return;

		const cartItem = this.cart.getItems().find((item) => item.id === product.id);
		const quantity = cartItem ? cartItem.quantity : 0;
		const stockLeft = product.stock - quantity;

		img.src = product.img;
		img.alt = product.name;
		title.textContent = product.name;
		price.textContent = `$ ${product.price}`;
		stock.textContent = `In stock: ${stockLeft}`;
		link.href = getProductUrl(product.id);
		addButton.dataset.id = String(product.id);
		addButton.disabled = stockLeft <= 0;
		addButton.textContent = stockLeft <= 0 ? 'Out of stock' : 'Add to cart';

		modal.hidden = false;
		document.body.classList.add('quick-view-open');
	}

	closeQuickView() {
		const modal = this.el?.querySelector('[data-quick-view-modal]');
		if (!modal || modal.hidden) return;
		modal.hidden = true;
		document.body.classList.remove('quick-view-open');
	}

	recordRecentlyViewed(productId) {
		if (!Number.isFinite(productId)) return;

		try {
			const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
			const parsed = raw ? JSON.parse(raw) : [];
			const list = Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : [];
			const next = [productId, ...list.filter((id) => id !== productId)].slice(0, RECENTLY_VIEWED_MAX);
			localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
			window.dispatchEvent(new CustomEvent('recently-viewed-updated'));
		} catch (error) {
			console.warn('Failed to save recently viewed products', error);
		}
	}

	handleQuickViewAdd(button) {
		const productId = Number(button.dataset.id);
		if (!Number.isFinite(productId)) return;

		const product = this.products.find((item) => item.id === productId);
		if (!product) return;

		const isAdded = this.cart.add(product);
		if (isAdded && this.onUpdate) {
			this.onUpdate();
			return;
		}

		this.handleQuickView({ dataset: { id: String(productId) } });
	}
}
