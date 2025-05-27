import { CartItem, IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "../base/Component";

export class CartProduct extends Component<CartItem> {
    protected productTitle: HTMLElement;
    protected productPrice: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected _index: HTMLElement;
    protected productId: string;

    constructor(element: HTMLTemplateElement, events: IEvents) {
        super(element, events);
        this.productId = this.container.id;
        this._index = this.container.querySelector('.basket__item-index');
        this.productTitle = this.container.querySelector('.card__title');
        this.productPrice = this.container.querySelector('.card__price');
        this.deleteButton = this.container.querySelector('.basket__item-delete');
        

        this.deleteButton.addEventListener('click', () => this.events.emit('cart:change', {productId: this.productId}));
    }

    render(data: Partial<CartItem>) {
        Object.assign(this as object, data ?? {});
        this.container.setAttribute('data-id', this.productId);
        return this.container;
    }

    get id(): string {
        return this.productId;
    }

    set index(value: number) {
        this._index.textContent = value.toString();
    }

    set id(value: string) {
        this.productId = value;
    }

    set title(value: string) {
        this.productTitle.textContent = value;
    }

    set price(value: number) {
        this.productPrice.textContent = `${value.toString()} синапсов`;
    }

    deleteProduct() {
        this.container.remove();
        this.container = null;
        this.events.emit('product:delete', {productId: this.productId});
    }
}