import './home-faq.scss';

export default class HomeFaq {
	render() {
		this.el = document.createElement('section');
		this.el.classList.add('home-faq', 'cont');
		this.el.innerHTML = this.template();
		this.bindEvents();
		return this.el;
	}

	bindEvents() {
		this.el.addEventListener('click', (event) => {
			const trigger = event.target.closest('[data-faq-trigger]');
			if (!trigger) return;

			const item = trigger.closest('.home-faq__item');
			if (!item) return;

			const isOpen = item.classList.contains('is-open');
			this.el.querySelectorAll('.home-faq__item').forEach((faqItem) => faqItem.classList.remove('is-open'));

			if (!isOpen) item.classList.add('is-open');
		});
	}

	template() {
		return /*html*/ `
			<div class="home-faq__head">
				<p class="home-faq__eyebrow">FAQ</p>
				<h2 class="home-faq__title">Answers before you even ask</h2>
			</div>
			<div class="home-faq__list">
				<article class="home-faq__item is-open">
					<button class="home-faq__trigger" type="button" data-faq-trigger>How fast is delivery?</button>
					<div class="home-faq__panel">
						<p>Most orders ship in 1 business day. Standard delivery usually takes 2-4 business days.</p>
					</div>
				</article>
				<article class="home-faq__item">
					<button class="home-faq__trigger" type="button" data-faq-trigger>Can I return sneakers after trying them on?</button>
					<div class="home-faq__panel">
						<p>Yes. You can return unworn items within 30 days in original packaging.</p>
					</div>
				</article>
				<article class="home-faq__item">
					<button class="home-faq__trigger" type="button" data-faq-trigger>How do I pick the right size?</button>
					<div class="home-faq__panel">
						<p>Use the Size Guide above. It converts your foot length and fit preference into EU/US/UK sizes.</p>
					</div>
				</article>
				<article class="home-faq__item">
					<button class="home-faq__trigger" type="button" data-faq-trigger>Are products authentic?</button>
					<div class="home-faq__panel">
						<p>Yes, products come through verified channels and official suppliers only.</p>
					</div>
				</article>
			</div>
		`;
	}
}
