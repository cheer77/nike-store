const BASE_URL = import.meta.env.BASE_URL || '/';

const normalizeBase = (base) => {
	if (!base || base === '/') return '';
	return base.endsWith('/') ? base.slice(0, -1) : base;
};

const withBase = (path) => {
	const safePath = path.startsWith('/') ? path : `/${path}`;
	const base = normalizeBase(BASE_URL);
	return base ? `${base}${safePath}` : safePath;
};

export const ROUTES = {
	home: '/',
	product: '/product.html',
	checkout: '/checkout.html',
	about: '/about.html',
	contact: '/contact.html',
};

export const getHomeUrl = () => withBase(ROUTES.home);

export const getProductUrl = (id) => {
	const baseUrl = withBase(ROUTES.product);
	if (id === undefined || id === null) return baseUrl;
	return `${baseUrl}?id=${encodeURIComponent(String(id))}`;
};

export const getCheckoutUrl = () => withBase(ROUTES.checkout);
export const getAboutUrl = () => withBase(ROUTES.about);
export const getContactUrl = () => withBase(ROUTES.contact);

export const getProductIdFromLocation = () => {
	const params = new URLSearchParams(window.location.search);
	const rawId = params.get('id');
	const parsed = rawId ? Number(rawId) : NaN;
	return Number.isFinite(parsed) ? parsed : null;
};
