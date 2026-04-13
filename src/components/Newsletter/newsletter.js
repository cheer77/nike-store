import './newsletter.scss';

export default class Newsletter {
	render() {
		this.el = document.createElement('section');
		this.el.classList.add('newsletter', 'cont');
		this.el.innerHTML = this.template();
		this.bindEvents();
		return this.el;
	}

	bindEvents() {
		const form = this.el.querySelector('[data-newsletter-form]');
		const status = this.el.querySelector('[data-newsletter-status]');
		if (!form || !status) return;

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const emailInput = form.querySelector('input[type="email"]');
			const email = emailInput?.value?.trim();
			if (!email) return;

			status.textContent = 'Thanks! You are subscribed to drop alerts.';
			form.reset();
		});
	}

	template() {
		return /*html*/ `
			<div class="newsletter__inner">
				<div class="newsletter__content">
					<p class="newsletter__eyebrow">Newsletter</p>
					<h2 class="newsletter__title">Get early access to new drops</h2>
					<p class="newsletter__lead">Weekly updates on launches, restocks, and members-only discounts.</p>
				</div>
				<form class="newsletter__form" data-newsletter-form>
					<label for="newsletter-email" class="sr-only">Email</label>
					<input id="newsletter-email" type="email" placeholder="you@email.com" required />
					<button type="submit">Subscribe</button>
				</form>
				<p class="newsletter__status" data-newsletter-status></p>
			</div>
		`;
	}
}
