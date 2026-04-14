import './recently-viewed.scss';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import productsData from '../../data/productsData';
import { getProductUrl } from '../../router/routes';

const STORAGE_KEY = 'internet-store-recently-viewed';
const MAX_ITEMS = 6;

const readRecentIds = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((id) => Number.isFinite(Number(id))).map(Number).slice(0, MAX_ITEMS);
	} catch {
		return [];
	}
};

export default class RecentlyViewed {
	constructor() {
		this.slider = null;
	}

	render() {
		this.el = document.createElement('section');
		this.el.classList.add('recently-viewed', 'cont');
		this.renderContent();
		this.bindEvents();
		return this.el;
	}

	bindEvents() {
		window.addEventListener('recently-viewed-updated', () => {
			this.renderContent();
		});
	}

	getProducts() {
		const ids = readRecentIds();
		return ids
			.map((id) => productsData.find((product) => product.id === id))
			.filter(Boolean)
			.slice(0, 4);
	}

	renderContent() {
		const products = this.getProducts();
		this.destroySlider();

		if (!products.length) {
			this.el.innerHTML = '';
			return;
		}

		this.el.innerHTML = /*html*/ `
			<div class="recently-viewed__head">
				<p class="recently-viewed__eyebrow">Recently Viewed</p>
				<h2 class="recently-viewed__title">Pick up where you left off</h2>
			</div>

			<div class="recently-viewed__controls" aria-hidden="true">
				<button type="button" class="recently-viewed__nav recently-viewed__nav--prev" data-recent-prev>‹</button>
				<button type="button" class="recently-viewed__nav recently-viewed__nav--next" data-recent-next>›</button>
			</div>

			<div class="recently-viewed__slider swiper">
				<div class="recently-viewed__track swiper-wrapper">
					${products
						.map(
							(product) => /*html*/ `
								<article class="recently-viewed__card swiper-slide">
									<img src="${product.img}" alt="${product.name}" class="recently-viewed__img" />
									<div class="recently-viewed__body">
										<h3>${product.name}</h3>
										<p>$ ${product.price}</p>
										<a href="${getProductUrl(product.id)}">View Product</a>
									</div>
								</article>
							`
						)
						.join('')}
				</div>
				<div class="recently-viewed__dots"></div>
			</div>
		`;

		this.initSlider();
	}

	initSlider() {
		const sliderEl = this.el.querySelector('.recently-viewed__slider');
		const prevEl = this.el.querySelector('[data-recent-prev]');
		const nextEl = this.el.querySelector('[data-recent-next]');
		const dotsEl = this.el.querySelector('.recently-viewed__dots');
		if (!sliderEl || !prevEl || !nextEl || !dotsEl) return;

		this.slider = new Swiper(sliderEl, {
			modules: [Navigation, Pagination, Autoplay, Keyboard, A11y],
			slidesPerView: 1.1,
			spaceBetween: 12,
			loop: false,
			watchOverflow: true,
			grabCursor: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			navigation: {
				prevEl,
				nextEl,
			},
			pagination: {
				el: dotsEl,
				clickable: true,
			},
			breakpoints: {
				640: {
					slidesPerView: 2.2,
				},
				1024: {
					slidesPerView: 3.2,
				},
				1280: {
					slidesPerView: 4,
				},
			},
			a11y: {
				enabled: true,
			},
		});
	}

	destroySlider() {
		if (!this.slider) return;
		this.slider.destroy(true, true);
		this.slider = null;
	}
}
