export const createPageMain = (...classNames) => {
	const main = document.createElement('main');
	main.classList.add('main', ...classNames);

	return main;
};
