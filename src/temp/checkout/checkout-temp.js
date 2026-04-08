import Disclosure from '../modules/disclosure';
import CountryPhoneSelect from '../modules/country-phone-select';

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

initPaymentAccordion();
initCountryPhoneSelect();
