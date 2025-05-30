import { IEvents } from "../base/events";
import { ProductView } from "./ProductView";

export class ModalProduct extends ProductView {
    protected productDescription: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.productButton = this.container.querySelector('.card__button');
        this.productDescription = this.container.querySelector('.card__text');

        this.productButton.addEventListener('click', () => this.events.emit('cart:change', {productId: this.productId}))
    }

    set isInCart(force: boolean) {
        if (force) {
            this.productButton.textContent = 'Убрать из корзины';
        } else {
            this.productButton.textContent = 'В корзину';
        }
    }
    
    set price(price: number) {
        super.price = price;
        this.setDisabled(this.productButton, price === null);
    }

    set description(value: string) {
        this.productDescription.textContent = value;
    }
}