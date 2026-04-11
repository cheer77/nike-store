import '../../scss/style.scss';
import './about.scss';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Cart from '../../components/Cart/cart';
import CartDrawer from '../../components/CartDrawer/cartDrawer';
import { createPageMain } from '../../utils/createPageMain';

const app = document.getElementById('app');
const cart = new Cart();
let cartDrawer;

const header = new Header(cart, () => {
	cartDrawer.open();
});

const footer = new Footer();
const main = createPageMain('about-page');

main.innerHTML = /*html*/ `
	<section class="about-hero">
		<div class="about-hero__content cont">
			<p class="about-hero__eyebrow">About The Brand</p>
			<h1 class="about-hero__title">Nike: from a startup idea to a global sports icon</h1>
			<p class="about-hero__lead">
				Founded by coach Bill Bowerman and runner Phil Knight, Nike grew from a small running-shoe business into one of
				the most influential brands in sport and culture.
			</p>
			<ul class="about-hero__facts">
				<li><strong>1964:</strong> Blue Ribbon Sports was founded.</li>
				<li><strong>1971:</strong> the Swoosh was introduced and the Nike name was adopted.</li>
				<li><strong>1987:</strong> Air Max 1 launched visible Air to the world.</li>
				<li><strong>1988:</strong> “Just Do It” started as a global campaign.</li>
				<li><strong>Today:</strong> world headquarters in Beaverton, Oregon.</li>
			</ul>
		</div>
	</section>

	<section class="about-timeline cont" aria-label="Nike timeline">
		<div class="about-timeline__head">
			<p class="about-timeline__eyebrow">Milestones</p>
			<h2 class="about-timeline__title">Key moments in Nike history</h2>
		</div>
		<div class="about-timeline__grid">
			<article class="about-card">
				<p class="about-card__year">1964</p>
				<h3>Blue Ribbon Sports starts</h3>
				<p>
					Phil Knight and Bill Bowerman launch Blue Ribbon Sports, the company that would later become Nike.
				</p>
			</article>
			<article class="about-card">
				<p class="about-card__year">1971</p>
				<h3>The Swoosh is created</h3>
				<p>
					The Swoosh logo is designed for $35 by Portland State student Carolyn Davidson.
				</p>
			</article>
			<article class="about-card">
				<p class="about-card__year">1972</p>
				<h3>Moon Shoe era</h3>
				<p>
					Bill Bowerman's waffle-sole experiments lead to early Nike race shoes that became part of sneaker legend.
				</p>
			</article>
			<article class="about-card">
				<p class="about-card__year">Now</p>
				<h3>Global sports ecosystem</h3>
				<p>
					From performance footwear to culture and innovation, Nike operates globally with a headquarters campus in
					Beaverton, Oregon.
				</p>
			</article>
			<article class="about-card">
				<p class="about-card__year">1987</p>
				<h3>Air Max 1 breakthrough</h3>
				<p>
					Nike introduced the Air Max 1 and made visible Air cushioning one of the most recognizable design ideas in
					sneaker history.
				</p>
			</article>
			<article class="about-card">
				<p class="about-card__year">1988</p>
				<h3>“Just Do It” era</h3>
				<p>
					The “Just Do It” campaign helped Nike move from a product-focused company to a brand with a global cultural
					voice.
				</p>
			</article>
		</div>
	</section>

	<section class="about-gallery" aria-label="Nike archive gallery">
		<div class="about-gallery__inner cont">
			<div class="about-gallery__head">
				<p class="about-gallery__eyebrow">Then and now</p>
				<h2 class="about-gallery__title">Archive-to-modern visual story</h2>
			</div>

			<div class="about-gallery__controls" aria-hidden="true">
				<button type="button" class="about-gallery__btn about-gallery__btn--prev" data-gallery-prev aria-label="Previous slide">Prev</button>
				<button type="button" class="about-gallery__btn about-gallery__btn--next" data-gallery-next aria-label="Next slide">Next</button>
			</div>

			<div class="about-gallery__slider swiper" aria-label="Nike history gallery">
				<div class="about-gallery__track swiper-wrapper" data-gallery-track>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Knight_and_Bowerman.jpg" alt="Historic photo of Phil Knight and Bill Bowerman, 1958" loading="lazy" />
						<figcaption>
							1958: Phil Knight and Bill Bowerman in the University of Oregon era.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Bill_Bowerman.jpg" alt="Portrait of Bill Bowerman from 1958 university publication" loading="lazy" />
						<figcaption>
							Early foundation: Bill Bowerman, coach and co-founder.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/University_of_Oregon_track_and_field_meet%2C_1966._Dual_Meet_against_UCLA_%281397844479%29.jpg" alt="1966 University of Oregon track and field meet at Hayward Field" loading="lazy" />
						<figcaption>
							1966: Track culture at Oregon, where Nike's performance mindset was shaped.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Nike_%22Moon_Shoe%22.jpg" alt="Nike Moon Shoe displayed in a museum" loading="lazy" />
						<figcaption>
							1972 era: the Moon Shoe and Bowerman's waffle-sole legacy.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Nike_Air_Max_1.png" alt="Nike Air Max 1 sneaker in white and red colorway" loading="lazy" />
						<figcaption>
							1987: Air Max 1 helps define a new design language for running footwear.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Nike_Cortez.jpg" alt="Nike Cortez shoe in a modern retail display" loading="lazy" />
						<figcaption>
							Cortez legacy: one of Nike's earliest iconic models continues into modern retail.
						</figcaption>
					</figure>
					<figure class="about-slide swiper-slide">
						<img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Nikeworldheadquarters.jpg" alt="Nike world headquarters campus in Beaverton, Oregon" loading="lazy" />
						<figcaption>
							Modern chapter: Nike world headquarters in Beaverton.
						</figcaption>
					</figure>
				</div>
				<div class="about-gallery__dots" aria-label="Slide navigation"></div>
			</div>
		</div>
	</section>

	<section class="about-story cont" aria-label="Nike story details">
		<div class="about-story__grid">
			<article class="about-story__card">
				<h2>From Oregon Running Culture</h2>
				<p>
					Nike began as Blue Ribbon Sports in 1964, built around running performance and athlete feedback. That origin
					story still drives product development today.
				</p>
			</article>
			<article class="about-story__card">
				<h2>Design + Identity</h2>
				<p>
					In 1971, Nike introduced the Swoosh and started shaping a visual identity that would become one of the most
					recognized symbols in global sport.
				</p>
			</article>
			<article class="about-story__card">
				<h2>Innovation + Storytelling</h2>
				<p>
					The 1987 Air Max 1 and the 1988 “Just Do It” campaign connected product innovation with brand storytelling,
					pushing Nike into mainstream culture far beyond running.
				</p>
			</article>
		</div>
	</section>
`;

const initGallery = () => {
	const slider = main.querySelector('.about-gallery__slider');
	const prev = main.querySelector('[data-gallery-prev]');
	const next = main.querySelector('[data-gallery-next]');
	if (!slider || !prev || !next) return;

	new Swiper(slider, {
		modules: [Navigation, Pagination, Autoplay, Keyboard, A11y],
		slidesPerView: 1,
		spaceBetween: 12,
		loop: true,
		speed: 650,
		watchOverflow: true,
		observer: true,
		observeParents: true,
		grabCursor: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		navigation: {
			prevEl: prev,
			nextEl: next,
		},
		pagination: {
			el: slider.querySelector('.about-gallery__dots'),
			clickable: true,
		},
		autoplay: {
			delay: 3800,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		a11y: {
			enabled: true,
		},
		breakpoints: {
			640: {
				slidesPerView: 1.25,
			},
			992: {
				slidesPerView: 1.75,
			},
			1240: {
				slidesPerView: 2,
			},
		},
	});
};

const updateApp = () => {
	header.updateCount();
	cartDrawer.update();
};

cartDrawer = new CartDrawer(cart, updateApp);

app.prepend(header.render());
app.append(main);
app.append(cartDrawer.render());
app.append(footer.render());

initGallery();
