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
import productsData from '../../data/productsData';
import { getHomeUrl, getProductIdFromLocation } from '../../router/routes';

const app = document.getElementById('app');
const cart = new Cart();
const productId = getProductIdFromLocation();
const product = productsData.find((item) => item.id === productId) || productsData[0];

const header = new Header(cart, null);
const footer = new Footer();

const content = document.createElement('main');
content.classList.add('nike-product');
content.innerHTML = /*html*/ `
		<section class="nike-product__hero cont">
		<div class="nike-product__hero-inner">
			<p class="nike-product__eyebrow">Nike Running</p>
			<h1 class="nike-product__title">${product.name}</h1>
			<p class="nike-product__subtitle">
				Iconic Tuned Air cushioning with a bold silhouette for everyday street performance.
			</p>

			<div class="nike-product__price-row">
				<p class="nike-product__price">$${Number(product.price).toFixed(2)}</p>
				<p class="nike-product__tax">incl. VAT / free shipping over $150</p>
			</div>

			<div class="nike-product__actions">
				<button class="nike-product__btn nike-product__btn--dark" type="button">Add to cart</button>
				<button class="nike-product__btn nike-product__btn--light" type="button">Add to favorites</button>
			</div>
		</div>

		<div class="nike-product__visual">
			<div class="nike-product__badge">new drop</div>
			<div class="nike-product__slider swiper" aria-label="Product gallery">
				<div class="swiper-wrapper">
					${Array.from({ length: 3 })
						.map(
							(_, index) => /*html*/ `
						<div class="nike-product__slide swiper-slide">
							<img src="${product.img}" alt="${product.name} view ${index + 1}" />
						</div>
					`
						)
						.join('')}
				</div>

				<button class="nike-product__nav nike-product__nav--prev" type="button" aria-label="Previous slide">←</button>
				<button class="nike-product__nav nike-product__nav--next" type="button" aria-label="Next slide">→</button>

				<div class="nike-product__dots" aria-label="Slide navigation"></div>
			</div>
		</div>
	</section>

		<section class="nike-product__details cont">
		<div class="nike-product__sizes">
			<h2 class="nike-product__section-title">Select Size (EU)</h2>
			<div class="nike-product__size-grid">
				<button type="button" class="nike-product__size">40</button>
				<button type="button" class="nike-product__size">41</button>
				<button type="button" class="nike-product__size nike-product__size--active">42</button>
				<button type="button" class="nike-product__size">43</button>
				<button type="button" class="nike-product__size">44</button>
				<button type="button" class="nike-product__size nike-product__size--disabled" disabled>45</button>
			</div>
		</div>

		<div class="nike-product__meta">
			<h2 class="nike-product__section-title">Product Details</h2>
			<ul class="nike-product__meta-list">
				<li>Tuned Air units for responsive cushioning.</li>
				<li>Breathable mesh upper with synthetic overlays.</li>
				<li>Rubber outsole with durable traction pattern.</li>
				<li>Color: Black / White / Silver</li>
				<li>Style: NIKE-AM-PLUS-001</li>
			</ul>
		</div>
	</section>

		<section class="nike-product__story cont">
		<div class="nike-product__story-content">
			<p class="nike-product__eyebrow">Engineered for movement</p>
			<h2 class="nike-product__section-title">Street DNA. Running tech.</h2>
			<p>
				Built for comfort and visual impact, the Air Max Plus blends heritage lines with modern cushioning for all-day wear.
			</p>
		</div>
		<div class="nike-product__story-gallery">
			<img src="${productsData[1].img}" alt="${productsData[1].name}" />
			<img src="${productsData[2].img}" alt="${productsData[2].name}" />
		</div>
	</section>

		<section class="nike-product__recommended cont">
		<div class="nike-product__section-head">
			<h2 class="nike-product__section-title">You May Also Like</h2>
			<a href="${getHomeUrl()}" class="nike-product__link">Shop all</a>
		</div>

		<div class="nike-product__cards">
			${productsData
				.filter((item) => item.id !== product.id)
				.slice(0, 4)
				.map(
					(item) => /*html*/ `
				<article class="nike-card">
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
	const slider = content.querySelector('.nike-product__slider');
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
			prevEl: slider.querySelector('.nike-product__nav--prev'),
			nextEl: slider.querySelector('.nike-product__nav--next'),
		},
		pagination: {
			el: slider.querySelector('.nike-product__dots'),
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

document.body.classList.add('nike-product-page');

app.prepend(header.render());
app.append(content);
app.append(footer.render());
initSlider();
