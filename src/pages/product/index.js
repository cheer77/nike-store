import '../../scss/style.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Cart from '../../components/Cart/cart';

const app = document.getElementById('app');
const cart = new Cart();

const header = new Header(cart);
const footer = new Footer();

const content = document.createElement('main');
content.classList.add('cont');
content.style.paddingTop = '140px';
content.style.paddingBottom = '40px';
content.innerHTML = `
	<section>
		<h1 style="font-size:32px;font-weight:700;margin-bottom:10px;">Product Page</h1>
		<p style="color:#6f6f74;">Page foundation is ready. You can now implement product details here.</p>
	</section>
`;

app.prepend(header.render());
app.append(content);
app.append(footer.render());
