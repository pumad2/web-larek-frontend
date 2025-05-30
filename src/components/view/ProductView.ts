import { IProduct } from "../../types";
import { Modal } from "../common/Modal";
import { IEvents } from "../base/events";
import { CDN_URL } from "../../utils/constants";
import { ProductCategory } from "../../types";

export abstract class ProductView extends Modal<IProduct>{
    protected productButton: HTMLButtonElement
    protected productImage: HTMLImageElement;
    protected productTitle: HTMLElement;
    protected productCategory: HTMLElement;
    protected productPrice: HTMLElement;
    protected productId: string;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.productId = this.container.id;
        this.productImage = this.container.querySelector('.card__image');
        this.productTitle = this.container.querySelector('.card__title');
        this.productCategory = this.container.querySelector('.card__category');
        this.productPrice = this.container.querySelector('.card__price');
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
           this.productPrice.textContent = 'Бесценно' 
        } else {
        this.productPrice.textContent = `${price} синапсов`;
        }
    }

    get id() {
        return this.productId;
    }
}