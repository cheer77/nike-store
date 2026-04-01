import './products.scss';
import productsData from '../../data/productsData';

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
			if (!btn) return;

			this.handleAddToCart(btn);
		});
	}

	update() {
		if (!this.el) return;

		this.el.innerHTML = this.template();
	}

	handleAddToCart(btn) {
		const cardItem = btn.closest('.store__product');
		const stockItem = cardItem.querySelector('.store__product-stock');

		const id = Number(btn.dataset.id);
		const product = this.products.find((product) => product.id === id);

		if (!product) return;

		const isAdded = this.cart.add(product);

		if (!isAdded) {
			this.disableProduct(btn, cardItem);
			return;
		}

		const cartItem = this.cart.getItems().find((item) => item.id === product.id);
		const quantity = cartItem ? cartItem.quantity : 0;
		const stockLeft = product.stock - quantity;

		if (stockItem) {
			stockItem.textContent = `In stock: ${stockLeft}`;
		}

		if (stockLeft === 0) {
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
		return `
		<div class="store__products">
			${this.products
				.map((product) => {
					const cartItem = this.cart.getItems().find((item) => item.id === product.id);
					const quantityInCart = cartItem ? cartItem.quantity : 0;
					const stockLeft = product.stock - quantityInCart;

					return `
						<div class="store__product ${stockLeft === 0 ? 'store__product--disabled' : ''}">
							<img src="${product.img}" alt="${product.name}" class="store__product-img" />
							<div class="store__product-inner">
								<h3 class="store__product-title">${product.name}</h3>
								<p class="store__product-price">$ ${product.price}</p>
								<p class="store__product-stock">In stock: ${stockLeft}</p>
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
	`;
	}
}
