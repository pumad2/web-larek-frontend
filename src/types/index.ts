// Категория товара
export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

// Тип оплаты
export type PaymentMethod = 'online' | 'cash';

// Массив, состоящий из id товаров
export type ProductId = IProduct['id'];

// Товар в корзине
export type CartItem = Pick<IProduct, 'title' | 'price' | 'id'>;

// Главная страница
export type IMainPage = ICartIcon & IProductData;

// Модальное окно формы оплаты
export type IOrder = Pick<IUser, 'payment' | 'address'>;

// Модальное окно почты и телефона
export type IContacts = Pick<IUser, 'email' | 'phone'>;

// Модальное окно успешного оформления
export type ISuccess = Pick<IUser, 'total'>;

// Модальное окно товара
export interface ModalProductItem {
    product: {
        image: string;
        category: ProductCategory;
        description: string;
        price: number;
        title: string;
    }
}

// Ответ от сервера на получение карточек
export interface IProductApi {
    total: number;
    items: IProduct[];
}

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
    payment: PaymentMethod | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    total: number | null;
    items: ProductId[];
}

// Список товаров
export interface IProductData {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct | undefined;
}

// Хранение данных пользователя
export interface IUserData {
    userData: IUser;
    removeData(): void;
    checkValidation(data: Record<keyof IUser, string | number>): boolean;
}

// Хранение данных корзины
export interface ICartData {
    cartData: CartItem[];
    total: number;
}

// Модальное окно
export interface IModal {
    modal: HTMLElement;
}

// Форма
export interface IFormState {
    valid: boolean;
    errors: string;
}

// Корзина
export interface ICart {
    //items: CartItem[];
    //total: number;
    addCartItem(productElement: HTMLElement): void;
    removeCartItem(productId: string, payload: Function | null): void;
}

// Иконка корзины на главном экране
export interface ICartIcon {
    counterElement: HTMLElement;
    quantity: number;
}

// Методы запросов к серверу
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Api
export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method: ApiPostMethods): Promise<T>;
}

// Ответ на POST- запрос
export interface IPostApi {
    _id: string;
    total: number;
}