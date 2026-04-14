import './size-guide.scss';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const lengthToEu = (lengthCm) => {
	const eu = 1.5 * (lengthCm + 1.5);
	return clamp(eu, 36, 48);
};

const roundToHalf = (value) => Math.round(value * 2) / 2;

const fitDelta = {
	snug: -0.5,
	regular: 0,
	roomy: 0.5,
};

const convertEu = (euSize) => {
	const us = euSize - 33;
	const uk = euSize - 34;
	return {
		eu: euSize,
		us,
		uk,
	};
};

export default class SizeGuide {
	render() {
		this.el = document.createElement('section');
		this.el.classList.add('size-guide', 'cont');
		this.el.innerHTML = this.template();
		this.bindEvents();
		this.updateResult();
		return this.el;
	}

	bindEvents() {
		this.lengthRange = this.el.querySelector('[data-size-length-range]');
		this.lengthInput = this.el.querySelector('[data-size-length-input]');
		this.fitButtons = this.el.querySelectorAll('[data-size-fit]');
		this.lengthOutput = this.el.querySelector('[data-size-length-output]');
		this.recommendedOutput = this.el.querySelector('[data-size-recommended]');
		this.euOutput = this.el.querySelector('[data-size-eu]');
		this.usOutput = this.el.querySelector('[data-size-us]');
		this.ukOutput = this.el.querySelector('[data-size-uk]');
		this.tipOutput = this.el.querySelector('[data-size-tip]');

		const syncFromRange = () => {
			this.lengthInput.value = this.lengthRange.value;
			this.updateResult();
		};

		const syncFromInput = () => {
			const safeValue = clamp(Number(this.lengthInput.value || 0), 22, 32);
			this.lengthInput.value = String(safeValue);
			this.lengthRange.value = String(safeValue);
			this.updateResult();
		};

		this.lengthRange.addEventListener('input', syncFromRange);
		this.lengthInput.addEventListener('input', syncFromInput);

		this.fitButtons.forEach((btn) => {
			btn.addEventListener('click', () => {
				this.fitButtons.forEach((item) => item.classList.remove('is-active'));
				btn.classList.add('is-active');
				this.updateResult();
			});
		});
	}

	updateResult() {
		const lengthCm = Number(this.lengthRange?.value || 26.5);
		const min = Number(this.lengthRange?.min || 22);
		const max = Number(this.lengthRange?.max || 32);
		const progress = ((lengthCm - min) / (max - min)) * 100;

		if (this.lengthRange) {
			this.lengthRange.style.setProperty('--size-fill', `${progress}%`);
		}

		const activeFitButton = this.el.querySelector('[data-size-fit].is-active');
		const fit = activeFitButton ? activeFitButton.dataset.sizeFit : 'regular';
		const rawEu = lengthToEu(lengthCm) + (fitDelta[fit] ?? 0);
		const euSize = roundToHalf(rawEu);
		const converted = convertEu(euSize);

		this.lengthOutput.textContent = `${lengthCm.toFixed(1)} cm`;
		this.recommendedOutput.textContent = `${euSize.toFixed(1)} EU`;
		this.euOutput.textContent = converted.eu.toFixed(1);
		this.usOutput.textContent = converted.us.toFixed(1);
		this.ukOutput.textContent = converted.uk.toFixed(1);
		this.tipOutput.textContent = this.getTip(fit);
	}

	getTip(fit) {
		if (fit === 'snug') return 'Performance fit: use thin socks and expect minimal extra room in toe-box.';
		if (fit === 'roomy') return 'Comfort fit: recommended if you wear thicker socks or prefer extra forefoot space.';
		return 'Balanced fit: best default for everyday wear and all-day walking comfort.';
	}

	template() {
		return /*html*/ `
			<div class="size-guide__inner">
				<div class="size-guide__head">
					<p class="size-guide__eyebrow">Size Guide</p>
					<h2 class="size-guide__title">Find your Nike size in 10 seconds</h2>
					<p class="size-guide__lead">Set your foot length and fit preference. We instantly suggest EU size and convert it to US and UK.</p>
				</div>

				<div class="size-guide__tool" aria-label="Nike size calculator">
					<div class="size-guide__field">
						<label for="size-length" class="size-guide__label">Foot length</label>
						<div class="size-guide__length-row">
							<input id="size-length" data-size-length-range type="range" min="22" max="32" step="0.1" value="26.5" />
							<input data-size-length-input type="number" min="22" max="32" step="0.1" value="26.5" />
						</div>
						<p class="size-guide__hint">Current length: <strong data-size-length-output>26.5 cm</strong></p>
					</div>

					<div class="size-guide__field">
						<p class="size-guide__label">Fit preference</p>
						<div class="size-guide__fit-tabs" role="tablist" aria-label="Fit preference">
							<button type="button" class="size-guide__fit-btn" data-size-fit="snug">Snug</button>
							<button type="button" class="size-guide__fit-btn is-active" data-size-fit="regular">Regular</button>
							<button type="button" class="size-guide__fit-btn" data-size-fit="roomy">Roomy</button>
						</div>
					</div>

					<div class="size-guide__result">
						<p class="size-guide__result-title">Recommended size</p>
						<p class="size-guide__recommended" data-size-recommended>42.0 EU</p>
						<div class="size-guide__conversion">
							<div class="size-guide__chip"><span>EU</span><strong data-size-eu>42.0</strong></div>
							<div class="size-guide__chip"><span>US</span><strong data-size-us>9.0</strong></div>
							<div class="size-guide__chip"><span>UK</span><strong data-size-uk>8.0</strong></div>
						</div>
						<p class="size-guide__tip" data-size-tip>Balanced fit: best default for everyday wear and all-day walking comfort.</p>
					</div>
				</div>
			</div>
		`;
	}
}
