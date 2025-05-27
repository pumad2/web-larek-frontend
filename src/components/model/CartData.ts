import { ICartData, CartItem } from "../../types";
import { IEvents } from "../base/events";

/*export class CartData implements ICartData {
    protected _cartData: CartItem[];
    protected _total: number;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    getTotal(): number {
        return this._cartData.reduce((sum, curr) => {
            return sum + curr.price;
        }, 0)
    }

    set total(value: number) {
        this._total = value
    }

    addCartItem(productElement: HTMLElement) {

    }

    removeCartItem(productId: string, payload: Function | null) {
        
    } 
}*/