import '../../scss/style.scss';
import './checkout.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Cart from '../../components/Cart/cart';
import CartDrawer from '../../components/CartDrawer/cartDrawer';
import Disclosure from '../../modules/disclosure';
import CountryPhoneSelect from '../../modules/country-phone-select';
import FormValidation from '../../modules/form-validation';
import PromoCode from '../../modules/promo-code';
import { createPageMain } from '../../utils/createPageMain';

const app = document.getElementById('app');
const cart = new Cart();
let cartDrawer;
let promoCode;

const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;

const renderSummaryItems = () => {
	const items = cart.getItems();
	const itemsRoot = document.querySelector('[data-summary-items]');
	if (!itemsRoot) return;

	if (items.length === 0) {
		itemsRoot.innerHTML = '<p class="checkout-summary__empty">Your cart is empty.</p>';
		return;
	}

	itemsRoot.innerHTML = items
		.map(
			(item) => /*html*/ `
				<div class="checkout-item">
					<div class="checkout-item__image"></div>
					<div class="checkout-item__content">
						<p>${item.name}</p>
						<span>Qty ${item.quantity}</span>
					</div>
					<strong>${formatCurrency(item.price * item.quantity)}</strong>
				</div>
			`
		)
		.join('');
};

const syncSummaryTotals = () => {
	const subtotal = Number(cart.getTotal());
	const subtotalEl = document.querySelector('[data-summary-subtotal]');
	const discountEl = document.querySelector('[data-summary-discount]');
	const totalEl = document.querySelector('[data-summary-total]');

	if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
	if (discountEl) discountEl.textContent = formatCurrency(0);
	if (totalEl) totalEl.textContent = formatCurrency(subtotal);

	promoCode?.setSubtotal(subtotal);
};

