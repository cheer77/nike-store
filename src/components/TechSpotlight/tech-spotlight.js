import './tech-spotlight.scss';

const TECH_DATA = [
	{
		id: 'air',
		name: 'Nike Air',
		tag: 'Iconic Cushioning',
		description:
			'Compressed air units absorb impact and keep the ride soft without adding heavy foam bulk.',
		bestFor: 'Daily comfort, city walking, all-day wear',
		models: ['Air Max Plus', 'Air Max 90', 'Air Force 1'],
		weight: 'Medium',
		bounce: 'Balanced',
	},
	{
		id: 'react',
		name: 'Nike React',
		tag: 'Soft + Responsive Foam',
		description:
			'React foam blends plush cushioning and return energy so every step feels smoother over long sessions.',
		bestFor: 'Long walks, gym sessions, mixed daily training',
		models: ['React Vision', 'Infinity Run', 'Pegasus React'],
		weight: 'Light',
		bounce: 'High',
	},
	{
		id: 'zoom',
		name: 'Nike Zoom Air',
		tag: 'Fast Response',
		description:
			'Low-profile pressurized units are tuned for quick transitions and snappy toe-off under pressure.',
		bestFor: 'Speed runs, court sports, explosive movement',
		models: ['Air Zoom Pegasus', 'Zoom Vomero', 'KD Series'],
		weight: 'Very light',
		bounce: 'Very high',
	},
];

export default class TechSpotlight {
	render() {
		this.el = document.createElement('section');
		this.el.classList.add('tech-spotlight', 'cont');
		this.activeTechId = TECH_DATA[0].id;
		this.el.innerHTML = this.template();
		this.bindEvents();
		this.renderPanel(this.activeTechId);
		return this.el;
	}

	bindEvents() {
		this.tabButtons = Array.from(this.el.querySelectorAll('[data-tech-tab]'));
		this.titleEl = this.el.querySelector('[data-tech-title]');
		this.tagEl = this.el.querySelector('[data-tech-tag]');
		this.descriptionEl = this.el.querySelector('[data-tech-description]');
		this.bestForEl = this.el.querySelector('[data-tech-best-for]');
		this.modelsEl = this.el.querySelector('[data-tech-models]');
		this.weightEl = this.el.querySelector('[data-tech-weight]');
		this.bounceEl = this.el.querySelector('[data-tech-bounce]');

		this.tabButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.activeTechId = button.dataset.techTab;
				this.tabButtons.forEach((btn) => btn.classList.remove('is-active'));
				button.classList.add('is-active');
				this.renderPanel(this.activeTechId);
			});
		});
	}

	renderPanel(techId) {
		const tech = TECH_DATA.find((item) => item.id === techId) || TECH_DATA[0];
		this.titleEl.textContent = tech.name;
		this.tagEl.textContent = tech.tag;
		this.descriptionEl.textContent = tech.description;
		this.bestForEl.textContent = tech.bestFor;
		this.modelsEl.textContent = tech.models.join(', ');
		this.weightEl.textContent = tech.weight;
		this.bounceEl.textContent = tech.bounce;
	}

	template() {
		return /*html*/ `
			<div class="tech-spotlight__inner">
				<div class="tech-spotlight__head">
					<p class="tech-spotlight__eyebrow">Nike Tech Spotlight</p>
					<h2 class="tech-spotlight__title">Choose your cushioning DNA</h2>
				</div>

				<div class="tech-spotlight__layout">
					<div class="tech-spotlight__tabs" role="tablist" aria-label="Nike technologies">
						<button type="button" class="tech-spotlight__tab is-active" data-tech-tab="air">Air</button>
						<button type="button" class="tech-spotlight__tab" data-tech-tab="react">React</button>
						<button type="button" class="tech-spotlight__tab" data-tech-tab="zoom">Zoom</button>
					</div>

					<div class="tech-spotlight__panel">
						<p class="tech-spotlight__tag" data-tech-tag></p>
						<h3 class="tech-spotlight__panel-title" data-tech-title></h3>
						<p class="tech-spotlight__description" data-tech-description></p>
						<ul class="tech-spotlight__stats">
							<li><span>Best For</span><strong data-tech-best-for></strong></li>
							<li><span>Popular Models</span><strong data-tech-models></strong></li>
							<li><span>Weight Feel</span><strong data-tech-weight></strong></li>
							<li><span>Energy Return</span><strong data-tech-bounce></strong></li>
						</ul>
					</div>
				</div>
			</div>
		`;
	}
}
