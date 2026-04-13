import './why-us.scss';

export default class WhyUs {
	render() {
		const section = document.createElement('section');
		section.classList.add('why-us', 'cont');
		section.innerHTML = this.template();
		return section;
	}

	template() {
		return /*html*/ `
			<div class="why-us__head">
				<p class="why-us__eyebrow">Why Us</p>
				<h2 class="why-us__title">Built for confidence, not just checkout</h2>
			</div>
			<div class="why-us__grid">
				<article class="why-us__card">
					<h3>Original Products</h3>
					<p>Every pair comes from official retail channels and verified supply partners.</p>
				</article>
				<article class="why-us__card">
					<h3>Fast Delivery</h3>
					<p>Priority dispatch with tracking updates from checkout to your doorstep.</p>
				</article>
				<article class="why-us__card">
					<h3>Easy Returns</h3>
					<p>Simple return flow within 30 days if sizing or fit is not ideal.</p>
				</article>
				<article class="why-us__card">
					<h3>Secure Payments</h3>
					<p>Encrypted checkout with trusted providers and fraud protection layers.</p>
				</article>
			</div>
		`;
	}
}