const content = createPageMain('checkout-main');
content.innerHTML = /*html*/ `
	<section class="checkout-hero cont">
		<p class="checkout-hero__eyebrow">Secure Checkout</p>
		<h1 class="checkout-hero__title">Complete your order</h1>
		<p class="checkout-hero__subtitle">Fast delivery, secure payment, and easy returns within 30 days.</p>
	</section>

	<section class="checkout-layout-section cont" aria-label="Checkout content">
		<form class="checkout-form" data-checkout-form novalidate>
			<div class="checkout-layout">
				<section class="checkout-form-col" aria-label="Checkout form">
					<article class="checkout-card">
						<div class="checkout-card__head">
							<span class="checkout-card__step">1</span>
							<h2>Contact</h2>
						</div>
						<div class="checkout-grid checkout-grid--2">
							<label class="checkout-field checkout-field--floating">
								<span>Email</span>
								<input type="email" name="email" required placeholder=" " />
							</label>
							<label class="checkout-field checkout-phone-field">
								<span>Phone number</span>
								<div class="checkout-phone-field__control">
									<button
										type="button"
										class="checkout-country-select__trigger"
										data-country-select-trigger
										aria-expanded="false"
										aria-controls="checkout-country-select-panel"
									>
										<span class="checkout-country-select__flag" data-country-select-flag>🇺🇸</span>
										<span class="checkout-country-select__code" data-country-select-code>+1</span>
									</button>
									<input type="hidden" name="phoneCountryCode" value="+1" data-country-select-hidden-code />
									<input
										type="tel"
										class="checkout-phone-field__input"
										name="phone"
										data-country-select-phone
										data-validator="phone"
										required
										placeholder="(555) 000-0000"
									/>
								</div>
								<div class="checkout-country-select" id="checkout-country-select-panel" data-country-select-panel hidden>
									<input
										type="text"
										class="checkout-country-select__search"
										data-country-select-search
										placeholder="Search country or code"
									/>
									<div class="checkout-country-select__list" data-country-select-list></div>
								</div>
							</label>
						</div>
					</article>

					<article class="checkout-card">
						<div class="checkout-card__head">
							<span class="checkout-card__step">2</span>
							<h2>Delivery</h2>
						</div>
						<div class="checkout-shipping-options">
							<label class="checkout-option checkout-option--active">
								<input type="radio" name="shipping" checked />
								<div>
									<p>Courier delivery</p>
									<span>1-2 business days</span>
								</div>
								<strong>Free</strong>
							</label>
							<label class="checkout-option">
								<input type="radio" name="shipping" />
								<div>
									<p>Store pickup</p>
									<span>Ready tomorrow</span>
								</div>
								<strong>Free</strong>
							</label>
						</div>
						<div class="checkout-grid checkout-grid--2">
							<label class="checkout-field checkout-field--floating">
								<span>First name</span>
								<input type="text" name="firstName" minlength="2" required placeholder=" " />
							</label>
							<label class="checkout-field checkout-field--floating">
								<span>Last name</span>
								<input type="text" name="lastName" minlength="2" required placeholder=" " />
							</label>
							<label class="checkout-field checkout-field--floating checkout-field--full">
								<span>Address</span>
								<input type="text" name="address" minlength="4" required placeholder=" " />
							</label>
							<label class="checkout-field checkout-field--floating">
								<span>City</span>
								<input type="text" name="city" minlength="2" required placeholder=" " />
							</label>
							<label class="checkout-field checkout-field--floating">
								<span>ZIP code</span>
								<input type="text" name="zipCode" minlength="3" required placeholder=" " />
							</label>
						</div>
					</article>

					<article class="checkout-card">
						<div class="checkout-card__head">
							<span class="checkout-card__step">3</span>
							<h2>Payment</h2>
						</div>
						<div class="checkout-payment" data-disclosure data-disclosure-type="accordion" data-disclosure-single>
							<article class="checkout-payment-option is-open" data-disclosure-item>
								<button
									type="button"
									class="checkout-payment-option__head"
									data-disclosure-trigger
									aria-expanded="true"
									aria-controls="payment-panel-card"
								>
									<span>Card</span>
									<strong>Visa / MasterCard</strong>
								</button>
								<div class="checkout-payment-option__panel" id="payment-panel-card" data-disclosure-panel>
									<div class="checkout-grid checkout-grid--2">
										<label class="checkout-field checkout-field--floating checkout-field--full">
											<span>Card number</span>
											<input type="text" name="cardNumber" minlength="12" required placeholder=" " />
										</label>
										<label class="checkout-field checkout-field--floating">
											<span>Expiry date</span>
											<input type="text" name="cardExpiry" pattern="(0[1-9]|1[0-2])\\s?/\\s?\\d{2}" required placeholder=" " />
										</label>
										<label class="checkout-field checkout-field--floating">
											<span>CVV</span>
											<input type="text" name="cardCvv" pattern="\\d{3,4}" required placeholder=" " />
										</label>
									</div>
									<label class="checkout-checkbox">
										<input type="checkbox" checked />
										<span>Save card for future purchases</span>
									</label>
								</div>
							</article>

							<article class="checkout-payment-option" data-disclosure-item>
								<button
									type="button"
									class="checkout-payment-option__head"
									data-disclosure-trigger
									aria-expanded="false"
									aria-controls="payment-panel-paypal"
								>
									<span>PayPal</span>
									<strong>Pay with your PayPal account</strong>
								</button>
								<div class="checkout-payment-option__panel" id="payment-panel-paypal" data-disclosure-panel hidden>
									<p class="checkout-payment-option__text">You will be redirected to PayPal after clicking Place Order.</p>
								</div>
							</article>

							<article class="checkout-payment-option" data-disclosure-item>
								<button
									type="button"
									class="checkout-payment-option__head"
									data-disclosure-trigger
									aria-expanded="false"
									aria-controls="payment-panel-apple"
								>
									<span>Apple Pay</span>
									<strong>Fast checkout on Apple devices</strong>
								</button>
								<div class="checkout-payment-option__panel" id="payment-panel-apple" data-disclosure-panel hidden>
									<p class="checkout-payment-option__text">Confirm payment quickly with Face ID or Touch ID.</p>
								</div>
							</article>

							<article class="checkout-payment-option" data-disclosure-item>
								<button
									type="button"
									class="checkout-payment-option__head"
									data-disclosure-trigger
									aria-expanded="false"
									aria-controls="payment-panel-google"
								>
									<span>Google Pay</span>
									<strong>Quick pay with saved cards</strong>
								</button>
								<div class="checkout-payment-option__panel" id="payment-panel-google" data-disclosure-panel hidden>
									<p class="checkout-payment-option__text">Pay in one tap with cards saved in your Google account.</p>
								</div>
							</article>
						</div>
					</article>
				</section>

				<aside class="checkout-summary-col" aria-label="Order summary">
					<article class="checkout-summary">
						<h2>Order Summary</h2>
						<div class="checkout-summary__items" data-summary-items></div>

						<label class="checkout-field checkout-field--promo" data-promo>
							<span>Promo code</span>
							<div class="checkout-promo">
								<input type="text" name="promoCode" data-promo-input placeholder="SPRING20" />
								<button type="button" data-promo-apply>Apply</button>
							</div>
							<p class="checkout-promo__status" data-promo-status hidden></p>
						</label>

						<div class="checkout-summary__totals">
							<div><span>Subtotal</span><strong data-summary-subtotal>$0.00</strong></div>
							<div><span>Shipping</span><strong>Free</strong></div>
							<div><span>Discount</span><strong data-summary-discount>$0.00</strong></div>
							<div class="checkout-summary__grand"><span>Total</span><strong data-summary-total>$0.00</strong></div>
						</div>

						<button type="submit" class="checkout-summary__cta">Place Order</button>
						<p class="checkout-summary__note">By placing an order, you agree to the Terms and Privacy Policy.</p>
					</article>
				</aside>
			</div>
		</form>
	</section>
`;

const header = new Header(cart, () => {
	cartDrawer.open();
});

const updateApp = () => {
	header.updateCount();
	cartDrawer.update();
	renderSummaryItems();
	syncSummaryTotals();
};

cartDrawer = new CartDrawer(cart, updateApp);
const footer = new Footer();

const initPaymentAccordion = () => {
	const paymentRoot = content.querySelector('[data-disclosure]');
	if (!paymentRoot) return;

	const paymentAccordion = new Disclosure(paymentRoot, {
		single: true,
		allowCollapse: false,
		closeOnOutside: false,
		closeOnEscape: false,
	});

	paymentAccordion.init();
};

const initCountryPhoneSelect = () => {
	const phoneField = content.querySelector('.checkout-phone-field');
	if (!phoneField) return;

	const countryPhoneSelect = new CountryPhoneSelect(phoneField);
	countryPhoneSelect.init();
};

const initCheckoutValidation = () => {
	const form = content.querySelector('[data-checkout-form]');
	if (!form) return;

	const validation = new FormValidation(form);
	validation.init();
};

const initPromoCode = () => {
	const promoRoot = content.querySelector('[data-promo]');
	if (!promoRoot) return;

	promoCode = new PromoCode(promoRoot);
	promoCode.init();
};

document.body.classList.add('checkout-page');
app.prepend(header.render());
app.append(content);
app.append(cartDrawer.render());
app.append(footer.render());

initPaymentAccordion();
initCountryPhoneSelect();
initPromoCode();
initCheckoutValidation();
updateApp();
