export default class Cart {
	constructor() {
		this.storageKey = 'internet-store-cart';
		this.cartItems = this.load();
	}

	load() {
		try {
			const raw = localStorage.getItem(this.storageKey);
			if (!raw) return [];

			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return [];

			return parsed.filter((item) => item && typeof item.id === 'number' && typeof item.quantity === 'number');
		} catch (error) {
			console.warn('Failed to load cart from localStorage', error);
			return [];
		}
	}

	save() {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
		} catch (error) {
			console.warn('Failed to save cart to localStorage', error);
		}
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

		this.save();
		return true;
	}

	increase(id) {
		const item = this.cartItems.find((item) => item.id === id);

		if (!item) return false;

		if (item.quantity >= item.stock) {
			return false;
		}

		item.quantity += 1;
		this.save();
		return true;
	}

	decrease(id) {
		const item = this.cartItems.find((item) => item.id === id);

		if (!item) return;

		if (item.quantity > 1) {
			item.quantity -= 1;
		} else {
			this.remove(id);
			return;
		}

		this.save();
	}

	remove(id) {
		this.cartItems = this.cartItems.filter((item) => item.id !== id);
		this.save();
	}

	clear() {
		this.cartItems = [];
		this.save();
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
