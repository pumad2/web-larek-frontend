import { Component } from "../base/Component";
import { IProductsContainer } from "../../types";

export class ProductsContainer extends Component<IProductsContainer> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}