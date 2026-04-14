import './promo-block.scss';

const getPromoEnd = () => {
	const now = new Date();
	const end = new Date(now);
	end.setDate(now.getDate() + 4);
	end.setHours(23, 59, 59, 999);
	return end;
};

const format = (value) => String(value).padStart(2, '0');

export default class PromoBlock {
	constructor() {
		this.promoEnd = getPromoEnd();
		this.timer = null;
	}

	render() {
		this.el = document.createElement('section');
		this.el.classList.add('promo-block', 'cont');
		this.el.innerHTML = this.template();
		this.daysEl = this.el.querySelector('[data-promo-days]');
		this.hoursEl = this.el.querySelector('[data-promo-hours]');
		this.minutesEl = this.el.querySelector('[data-promo-minutes]');
		this.secondsEl = this.el.querySelector('[data-promo-seconds]');
		this.startTimer();
		return this.el;
	}

	startTimer() {
		this.updateTimer();
		this.timer = setInterval(() => this.updateTimer(), 1000);
	}

	updateTimer() {
		const diff = Math.max(0, this.promoEnd.getTime() - Date.now());
		const totalSeconds = Math.floor(diff / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (this.daysEl) this.daysEl.textContent = format(days);
		if (this.hoursEl) this.hoursEl.textContent = format(hours);
		if (this.minutesEl) this.minutesEl.textContent = format(minutes);
		if (this.secondsEl) this.secondsEl.textContent = format(seconds);
	}

	template() {
		return /*html*/ `
			<div class="promo-block__inner">
				<div class="promo-block__content">
					<p class="promo-block__eyebrow">Limited Offer</p>
					<h2 class="promo-block__title">SPRING RUN SALE - up to 25% off selected Air Max styles</h2>
					<p class="promo-block__lead">Offer ends soon. Timer is live for this release window.</p>
				</div>
				<div class="promo-block__timer" aria-label="Sale countdown">
					<div class="promo-block__unit"><strong data-promo-days>00</strong><span>Days</span></div>
					<div class="promo-block__unit"><strong data-promo-hours>00</strong><span>Hours</span></div>
					<div class="promo-block__unit"><strong data-promo-minutes>00</strong><span>Min</span></div>
					<div class="promo-block__unit"><strong data-promo-seconds>00</strong><span>Sec</span></div>
				</div>
			</div>
		`;
	}
}
