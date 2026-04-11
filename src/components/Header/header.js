import './header.scss';
import logoIcon from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart.svg';
import { getAboutUrl, getContactUrl, getHomeUrl } from '../../router/routes';

export default class Header {
	constructor(cart, onCartClick) {
		this.cart = cart;
		this.onCartClick = onCartClick;
		this.isMenuOpen = false;
		this.isLangOpen = false;
		this.handleKeydown = this.onKeydown.bind(this);
		this.handleResize = this.onResize.bind(this);
		this.handleDocumentClick = this.onDocumentClick.bind(this);
	}

	render() {
		this.el = document.createElement('header');
		this.el.classList.add('header');
		this.el.innerHTML = this.template();
		this.countEl = this.el.querySelector('.header__cart-count');
		this.menuToggleEl = this.el.querySelector('.header__menu-toggle');
		this.overlayEl = this.el.querySelector('.header__mobile-overlay');
		this.langToggleEl = this.el.querySelector('.header__lang-toggle');
		this.langMenuEl = this.el.querySelector('.header__lang-menu');
		this.bindEvents();
		this.updateCount();

		return this.el;
	}

	bindEvents() {
		const cartBtn = this.el.querySelector('.header__cart');
		const closeMenuEls = this.el.querySelectorAll('[data-close-menu]');
		const navLinks = this.el.querySelectorAll('[data-nav-link]');

		cartBtn.addEventListener('click', () => {
			if (this.onCartClick) {
				this.onCartClick();
			}
		});

		this.menuToggleEl.addEventListener('click', () => {
			this.toggleMenu();
		});

		closeMenuEls.forEach((el) => {
			el.addEventListener('click', () => {
				this.closeMenu();
			});
		});

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				this.closeMenu();
			});
		});

		this.langToggleEl.addEventListener('click', () => {
			this.toggleLangMenu();
		});

		this.overlayEl.addEventListener('click', () => {
			this.closeMenu();
		});

		document.addEventListener('keydown', this.handleKeydown);
		document.addEventListener('click', this.handleDocumentClick);
		window.addEventListener('resize', this.handleResize);
	}

	onKeydown(event) {
		if (event.key === 'Escape') {
			this.closeLangMenu();
			this.closeMenu();
		}
	}

	onDocumentClick(event) {
		if (!this.isLangOpen) return;
		if (event.target.closest('.header__item--lang')) return;
		this.closeLangMenu();
	}

	onResize() {
		if (window.innerWidth > 768) {
			this.closeMenu();
		}
	}

	openMenu() {
		if (this.isMenuOpen) return;

		this.isMenuOpen = true;
		this.el.classList.add('is-menu-open');
		document.body.classList.add('menu-open');
		this.menuToggleEl.setAttribute('aria-expanded', 'true');
	}

	closeMenu() {
		if (!this.isMenuOpen) return;

		this.isMenuOpen = false;
		this.el.classList.remove('is-menu-open');
		document.body.classList.remove('menu-open');
		this.menuToggleEl.setAttribute('aria-expanded', 'false');
		this.closeLangMenu();
	}

	toggleMenu() {
		if (this.isMenuOpen) {
			this.closeMenu();
			return;
		}

		this.openMenu();
	}

	openLangMenu() {
		if (this.isLangOpen) return;
		this.isLangOpen = true;
		this.el.classList.add('is-lang-open');
		this.langToggleEl.setAttribute('aria-expanded', 'true');
	}

	closeLangMenu() {
		if (!this.isLangOpen) return;
		this.isLangOpen = false;
		this.el.classList.remove('is-lang-open');
		this.langToggleEl.setAttribute('aria-expanded', 'false');
	}

	toggleLangMenu() {
		if (this.isLangOpen) {
			this.closeLangMenu();
			return;
		}

		this.openLangMenu();
	}

	template() {
		const homeUrl = getHomeUrl();
		const aboutUrl = getAboutUrl();
		const contactUrl = getContactUrl();

		return /*html*/ `
	        <div class="header__inner cont">
	        <a href="${homeUrl}" class="header__logo" aria-label="Go to home">
				<img src="${logoIcon}" alt="logo" />
			</a>
	        <nav class="header__nav" id="header-main-nav">
			<div class="header__menu-head">
				<p class="header__menu-title">Menu</p>
				<button type="button" class="header__menu-close" data-close-menu aria-label="Close menu">+</button>
			</div>
	          <ul class="header__list">
	            <li class="header__item"><a href="${homeUrl}" class="header__link" data-nav-link>Home</a></li>
	            <li class="header__item"><a href="${aboutUrl}" class="header__link" data-nav-link>About</a></li>
	            <li class="header__item"><a href="${contactUrl}" class="header__link" data-nav-link>Contact</a></li>
				<li class="header__item header__item--lang">
					<button
						type="button"
						class="header__lang-toggle"
						aria-controls="header-lang-menu"
						aria-expanded="false"
					>
						Language
						<span class="header__lang-current">EN</span>
					</button>
					<div class="header__lang-menu" id="header-lang-menu">
						<button type="button" class="header__lang-option" disabled>English</button>
						<button type="button" class="header__lang-option" disabled>Deutsch</button>
						<button type="button" class="header__lang-option" disabled>Espanol</button>
						<p class="header__lang-note">Coming soon</p>
					</div>
				</li>
	          </ul>
	        </nav>
			<div class="header__actions">
				<button
					type="button"
					class="header__menu-toggle"
					aria-label="Open menu"
					aria-controls="header-main-nav"
					aria-expanded="false"
				>
					<span></span>
					<span></span>
				</button>
				<button type="button" class="header__cart" aria-label="Open cart">
					<img src="${cartIcon}" alt="cart" />
					<span class="header__cart-count">0</span>
				</button>
			</div>
      </div>
		<div class="header__mobile-overlay"></div>
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
