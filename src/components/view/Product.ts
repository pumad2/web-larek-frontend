import { IProduct, ProductCategory } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Product extends Component<IProduct> {
    protected productButton: HTMLButtonElement
    protected productImage: HTMLImageElement;
    protected productTitle: HTMLElement;
    protected productCategory: HTMLElement;
    protected productPrice: HTMLElement;
    protected productId: string;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.productId = this.container.id;
        this.productButton = this.container as HTMLButtonElement;
        this.productImage = this.container.querySelector('.card__image');
        this.productTitle = this.container.querySelector('.card__title');
        this.productCategory = this.container.querySelector('.card__category');
        this.productPrice = this.container.querySelector('.card__price');

        this.productButton.addEventListener('click', () => this.events.emit('product:select', {product: this}));
    }

    render(productData: Partial<IProduct>) {
        this.productId = productData.id;
        this.image = productData.image;
        this.title = productData.title;
        this.category = productData.category;
        this.price = productData.price;
        return this.container
    }

    set _id(value: string) {
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

    get _id() {
        return this.productId;
    }
}