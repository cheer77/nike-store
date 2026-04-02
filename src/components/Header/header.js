import './header.scss';
import logoIcon from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart.svg';
import { getHomeUrl } from '../../router/routes';

export default class Header {
	constructor(cart, onCartClick) {
		this.cart = cart;
		this.onCartClick = onCartClick;
	}

	render() {
		this.el = document.createElement('header');
		this.el.classList.add('header');
		this.el.innerHTML = this.template();
		this.countEl = this.el.querySelector('.header__cart-count');
		this.bindEvents();
		this.updateCount();

		return this.el;
	}

	bindEvents() {
		const cartBtn = this.el.querySelector('.header__cart');

		cartBtn.addEventListener('click', () => {
			if (this.onCartClick) {
				this.onCartClick();
			}
		});
	}

	template() {
		const homeUrl = getHomeUrl();

		return /*html*/ `
	        <div class="header__inner cont">
	        <div class="header__logo"><img src="${logoIcon}" alt="logo" /></div>
	        <nav class="header__nav">
	          <ul class="header__list">
	            <li class="header__item"><a href="${homeUrl}" class="header__link">Home</a></li>
	            <li class="header__item"><a href="${homeUrl}" class="header__link">About</a></li>
	            <li class="header__item"><a href="${homeUrl}" class="header__link">Contact</a></li>
	          </ul>
	        </nav>
        <div class="header__cart">
          <img src="${cartIcon}" alt="cart" />
          <span class="header__cart-count">0</span>
        </div>
      </div>
    `;
	}

	updateCount() {
		const count = this.cart.getCount();
		this.countEl.innerText = count;
		if (count > 0) {
			this.countEl.classList.add('active');
		} else {
			this.countEl.classList.remove('active');
		}
	}
}
