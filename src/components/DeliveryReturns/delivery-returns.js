import './delivery-returns.scss';

export default class DeliveryReturns {
	render() {
		const section = document.createElement('section');
		section.classList.add('delivery-returns', 'cont');
		section.innerHTML = this.template();
		return section;
	}

	template() {
		return /*html*/ `
			<div class="delivery-returns__grid">
				<article class="delivery-returns__card">
					<p class="delivery-returns__eyebrow">Delivery</p>
					<h2>Fast dispatch with clear tracking</h2>
					<ul>
						<li>Orders before 14:00 are shipped same day.</li>
						<li>Standard shipping: 2-4 business days.</li>
						<li>Free delivery for orders above $150.</li>
					</ul>
				</article>
				<article class="delivery-returns__card">
					<p class="delivery-returns__eyebrow">Returns</p>
					<h2>30-day no-stress returns</h2>
					<ul>
						<li>Try size at home and return if fit is wrong.</li>
						<li>Easy return request in a few clicks.</li>
						<li>Refund processed after quality check.</li>
					</ul>
				</article>
			</div>
		`;
	}
}
