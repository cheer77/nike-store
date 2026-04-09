const DEFAULT_MESSAGES = {
	valueMissing: 'This field is required.',
	typeMismatch: 'Please enter a valid value.',
	patternMismatch: 'Please follow the required format.',
	tooShort: 'Value is too short.',
};

const FIELD_MESSAGES = {
	email: {
		valueMissing: 'Email is required.',
		typeMismatch: 'Enter a valid email address.',
	},
	firstName: {
		valueMissing: 'First name is required.',
		tooShort: 'First name must contain at least 2 characters.',
	},
	lastName: {
		valueMissing: 'Last name is required.',
		tooShort: 'Last name must contain at least 2 characters.',
	},
	address: {
		valueMissing: 'Address is required.',
		tooShort: 'Address must contain at least 4 characters.',
	},
	city: {
		valueMissing: 'City is required.',
		tooShort: 'City must contain at least 2 characters.',
	},
	zipCode: {
		valueMissing: 'ZIP code is required.',
		tooShort: 'ZIP code is too short.',
	},
	cardNumber: {
		valueMissing: 'Card number is required.',
		tooShort: 'Card number is too short.',
	},
	cardExpiry: {
		valueMissing: 'Expiry date is required.',
		patternMismatch: 'Use MM/YY format.',
	},
	cardCvv: {
		valueMissing: 'CVV is required.',
		patternMismatch: 'CVV must contain 3 or 4 digits.',
	},
	phone: {
		valueMissing: 'Phone number is required.',
	},
};

const getValidationMessage = (input) => {
	const byField = FIELD_MESSAGES[input.name] || {};
	const validity = input.validity;

	if (validity.valueMissing) return byField.valueMissing || DEFAULT_MESSAGES.valueMissing;
	if (validity.typeMismatch) return byField.typeMismatch || DEFAULT_MESSAGES.typeMismatch;
	if (validity.patternMismatch) return byField.patternMismatch || DEFAULT_MESSAGES.patternMismatch;
	if (validity.tooShort) return byField.tooShort || DEFAULT_MESSAGES.tooShort;

	return 'Invalid value.';
};

export default class FormValidation {
	constructor(form, options = {}) {
		this.form = form;
		this.options = options;
		this.inputs = Array.from(form.querySelectorAll('input, textarea, select'));
		this.isSubmitAttempted = false;

		this.onSubmit = this.onSubmit.bind(this);
		this.onFieldInput = this.onFieldInput.bind(this);
		this.onFieldBlur = this.onFieldBlur.bind(this);
	}

	init() {
		this.form.addEventListener('submit', this.onSubmit);

		this.inputs.forEach((input) => {
			if (input.type === 'hidden') return;
			input.addEventListener('input', this.onFieldInput);
			input.addEventListener('blur', this.onFieldBlur);
		});
	}

	destroy() {
		this.form.removeEventListener('submit', this.onSubmit);

		this.inputs.forEach((input) => {
			if (input.type === 'hidden') return;
			input.removeEventListener('input', this.onFieldInput);
			input.removeEventListener('blur', this.onFieldBlur);
		});
	}

	onSubmit(event) {
		this.isSubmitAttempted = true;
		let hasErrors = false;

		this.inputs.forEach((input) => {
			if (input.type === 'hidden' || this.isInputDisabledByHiddenPanel(input)) return;
			const isValid = this.validateInput(input);
			if (!isValid) {
				hasErrors = true;
			}
		});

		if (hasErrors) {
			event.preventDefault();
			const firstError = this.form.querySelector('.checkout-field.is-error input');
			firstError?.focus();
			return;
		}

		event.preventDefault();
		if (typeof this.options.onValidSubmit === 'function') {
			this.options.onValidSubmit(this.form);
		}
	}

	onFieldInput(event) {
		if (!this.isSubmitAttempted) return;
		const input = event.target;
		if (this.isInputDisabledByHiddenPanel(input)) return;

		if (input.closest('.checkout-field')?.classList.contains('is-error')) {
			this.validateInput(input);
		}
	}

	onFieldBlur(event) {
		if (!this.isSubmitAttempted) return;
		const input = event.target;
		if (this.isInputDisabledByHiddenPanel(input)) return;
		this.validateInput(input);
	}

	isInputDisabledByHiddenPanel(input) {
		return Boolean(input.closest('[hidden]'));
	}

	validateInput(input) {
		const field = input.closest('.checkout-field');
		if (!field) return true;

		const isValid = input.checkValidity();
		if (isValid) {
			this.clearFieldError(field);
			return true;
		}

		this.setFieldError(field, getValidationMessage(input));
		return false;
	}

	setFieldError(field, message) {
		field.classList.add('is-error');
		let errorEl = field.querySelector('.checkout-field__error');

		if (!errorEl) {
			errorEl = document.createElement('p');
			errorEl.className = 'checkout-field__error';
			field.append(errorEl);
		}

		errorEl.textContent = message;
	}

	clearFieldError(field) {
		field.classList.remove('is-error');
		const errorEl = field.querySelector('.checkout-field__error');
		if (errorEl) {
			errorEl.remove();
		}
	}
}
