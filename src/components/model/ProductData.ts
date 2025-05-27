import { IProductData, IProduct, IProductApi } from "../../types"
import { IEvents } from "../base/events"

export class ProductData implements IProductData {
    protected _products: IProduct[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(products: IProductApi) {
        this._products = products.items;
        this.events.emit('productData: loaded');
    }

    set preview(productId: string | null) {
        if (!productId) {
            this._preview = null;
            return;
        }
        const selectedProduct = this.getProduct(productId);
        if (selectedProduct) {
            this._preview = productId;
            this.events.emit('product:selected');
        }
    }

    get products() {
        return this._products;
    }

    get preview() {
        return this._preview;
    }

    getProduct(productId: string): IProduct {
        return this.products.find((item) => {
            return item.id === productId;
        });
    }
}