import './banner.scss';
import mainBannerImage from '../../assets/banner/banner_main-page.webp';

export default class Banner {
	render() {
		const banner = document.createElement('section');
		banner.classList.add('banner');
		banner.innerHTML = this.template();
		return banner;
	}

	template() {
		return /*html*/ `
			<div class="banner__inner">
				<img
					class="banner__image"
					src="${mainBannerImage}"
					alt="Main store banner"
					loading="eager"
					decoding="async"
				/>
			</div>
		`;
	}
}
