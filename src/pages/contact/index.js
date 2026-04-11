import '../../scss/style.scss';
import './contact.scss';
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
const main = createPageMain('contact-page');

main.innerHTML = /*html*/ `
	<section class="contact-hero cont">
		<p class="contact-hero__eyebrow">Contact</p>
		<h1 class="contact-hero__title">Let's build your next run</h1>
		<p class="contact-hero__lead">
			Reach out for support, wholesale requests, or partnership ideas. Our team usually answers within one business day.
		</p>
	</section>

	<section class="contact-layout cont" aria-label="Contact options">
		<article class="contact-card">
			<h2>Email</h2>
			<p>General support and order requests</p>
			<a href="mailto:hello@nike-store-demo.com">hello@nike-store-demo.com</a>
		</article>
		<article class="contact-card">
			<h2>Phone</h2>
			<p>Mon-Fri, 09:00-18:00</p>
			<a href="tel:+18005551234">+1 (800) 555-1234</a>
		</article>
		<article class="contact-card">
			<h2>Address</h2>
			<p>For visits by appointment</p>
			<address>1 Bowerman Drive, Beaverton, OR 97005, USA</address>
		</article>
	</section>

	<section class="contact-form-wrap cont" aria-label="Message form">
		<form class="contact-form" action="#" method="post">
			<div class="contact-form__grid">
				<label>
					<span>Name</span>
					<input type="text" name="name" placeholder="Your name" required />
				</label>
				<label>
					<span>Email</span>
					<input type="email" name="email" placeholder="you@example.com" required />
				</label>
			</div>
			<label>
				<span>Message</span>
				<textarea name="message" rows="6" placeholder="Tell us how we can help" required></textarea>
			</label>
			<button type="submit">Send message</button>
		</form>
	</section>
`;

const updateApp = () => {
	header.updateCount();
	cartDrawer.update();
};

cartDrawer = new CartDrawer(cart, updateApp);

app.prepend(header.render());
app.append(main);
app.append(cartDrawer.render());
app.append(footer.render());
