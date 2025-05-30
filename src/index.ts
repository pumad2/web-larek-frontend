import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { ProductData } from './components/model/ProductData';
import { UserData } from './components/model/UserData';
import './scss/styles.scss';
import { IApi, IProductApi, IPostApi } from './types';
import { API_URL, constraintsUser, settings } from './utils/constants';
import { AppApi } from './components/base/AppApi';
import { Product } from './components/view/Product';
import { ProductsContainer } from './components/view/ProductsContainer';
import { Form } from './components/view/Form';
import { Success } from './components/view/Success';
import { ModalProduct } from './components/view/ModalProduct';
import { Header } from './components/view/Header';
import { Cart } from './components/view/Cart';
import { CartProduct } from './components/view/CartProduct';

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const events = new EventEmitter();
const productCardTemplate = document.querySelector<HTMLTemplateElement>('#card-catalog');
const modalProductTemplate = document.querySelector<HTMLTemplateElement>('#card-preview');
const cartProductTemplate = document.querySelector<HTMLTemplateElement>('#card-basket');
const cartTemplate = document.querySelector<HTMLTemplateElement>('#basket');
const headerElement = document.querySelector<HTMLElement>('.header');
const orderTemplate = document.querySelector<HTMLTemplateElement>('#order');
const contactsTemplate = document.querySelector<HTMLTemplateElement>('#contacts');
const successTemplate = document.querySelector<HTMLTemplateElement>('#success');
const cart = new Cart(cartTemplate, events);
const header = new Header(headerElement, events);
const modalProduct = new ModalProduct(modalProductTemplate, events);
const productData = new ProductData(events);
const productsContainer = new ProductsContainer(document.querySelector('.gallery'));
const userData = new UserData(events);
const formOrder = new Form(orderTemplate, events);
const formContacts = new Form(contactsTemplate, events);
const success = new Success(successTemplate, events);

/*events.onAll((event) => {
    console.log(event.eventName, event.data);
})*/

api.getProductList()
.then((productList: IProductApi) => {
    productData.setProducts(productList);
})
.catch((err) => {
    console.log(err);
})

events.on('productData: loaded', () => {
    const productsArray = productData.products.map((dataProduct) => {
        const product = new Product(productCardTemplate, events);
        return product.render(dataProduct);
    });
    productsContainer.render({ catalog: productsArray });
})

events.on('product:select', (data: {product: Product}) => {
    productData.preview = data.product.id;
})

events.on('product:selected', () => {
    const product = productData.getProduct(productData.preview);
    if (product) {
        modalProduct.render(product);
        modalProduct.isInCart = userData.isInCart(product.id);
    }
})

events.on('cart:change', (data: {productId: string}) => {
    const added = userData.toggleItem(data.productId);

    if (added) {
        const product = productData.getProduct(data.productId);
        if (product) {
            const cartProduct = new CartProduct(cartProductTemplate, events);
            cart.catalog = cartProduct.render(product);
        }
    } else {
        const element = cart.catalog.querySelector(`[data-id="${data.productId}"]`);
        if (element) {
            element.remove();
        }  
    }

    cart.updateIndexes();

    header.counter = cart.catalog.children.length;

    if (productData.preview === data.productId) {
        modalProduct.isInCart = added;
    }

    const total = userData.items
        .map(id => productData.getProduct(id).price)
        .reduce((sum, price) => sum + price, 0);
    
    userData.total = total;
    cart.total = total;
    success.total = total;
})

events.on('cart:open', () => {
    cart.render();
    cart.total = userData.total;
})

events.on('cart:submit', () => {
    formOrder.render({valid: false});
})

type FormField = keyof typeof constraintsUser;
events.on('order:input', ({field, value}: {field: FormField, value: string}) => {
    formOrder.error = {field, value, validInformation: value ? '' : constraintsUser[field].presence.message};
    formOrder.valid = formOrder.checkFields();
})

events.on('order:submit', (values: Record<string, string>) => {
    userData.render(values);
    formContacts.render({valid: false});
})

events.on('contacts:input', ({field, value}: {field: FormField, value: string}) => {
    formContacts.error = {field, value, validInformation: value ? '' : constraintsUser[field].presence.message};
    formContacts.valid = formContacts.checkFields();
})

events.on('contacts:submit', (values: Record<string, string>) => {
    api.setUserOrder(userData.render(values))
    .then((res: IPostApi) => {
        console.log(res);
        success.render();
        cart.deleteCatalog();
        userData.removeData();
        header.counter = 0;
    })
    .catch((err) => {
        console.log(err);
    })
})

events.on('success:submit', () => {
    success.close();
})
