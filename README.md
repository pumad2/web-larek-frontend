# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных

Категория товара

```
export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
```

Тип оплаты

```
export type PaymentMethod = 'online' | 'cash';
```

Массив, состоящий из id товаров

```
export type ProductId = IProduct['id'];
```

Товар в корзине

```
export type CartItem = Pick<IProduct, 'title' | 'price'>;
```

Модальное окно успешного оформления

```
export type ISuccess = Pick<IUser, 'total'>;
```

Модель товара

```
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number | null;
}
```

Ответ от сервера на получение карточек

```
export interface IProductApi {
    total: number;
    items: IProduct[];
}
```

Данные покупателя

```
export interface IUser {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: ProductId[];
}
```

Данные товаров

```
export interface IProductData {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct | undefined;
    setProducts(products: IProductApi): void;
}
```

Список товаров

```
export interface IProductsContainer {
    catalog: HTMLElement[];
}
```

Заголовок страницы

```
export interface IHeader {
    counter: number;
}
```

Хранение данных пользователя

```
export interface IUserData {
    render(userData: Partial<IUser>): void;
    isInCart(productId: string): boolean;
    toggleItem(productId: string): boolean;
    removeData(): void;
}
```

Корзина

```
export interface ICart {
    catalog: HTMLElement;
    total: number;
    deleteCatalog(): void;
    updateIndexes(): void;
}
```

Форма

```
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
```

Иконка корзины на главном экране

```
export interface ICartIcon {
    counterElement: HTMLElement;
    quantity: number;
}
```

## Архитектура приложения

Код приложения написан по принципу MVP (Model-View-Presenter):
- Model- слой данных, отвечает за хранение и изменение данных
- View- слой представления, отвечает за отображение данных на странице
- Presenter- отвечает за связь данных и представления

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов.\

Конструктор класса:
`constructor(baseUrl: string, options: RequestInit = {})` - принимает базовый адрес сервера и объект с заголовками запросов

Методы:
- `handleResponse` - обрабатывает переданный в параметрах ответ от сервера и возвращает его в формате JSON.
- `get` - отправляет `GET` запрос на переданный в параметрах эндпоинт и возвращает промис, который сразу обрабатывается методом `handleResponse`.
- `post` - принимает объект с данными, которые будут переданы в JSON  в теле запроса, и отправляет эти данные на переданный эндпоинт. По умолчанию выполняется `POST` запрос, но метод запроса можно изменить заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий, позволяет отправлять события, а также подписываться и отписываться от событий, происходящих в системе. Используется в презентере для обработки событий и в слоях приложения для генерации событий.\

Основные методы описаны интерфейсом `IEvents`:
- `on` - установить обработчик на событие
- `off` - снять обработчик с события
- `emit` - инициировать событие с данными
- `onAll` - слушать все события
- `offAll` - снять все обработчики
- `trigger` - возвращает функцию, при вызове которой инициализируется переданное в параметрах событие

#### Класс Component

Содержит в себе базовую логику управления `DOM`- элементами

Поля класса:
- `protected container: HTMLElement;` - элемент темплейта
- `protected events: IEvents;` - брокер событий

Конструктор класса:
`constructor(element: HTMLTemplateElement | HTMLElement, events: IEvents)` - принимает `DOM`- элемент темплейта или элемент разметки и экземпляр класса `EventEmitter` для возможности инициализации событий

Методы:
- `render(data?: Partial<T>)` - обновляет значения свойств экземпляра и возвращает DOM- элемент компонента
- `setDisabled(element: HTMLElement, state: boolean)` - меняет статус блокировки переданного элемента

### Слой данных

#### Класс ProductData

Отвечает за хранение и логику работы с данными товаров.\
Поля класса:
- `_products: IProduct[]` - массив объектов товаров
- `_preview: string | null` - id карточки, выбранной для просмотра в модальном окне
- `events: IEvents` - экземпляр класса `EventEmitter` для инициализации событий при изменении данных

Конструктор класса:
`constructor(events: IEvents)` - принимает экземпляр класса `EventEmitter` для возможности инициализации событий

