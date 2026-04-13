import './banner.scss';
import mainBannerImage from '../../assets/banner/banner_main-page.webp';
import { getCheckoutUrl, getProductUrl } from '../../router/routes';

export default class Banner {
	render() {
		const banner = document.createElement('section');
		banner.classList.add('banner');
		banner.innerHTML = this.template();
		return banner;
	}

	template() {
		const featuredProductUrl = getProductUrl(1);
		const checkoutUrl = getCheckoutUrl();

		return /*html*/ `
			<div class="banner__inner">
				<img
					class="banner__image"
					src="${mainBannerImage}"
					alt="Main store banner"
					loading="eager"
					decoding="async"
				/>
				<div class="banner__overlay"></div>
				<div class="banner__content cont">
					<p class="banner__eyebrow">New season</p>
					<h1 class="banner__title">Run the city in your next Nike pair</h1>
					<p class="banner__lead">
						Discover street-ready silhouettes, performance cushioning, and fresh drops selected for this month.
					</p>
					<div class="banner__actions">
						<a href="${featuredProductUrl}" class="banner__btn banner__btn--solid">Shop Featured</a>
					</div>
				</div>
			</div>
		`;
	}
}
