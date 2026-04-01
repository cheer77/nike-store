import './cart-drawer.scss';

export default class CartDrawer {
	constructor(cart, onUpdate) {
		this.cart = cart;
		this.onUpdate = onUpdate;
		this.isOpen = false;
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		this.el = document.createElement('aside');
		this.el.classList.add('cart-drawer');
		this.el.innerHTML = this.template();
		this.bindEvents();
		return this.el;
	}

	template() {
		const items = this.cart.getItems();

		return `
			<div class="cart-drawer__overlay"></div>

			<div class="cart-drawer__panel">
				<button class="cart-drawer__close">×</button>
				<h2 class="cart-drawer__title">Cart</h2>

				<div class="cart-drawer__body">
					${
						items.length === 0
							? `<p class="cart-drawer__empty">Your cart is empty</p>`
							: items
									.map(
										(item) => `
											<div class="cart-item" data-id="${item.id}">
												<img src="${item.img}" alt="${item.name}" class="cart-item__img" />
												<div class="cart-item__content">
													<h3 class="cart-item__title">${item.name}</h3>
													<p class="cart-item__price">$${item.price}</p>

													<div class="cart-item__controls">
														<button class="cart-item__decrease">-</button>
														<span class="cart-item__qty">${item.quantity}</span>
														<button class="cart-item__increase">+</button>
														<button class="cart-item__remove">Remove</button>
													</div>
												</div>
											</div>
										`
									)
									.join('')
					}
				</div>

				<div class="cart-drawer__footer">
					<p class="cart-drawer__total">Total: $${this.cart.getTotal()}</p>
					<button class="cart-drawer__checkout">Checkout</button>
				</div>
			</div>
		`;
	}

	open() {
		this.isOpen = true;
		this.el.classList.add('is-open');
	}

	close() {
		this.isOpen = false;
		this.el.classList.remove('is-open');
	}

	update() {
		if (!this.el) return;

		this.el.innerHTML = this.template();

		if (this.isOpen) {
			this.el.classList.add('is-open');
		}
	}

	bindEvents() {
		this.el.addEventListener('click', this.handleClick);
	}

	handleClick(e) {
		const closeBtn = e.target.closest('.cart-drawer__close');
		const overlay = e.target.closest('.cart-drawer__overlay');
		const increaseBtn = e.target.closest('.cart-item__increase');
		const decreaseBtn = e.target.closest('.cart-item__decrease');
		const removeBtn = e.target.closest('.cart-item__remove');

		if (closeBtn || overlay) {
			this.close();
			return;
		}

		const cartItem = e.target.closest('.cart-item');
		const id = cartItem ? Number(cartItem.dataset.id) : null;

		if (increaseBtn && id) {
			const isIncreased = this.cart.increase(id);

			if (!isIncreased) {
				console.log('No more stock');
			}

			if (this.onUpdate) {
				this.onUpdate();
			}

			return;
		}

		if (decreaseBtn && id) {
			this.cart.decrease(id);

			if (this.onUpdate) {
				this.onUpdate();
			}

			return;
		}

		if (removeBtn && id) {
			this.cart.remove(id);

			if (this.onUpdate) {
				this.onUpdate();
			}
		}
	}
}