Методы:
- `getProduct(productId: string): IProduct` - возвращает товар по его `id`
- `setProducts(products: IProductApi)` - изменяет значение свойства `_products`
- сеттеры и геттеры для сохранения и получения данных из полей класса

#### Класс UserData

Отвечает за хранение и логику работы с данными пользователя.\

Поля класса:
- `protected userData: IUser;` - хранит в себе объект с данными пользователя
- `protected events: IEventsж` - экземпляр класса `EventEmitter` для инициализации событий при изменении данных

Конструктор класса:
`constructor(events: IEvents)` - принимает экземпляр класса `EventEmitter` для возможности инициализации событий

Методы:
- `removeData(): void` - удаляет данные пользователя
- `render(userData: Partial<IUser>)` - обновляет значения свойств экземпляра и возвращает данные пользователя
- `isInCart(productId: string): boolean` - ищет переданный `id` товара в данных пользователя
- `toggleItem(productId: string): boolean` - ищет переданный `id` товара в данных пользователя. Добавляет значение в данные пользователя, если не нашел соответствующий `id`, и удаляет его, если находит
- сеттеры и геттеры для сохранения и получения данных из полей класса

### Слой представления

#### Класс Modal

Расширяет класс `Component`. Реализует модальное окно.\

Поля класса:
- `protected closeButton: HTMLButtonElement;` - элемент закрытия модального окна
- `protected modal: HTMLElement` - элемент модального окна
- `protected modalContent: HTMLElement;` - элемент, в который помещается содержимое модального окна

Конструктор класса:
`constructor(template: HTMLTemplateElement | HTMLElement, events: IEvents, selector: HTMLElement)` - расширяет родительский конструктор, принимает `DOM`- элемент темплейта или элемент разметки и экземпляр класса `EventEmitter` для возможности инициализации событий

Методы:
- `handleEscUp(evt: KeyboardEvent)` - закрывает окно при нажатии на Escape
- `open(): void` - открывает модальное окно
- `close(): void` - закрывает модальное окно, устанавливая слушатели на клавиатуру для закрытия по Esc, на клик по оверлею и кнопку- крестик
- `render(data?: Partial<T>): HTMLElement` - расширяет родительский метод, устанавливает содержимое модального окна и открывает модальное окно

#### Класс Form

Расширяет класс `Modal`. Реализует модальное окно с формой, содержащей поля ввода. При сабмите инициирует событие, передавая в него объект с данными из полей ввода формы. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения.\

Поля класса:
- `_form: HTMLFormElement` - элемент формы
- `formName: string` - значение атрибута `name` формы
- `inputs: NodeListOf<HTMLInputElement>` - коллекция всех полей ввода формы
- `errors: HTMLElement` - элемент, в котором отображается ошибка
- `protected submitButton: HTMLButtonElement;` - элемент кнопки сабмита
- `protected buttonFields?: NodeListOf<HTMLElement>;` - коллекция полей с кнопками формы

Конструктор класса:
`constructor(template: HTMLTemplateElement, events: IEvents)` - расширяет родительский конструктор, принимает `DOM`- элемент темплейта и экземпляр класса `EventEmitter` для возможности инициализации событий

Методы:
- `protected getValues()` - возвращает объект с данными из полей формы, где ключ- `name` поля ввода, а значение- данные, введенные пользователем
- `protected toggleButtons()` - переключает активность кнопки в каждом поле с кнопками
- `setError(data: { field: string, value: string, validInfo: string }): void` - принимает объект с данными для отображения или скрытия текстов ошибок под полями ввода
- `protected showError(field: string, errorMessage: string): void` - отображает полученный текст ошибки
- `protected hideError(field: string): void` - очищает текст ошибки
- `close(): void` - расширяет родительский метод, при закрытии дополнительно очищает форму и скрывает ошибки
- `checkFields(): boolean` - проверяет заполненность формы

#### Класс Cart

Расширяет класс `Modal`. Реализует модальное окно с корзиной. При сабмите инициирует событие, передавая в него объект с массивом `id` товаров и общей стоимостью.\

Поля класса:
- `_catalog: HTMLElement` - контейнер для отображения товаров, добавленных в корзину
- `_total: HTMLElement` - элемент для отображения общей стоимости
- `protected events: IEvents` - экземпляр класса `EventEmitter` для инициализации событий при изменении данных
- `protected cartButton: HTMLElement;` - элемент кнопки корзины

