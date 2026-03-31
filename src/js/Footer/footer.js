import './footer.scss';

export default class Footer {
	render() {
		const footer = document.createElement('footer');
		footer.classList.add('footer');
		footer.innerHTML = this.template();
		return footer;
	}

	template() {
		return `
				<div class="footer__inner cont">
					<div class="footer__logo">
						<img src="./src/assets/icons/logo.svg" alt="logo" />
					</div>
					<nav class="footer__nav">
						<ul class="footer__list">
							<li class="footer__item"><a href="/" class="footer__link">Home</a></li>
							<li class="footer__item"><a href="/" class="footer__link">About</a></li>
							<li class="footer__item"><a href="/" class="footer__link">Contact</a></li>
						</ul>
					</nav>
				</div>
    `;
	}
}
