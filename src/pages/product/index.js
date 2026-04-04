import '../../scss/style.scss';
import './product.scss';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Cart from '../../components/Cart/cart';
import CartDrawer from '../../components/CartDrawer/cartDrawer';
import productsData from '../../data/productsData';
import { getHomeUrl, getProductIdFromLocation } from '../../router/routes';
import { createPageMain } from '../../utils/createPageMain';

const app = document.getElementById('app');
const cart = new Cart();
const productId = getProductIdFromLocation();
const product = productsData.find((item) => item.id === productId) || productsData[0];
const additionalGallery = Array.isArray(product.gallery) ? product.gallery : [];
const productGallery = [product.img, ...additionalGallery.filter((image) => image !== product.img)];

let cartDrawer;

const header = new Header(cart, () => {
	cartDrawer.open();
});
const footer = new Footer();

const content = createPageMain('product-page');
content.innerHTML = /*html*/ `
		<section class="product-page__hero cont">
		<div class="product-page__hero-inner">
			<p class="product-page__eyebrow">Nike Running</p>
			<h1 class="product-page__title">${product.name}</h1>
			<p class="product-page__subtitle">
				Iconic Tuned Air cushioning with a bold silhouette for everyday street performance.
			</p>

			<div class="product-page__price-row">
				<p class="product-page__price">$${Number(product.price).toFixed(2)}</p>
				<p class="product-page__tax">incl. VAT / free shipping over $150</p>
			</div>

			<div class="product-page__actions">
				<button class="product-page__btn product-page__btn--dark" type="button">Add to cart</button>
				<button class="product-page__btn product-page__btn--light" type="button">Add to favorites</button>
			</div>
		</div>

		<div class="product-page__visual">
			<div class="product-page__badge">new drop</div>
			<div class="product-page__slider swiper" aria-label="Product gallery">
				<div class="swiper-wrapper">
					${productGallery
						.map(
							(image, index) => /*html*/ `
						<div class="product-page__slide swiper-slide">
							<img src="${image}" alt="${product.name} view ${index + 1}" />
						</div>
					`
						)
						.join('')}
				</div>

				<button class="product-page__nav product-page__nav--prev" type="button" aria-label="Previous slide">←</button>
				<button class="product-page__nav product-page__nav--next" type="button" aria-label="Next slide">→</button>

				<div class="product-page__dots" aria-label="Slide navigation"></div>
			</div>
		</div>
	</section>

	<section class="product-page__details cont">
		<div class="product-page__sizes">
			<h2 class="product-page__section-title">Select Size (EU)</h2>
			<div class="product-page__size-grid">
				<button type="button" class="product-page__size">40</button>
				<button type="button" class="product-page__size">41</button>
				<button type="button" class="product-page__size product-page__size--active">42</button>
				<button type="button" class="product-page__size">43</button>
				<button type="button" class="product-page__size">44</button>
				<button type="button" class="product-page__size product-page__size--disabled" disabled>45</button>
			</div>
		</div>

		<div class="product-page__meta">
			<h2 class="product-page__section-title">Product Details</h2>
			<ul class="product-page__meta-list">
				<li>Tuned Air units for responsive cushioning.</li>
				<li>Breathable mesh upper with synthetic overlays.</li>
				<li>Rubber outsole with durable traction pattern.</li>
				<li>Color: Black / White / Silver</li>
				<li>Style: NIKE-AM-PLUS-001</li>
			</ul>
		</div>
	</section>

	<section class="product-page__story cont">
		<div class="product-page__story-content">
			<p class="product-page__eyebrow">Engineered for movement</p>
			<h2 class="product-page__section-title">Street DNA. Running tech.</h2>
			<p>
				Built for comfort and visual impact, the Air Max Plus blends heritage lines with modern cushioning for all-day wear.
			</p>
		</div>
		<div class="product-page__story-gallery">
			<img src="${productsData[1].img}" alt="${productsData[1].name}" />
			<img src="${productsData[2].img}" alt="${productsData[2].name}" />
		</div>
	</section>

	<section class="product-page__recommended cont">
		<div class="product-page__section-head">
			<h2 class="product-page__section-title">You May Also Like</h2>
			<a href="${getHomeUrl()}" class="product-page__link">Shop all</a>
		</div>

		<div class="product-page__cards">
			${productsData
				.filter((item) => item.id !== product.id)
				.slice(0, 4)
				.map(
					(item) => /*html*/ `
				<article class="product-page__card">
					<img src="${item.img}" alt="${item.name}" />
					<h3>${item.name}</h3>
					<p>$${Number(item.price).toFixed(2)}</p>
				</article>
			`
				)
				.join('')}
		</div>
	</section>
`;

const initSlider = () => {
	const slider = content.querySelector('.product-page__slider');
	if (!slider) return;

	new Swiper(slider, {
		modules: [Navigation, Pagination, Autoplay, Keyboard, A11y],
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		loopAdditionalSlides: 1,
		speed: 650,
		grabCursor: true,
		watchOverflow: true,
		observer: true,
		observeParents: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		navigation: {
			prevEl: slider.querySelector('.product-page__nav--prev'),
			nextEl: slider.querySelector('.product-page__nav--next'),
		},
		pagination: {
			el: slider.querySelector('.product-page__dots'),
			clickable: true,
		},
		autoplay: {
			delay: 3600,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		a11y: {
			enabled: true,
		},
	});
};

const updateBuyButtonState = () => {
	const buyBtn = content.querySelector('.product-page__btn--dark');
	if (!buyBtn) return;

	const cartItem = cart.getItems().find((item) => item.id === product.id);
	const quantity = cartItem ? cartItem.quantity : 0;
	const inStock = product.stock - quantity;

	buyBtn.disabled = inStock <= 0;
	buyBtn.textContent = inStock <= 0 ? 'Out of stock' : 'Add to cart';
	buyBtn.classList.toggle('product-page__btn--disabled', inStock <= 0);
};

const bindProductActions = () => {
	const buyBtn = content.querySelector('.product-page__btn--dark');
	if (!buyBtn) return;

	buyBtn.addEventListener('click', () => {
		const isAdded = cart.add(product);
		if (!isAdded) {
			updateBuyButtonState();
			return;
		}

		updateApp();
	});
};

const updateApp = () => {
	header.updateCount();
	cartDrawer.update();
	updateBuyButtonState();
};

document.body.classList.add('product-page-body');
cartDrawer = new CartDrawer(cart, updateApp);

app.prepend(header.render());
app.append(content);
app.append(cartDrawer.render());
app.append(footer.render());
initSlider();
bindProductActions();
updateApp();
