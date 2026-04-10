import '../../scss/style.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Products from '../../components/Products/products';
import Banner from '../../components/Banner/banner';
import Cart from '../../components/Cart/cart';
import CartDrawer from '../../components/CartDrawer/cartDrawer';
import { createPageMain } from '../../utils/createPageMain';

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
const banner = new Banner();
const main = createPageMain('home-main');
main.append(banner.render());
main.append(products.render());

app.prepend(header.render());
app.append(main);
app.append(cartDrawer.render());
app.append(footer.render());
