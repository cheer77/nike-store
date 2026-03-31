export default class Cart {
	constructor() {
		this.cartItems = [];
	}

	add(product) {
		const existingProduct = this.cartItems.find((item) => item.id === product.id);

		if (existingProduct) {
			if (existingProduct.quantity >= product.stock) {
				return false;
			}

			existingProduct.quantity += 1;
		} else {
			this.cartItems.push({
				...product,
				quantity: 1,
			});
		}

		return true;
	}

	increase(id) {
		const item = this.cartItems.find((item) => item.id === id);

		if (!item) return false;

		if (item.quantity >= item.stock) {
			return false;
		}

		item.quantity += 1;
		return true;
	}

	decrease(id) {
		const item = this.cartItems.find((item) => item.id === id);

		if (!item) return;

		if (item.quantity > 1) {
			item.quantity -= 1;
		} else {
			this.remove(id);
		}
	}

	remove(id) {
		this.cartItems = this.cartItems.filter((item) => item.id !== id);
	}

	getItems() {
		return this.cartItems;
	}

	getCount() {
		return this.cartItems.reduce((total, item) => total + item.quantity, 0);
	}

	getTotal() {
		return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
	}
}
