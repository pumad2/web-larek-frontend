// Категория товара
export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

// Тип оплаты
export type PaymentMethod = 'online' | 'cash';

// Массив, состоящий из id товаров
export type ProductId = IProduct['id'];

// Товар в корзине
export type CartItem = Pick<IProduct, 'title' | 'price' | 'id'>;

// Модальное окно успешного оформления
export type ISuccess = Pick<IUser, 'total'>;

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
    setProducts(products: IProductApi): void;
}

// Список товаров
export interface IProductsContainer {
    catalog: HTMLElement[];
}

// Заголовок страницы
export interface IHeader {
    counter: number;
}

// Хранение данных пользователя
export interface IUserData {
    render(userData: Partial<IUser>): void;
    isInCart(productId: string): boolean;
    toggleItem(productId: string): boolean;
    removeData(): void;
}

// Корзина
export interface ICart {
    catalog: HTMLElement;
    total: number;
    deleteCatalog(): void;
    updateIndexes(): void;
}

// Форма
export interface IForm {
    valid: boolean;
	inputValues: Record<string, string>;
	error: Record<string, string>;
    toggleButtons(): void;
    getValues(): void;
    showError(field: string, errorMessage: string): void;
    hideError(field: string): void;
    checkFields(): boolean;
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