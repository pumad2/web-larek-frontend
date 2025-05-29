import { IProduct, ProductCategory } from "../../types";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";
import { CDN_URL } from "../../utils/constants";

export class ModalProduct extends Modal<IProduct> {
    protected productButton: HTMLButtonElement;
    protected productImage: HTMLImageElement;
    protected productTitle: HTMLElement;
    protected productCategory: HTMLElement;
    protected productPrice: HTMLElement;
    protected productDescription: HTMLElement;
    protected productId: string;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.productId = this.container.id;
        this.productButton = this.container.querySelector('.card__button');
        this.productImage = this.container.querySelector('.card__image');
        this.productTitle = this.container.querySelector('.card__title');
        this.productCategory = this.container.querySelector('.card__category');
        this.productPrice = this.container.querySelector('.card__price');
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

    get id(): string {
        return this.productId;
    }

    set id(value: string) {
        this.productId = value;
    }

    set image(image: string) {
        this.productImage.src = `${CDN_URL}${image.replace(".svg", ".png")}`;
    }
    
    set title(title: string) {
        this.productTitle.textContent = title;
    }
    
    
    set category(category: ProductCategory) {
        this.productCategory.textContent = category;    
        const categoryText = this.productCategory.textContent;
    
        switch(categoryText) {
            case 'софт-скил':
                this.productCategory.classList.add('card__category_soft');
            break;
            case 'другое':
                this.productCategory.classList.add('card__category_other');
                break;
            case 'дополнительное':
                this.productCategory.classList.add('card__category_additional');
            break;
            case 'кнопка':
                this.productCategory.classList.add('card__category_button');
            break;
            case 'хард-скил':
                this.productCategory.classList.add('card__category_hard');
            break;
        }
    }
    
    set price(price: number) {
        if (price === null) {
            this.productPrice.textContent = 'Бесценно';
            this.setDisabled(this.productButton, true);
        } else {
            this.productPrice.textContent = `${price.toString()} синапсов`;
            this.setDisabled(this.productButton, false);
        }
    }

    set description(value: string) {
        this.productDescription.textContent = value;
    }
}