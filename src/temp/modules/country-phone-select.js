const COUNTRIES = [
	{ code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
	{ code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
	{ code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
	{ code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
	{ code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
	{ code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
	{ code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
	{ code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
	{ code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
	{ code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
	{ code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
	{ code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
	{ code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
	{ code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
	{ code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
	{ code: 'CZ', name: 'Czechia', dialCode: '+420', flag: '🇨🇿' },
	{ code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
	{ code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
	{ code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
	{ code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
	{ code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
	{ code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
	{ code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
	{ code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
	{ code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
	{ code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
	{ code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
	{ code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
	{ code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
	{ code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
	{ code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
	{ code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
	{ code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
	{ code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
	{ code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
];

export default class CountryPhoneSelect {
	constructor(fieldRoot) {
		this.fieldRoot = fieldRoot;
		this.checkoutCard = fieldRoot.closest('.checkout-card');
		this.trigger = fieldRoot.querySelector('[data-country-select-trigger]');
		this.panel = fieldRoot.querySelector('[data-country-select-panel]');
		this.search = fieldRoot.querySelector('[data-country-select-search]');
		this.list = fieldRoot.querySelector('[data-country-select-list]');
		this.flag = fieldRoot.querySelector('[data-country-select-flag]');
		this.code = fieldRoot.querySelector('[data-country-select-code]');
		this.hiddenCode = fieldRoot.querySelector('[data-country-select-hidden-code]');
		this.phoneInput = fieldRoot.querySelector('[data-country-select-phone]');
		this.items = COUNTRIES;
		this.activeItem = COUNTRIES[0];

		this.onTriggerClick = this.onTriggerClick.bind(this);
		this.onDocumentClick = this.onDocumentClick.bind(this);
		this.onSearchInput = this.onSearchInput.bind(this);
		this.onListClick = this.onListClick.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
		this.onPhoneInput = this.onPhoneInput.bind(this);
		this.onPhoneBlur = this.onPhoneBlur.bind(this);
		this.onPhoneClick = this.onPhoneClick.bind(this);
	}

	init() {
		if (!this.trigger || !this.panel || !this.search || !this.list) return;

		this.renderList(this.items);
		this.applySelection(this.activeItem);

		this.trigger.addEventListener('click', this.onTriggerClick);
		document.addEventListener('click', this.onDocumentClick);
		this.search.addEventListener('input', this.onSearchInput);
		this.list.addEventListener('click', this.onListClick);
		this.phoneInput?.addEventListener('input', this.onPhoneInput);
		this.phoneInput?.addEventListener('blur', this.onPhoneBlur);
		this.phoneInput?.addEventListener('click', this.onPhoneClick);
		document.addEventListener('keydown', this.onKeydown);
	}

	destroy() {
		this.trigger?.removeEventListener('click', this.onTriggerClick);
		document.removeEventListener('click', this.onDocumentClick);
		this.search?.removeEventListener('input', this.onSearchInput);
		this.list?.removeEventListener('click', this.onListClick);
		this.phoneInput?.removeEventListener('input', this.onPhoneInput);
		this.phoneInput?.removeEventListener('blur', this.onPhoneBlur);
		this.phoneInput?.removeEventListener('click', this.onPhoneClick);
		document.removeEventListener('keydown', this.onKeydown);
	}

	onTriggerClick(event) {
		event.preventDefault();
		const isOpen = this.panel.hidden === false;
		if (isOpen) {
			this.close();
			return;
		}

		this.open();
	}

	onDocumentClick(event) {
		if (this.fieldRoot.contains(event.target)) return;
		this.close();
	}

	onSearchInput(event) {
		const query = event.target.value.trim().toLowerCase();
		if (!query) {
			this.renderList(this.items);
			return;
		}

		const filtered = this.items.filter((country) => {
			return (
				country.name.toLowerCase().includes(query) ||
				country.dialCode.includes(query) ||
				country.code.toLowerCase().includes(query)
			);
		});

		this.renderList(filtered);
	}

	onListClick(event) {
		const btn = event.target.closest('[data-country-option]');
		if (!btn) return;

		const selectedCode = btn.dataset.countryCode;
		const selected = this.items.find((item) => item.code === selectedCode);
		if (!selected) return;

		this.applySelection(selected);
		this.close();
	}

	onKeydown(event) {
		if (event.key !== 'Escape') return;
		this.close();
	}

	onPhoneInput() {
		this.validatePhone();
	}

	onPhoneBlur() {
		this.validatePhone();
	}

	onPhoneClick() {
		if (!this.panel.hidden) {
			this.close();
		}
	}

	open() {
		this.panel.hidden = false;
		this.trigger.setAttribute('aria-expanded', 'true');
		this.fieldRoot.classList.add('is-open');
		this.checkoutCard?.classList.add('is-phone-select-open');
		this.search.focus();
	}

	close() {
		this.panel.hidden = true;
		this.trigger.setAttribute('aria-expanded', 'false');
		this.fieldRoot.classList.remove('is-open');
		this.checkoutCard?.classList.remove('is-phone-select-open');
		this.search.value = '';
		this.renderList(this.items);
	}

	applySelection(country) {
		this.activeItem = country;
		this.flag.textContent = country.flag;
		this.code.textContent = country.dialCode;

		if (this.hiddenCode) {
			this.hiddenCode.value = country.dialCode;
		}

		if (this.phoneInput) {
			const prevValue = this.phoneInput.value.trim();
			if (!prevValue) {
				this.phoneInput.placeholder = `${country.dialCode} 000 000 000`;
			}

			this.validatePhone();
		}
	}

	validatePhone() {
		if (!this.phoneInput) return true;

		const raw = this.phoneInput.value.trim();
		if (!raw) {
			this.phoneInput.setCustomValidity('');
			return true;
		}

		const digits = raw.replace(/\D/g, '');
		const isLengthValid = digits.length >= 6 && digits.length <= 14;

		if (!isLengthValid) {
			this.phoneInput.setCustomValidity(
				`Phone number for ${this.activeItem.name} should contain 6-14 digits.`
			);
			return false;
		}

		this.phoneInput.setCustomValidity('');
		return true;
	}

	renderList(countries) {
		if (countries.length === 0) {
			this.list.innerHTML = '<p class="checkout-country-select__empty">No countries found</p>';
			return;
		}

		this.list.innerHTML = countries
			.map(
				(country) => `
					<button type="button" class="checkout-country-select__item" data-country-option data-country-code="${country.code}">
						<strong>${country.flag} ${country.name}</strong>
						<span>${country.code}</span>
						<span>${country.dialCode}</span>
					</button>
				`
			)
			.join('');
	}
}
