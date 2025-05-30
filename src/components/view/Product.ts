import { IProduct, ProductCategory } from "../../types";
import { IEvents } from "../base/events";
import { ProductView } from "./ProductView";

export class Product extends ProductView {

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.productButton = this.container as HTMLButtonElement;

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
}