Методы:
- `deleteCatalog()` - очищает корзину, обнуляет общую стоимость и отключает активность кнопки
- `updateIndexes()` - обновляет порядковые номера товаров в корзине

#### Класс ProductView

Расширяет класс `Modal`. Абстрактный класс, содержит в себе свойства и методы для карточек товаров.

Поля класса:
- `protected productButton: HTMLButtonElement` - карточка товара
- `protected productImage: HTMLImageElement` - элемент разметки с изображением
- `protected productTitle: HTMLElement` - элемент разметки с названием
- `protected productCategory: HTMLElement` - элемент разметки с категорией
- `protected productPrice: HTMLElement` - элемент разметки с ценой
- `protected productId: string` - `id` элемента

Методы:
- сеттеры и геттеры для работы с данными экземпляра

#### Класс ModalProduct

Расширяет класс `ProductView`. Реализует модальное окно с товаром. При сабмите инициирует событие, передавая в него объект с данными товара. При открытии модального окна получает данные товара, которые нужно показать.\

Поля класса:
- `productDescription: HTMLElement` - элемент разметки с описанием

Методы:
- сеттеры для работы со значениями свойств экземпляра

#### Класс Success

Расширяет класс `Modal`. Реализует модальное окно успешной покупки.\

Поля класса:
- `productsTotal: HTMLElement` - `DOM`- элемент общей стоимости купленных товаров
- `protected submitButton: HTMLButtonElement;` - элемент кнопки модального окна успешной покупки

Методы:
- сеттер для сохранения общей стоимости товаров

#### Класс Product

Расширяет класс `ProductView`. Отвечает за отображение карточки товара.\

#### Класс ProductsContainer

Расширяет класс `Component`. Отвечает за отображение блока с товарами на главной странице.\

Конструктор класса:
`constructor(container: HTMLElement)` - принимает `DOM`- элемент контейнера, в котором размещаются карточки

Методы:
- сеттер для обновления содержимого

#### Класс Header

Отвечает за шапку старницы. Содержит иконку корзины, отображащую  количество добавленных товаров и отвечающую за открытие корзины.\

Поля класса:
- `protected cartCounter: HTMLElement` - элемент, содержащий общее количество товаров в корзине
- `protected _counter: number` - количество товаров в корзине
- `protected cartButton: HTMLElement;` - элемент кнопки открытия корзины
- `protected events: IEvents` - экземпляр класса `EventEmitter` для инициализации событий при изменении данных

Конструктор класса:
`constructor(cartIconElement: HTMLElement)` - принимает `DOM`- элемент иконки корзины

Методы:
- сеттер для хранения и получения количества товаров в корзине

### Слой коммуникации

#### Класс AppApi

Реализует взаимодействие с сервером

Конструктор класса:
`constructor(api: Api)` - принимает экземпляр класса `Api`

## Взаимодействие компонентов

Код, описывающий взаимодействие данных и представления, находится в файле `index.ts`. Взаимодействие осуществляется при помощи событий, генерируемых брокером событий, и обработчиков этих событий. В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.\

События изменения данных:
- `user:changed` - изменение данных пользователя
- `products:changed` - изменение массива карточек товаров
- `product:selected` - изменение открываемой в модальном окне карточки товара
- `product:previewClear` - очистка данных товара в модальном окне
- `cart:changed` - изменение массива товаров корзины
- `cartTotalPrice:changed` - изменение общей стоимости товаров корзины

События представления:
- `product:select` - выбор товара для отображения в модальном окне
- `product:selected` - товар выбран
- `cart:open` - открытие корзины
- `cart:change` - изменение количества товаров в корзине
- `cart:submit` - сохранение данных корзины в модальном окне
- `order:input` - изменение данных в форме выбора типа оплаты и адреса
- `order:submit` - сохранение данных формы выбора типа оплаты и адреса в модальном окне
- `contacts:input` - изменение данных в форме с почтой и телефоном пользователя
- `contacts:submit` - сохранение почты и номера телефона пользователя в модальном окне
- `success:submit` - закрытие модального окна успешной покупки