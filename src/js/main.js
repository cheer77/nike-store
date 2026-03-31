import '../scss/style.scss';
import './Products/products';
import './Header/header';
import Header from './Header/header';
import Footer from './Footer/footer';
import Products from './Products/products';
import Cart from './Cart/cart';
import CartDrawer from './CartDrawer/cartDrawer';

const app = document.getElementById('app');
const cart = new Cart();

let cartDrawer;

const header = new Header(cart, () => {
	cartDrawer.open();
});

const updateApp = () => {
	header.updateCount();
	cartDrawer.update();
	products.update();
};

const products = new Products(cart, updateApp);

cartDrawer = new CartDrawer(cart, updateApp);

const footer = new Footer();

app.prepend(header.render());
app.append(products.render());
app.append(cartDrawer.render());
app.append(footer.render());
