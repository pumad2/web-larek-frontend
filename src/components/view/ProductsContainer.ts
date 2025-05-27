import { IProduct } from "../../types";
import { Component } from "../base/Component";

interface IProductsContainer {
    catalog: HTMLElement[];
}

export class ProductsContainer extends Component<IProductsContainer> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}