import './scss/styles.scss';

// Категория товара
export type ProductCategory = 'soft-skill' | 'another' | 'additional' | 'button' | 'hard-skill';

// Тип оплаты
export type PaymentMethod = 'online' | 'cash';

// Массив, состоящий из id товаров
export type ProductId = IProduct['id'];

// Товар в корзине
export type CartItem = Pick<IProduct, 'title' | 'price'>;

// Главная страница
export type IMainPage = ICartIcon & IProductData;

// Модальное окно формы оплаты
export type IOrder = Pick<IUser, 'payment' | 'address'>;

// Модальное окно почты и телефона
export type IContacts = Pick<IUser, 'email' | 'phone'>;

// Модальное окно успешного оформления
export type ISuccess = Pick<IUser, 'total'>;

// Модель товара
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number | null;
}

// Данные покупателя
export interface IUser {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: ProductId[];
}

// Список товаров
export interface IProductData {
    items: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
    checkValidation(data: Record<keyof IProduct, string>): boolean;
}

// Хранение данных пользователя
export interface IUserData extends IUser{
    set setPaymentMethod(value: PaymentMethod);
    set setAddress(value: string);
    set setEmail(value: string);
    set setPhone(value: string);
    removeData(): void;
    checkValidation(data: Record<keyof IUser, string | number>): boolean;
}

// Корзина
export interface ICart {
    items: NodeListOf<HTMLTemplateElement>;
    total: number;
    addCartItem(productElement: HTMLElement): void;
    removeCartItem(productId: string, payload: Function | null): void;
}

// Иконка корзины на главном экране
export interface ICartIcon {
    counterElement: HTMLElement;
    quantity: number;
}