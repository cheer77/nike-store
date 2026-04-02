import '../../scss/product-temp.scss';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliders = document.querySelectorAll('.nike-product__slider');

sliders.forEach((slider) => {
	new Swiper(slider, {
		modules: [Navigation, Pagination, Autoplay, Keyboard, A11y],
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		loopAdditionalSlides: 1,
		centeredSlides: false,
		rewind: false,
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
		// autoplay: {
		// 	delay: 3600,
		// 	disableOnInteraction: false,
		// 	pauseOnMouseEnter: true,
		// },
		a11y: {
			enabled: true,
		},
	});
});
