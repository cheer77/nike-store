import Disclosure from '../modules/disclosure';
import CountryPhoneSelect from '../modules/country-phone-select';
import FormValidation from '../modules/form-validation';
import PromoCode from '../modules/promo-code';

const initPaymentAccordion = () => {
	const paymentRoot = document.querySelector('[data-disclosure]');
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
	const phoneField = document.querySelector('.checkout-phone-field');
	if (!phoneField) return;

	const countryPhoneSelect = new CountryPhoneSelect(phoneField);
	countryPhoneSelect.init();
};

const initCheckoutValidation = () => {
	const form = document.querySelector('[data-checkout-form]');
	if (!form) return;

	const validation = new FormValidation(form);
	validation.init();
};

const initPromoCode = () => {
	const promoRoot = document.querySelector('[data-promo]');
	if (!promoRoot) return;

	const promoCode = new PromoCode(promoRoot);
	promoCode.init();
};

initPaymentAccordion();
initCountryPhoneSelect();
initCheckoutValidation();
initPromoCode();
