import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";
import { ICart } from "../../types";

export class Cart extends Modal<ICart> {
    protected cartButton: HTMLElement;
    protected _total: HTMLElement;
    protected events: IEvents;
    protected _catalog: HTMLElement;

    constructor(container: HTMLTemplateElement, events: IEvents) {
        super(container, events);
        this._total = this.container.querySelector('.basket__price');
        this.cartButton = this.container.querySelector('.basket__button');
        this._catalog = this.container.querySelector('.basket__list');
        this.cartButton.addEventListener('click', () => this.events.emit('cart:submit'));
    }

    deleteCatalog() {
        this._catalog.innerHTML = '';
        this.total = 0;
        this.setDisabled(this.cartButton, true);
    }

    get catalog(): HTMLElement {
        return this._catalog;
    }

    set catalog(item: HTMLElement) {
        this._catalog.appendChild(item);
        this.events.emit('cart:added');
    }

    set total(value: number) {
        this._total.textContent = `${value} синапсов`;
        if (value > 0) {
            this.setDisabled(this.cartButton, false);
        } else {
            this.setDisabled(this.cartButton, true);
        }
    }

    updateIndexes() {
        const products = Array.from(this._catalog.children);
        products.forEach((product, index) => {
            const indexElement = product.querySelector('.basket__item-index');
            indexElement.textContent = `${index + 1}`;
        })
    }
}