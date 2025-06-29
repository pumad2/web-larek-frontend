import { IUserData, ProductId, IUser, PaymentMethod } from "../../types";
import { IEvents } from "../base/events";

export class UserData implements IUserData {
    protected userData: IUser;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.userData = {
            payment: null,
            email: null,
            phone: null,
            address: null,
            total: 0,
            items: []
        };
    }

    render(userData: Partial<IUser>) {
        Object.assign(this.userData, userData);
        return this.userData;
    }

    isInCart(productId: string): boolean {
        return this.items.includes(productId);
    }

    toggleItem(productId: string): boolean {
        const index = this.items.indexOf(productId);

            if (index !== -1) {
                this.items.splice(index, 1);
                this.events.emit('id:removed');
                return false;
            } else {
                this.items.push(productId);
                this.events.emit('id:added');
                return true;
            }
    }

    set items(item: ProductId[]) {
        this.userData.items = item;
    }
    
    set payment(value: PaymentMethod) {
        this.userData.payment = value;
    }

    set address(value: string) {
        this.userData.address = value;
    }

    set email(value: string) {
        this.userData.email = value;
    }

    set phone(value: string) {
        this.userData.phone = value;
    }

    set total(value: number) {
        this.userData.total = value;
    }

    get total() {
        return this.userData.total;
    }

    get payment() {
        return this.userData.payment;
    }

    get email() {
        return this.userData.email;
    }

    get phone() {
        return this.userData.phone;
    }

    get address() {
        return this.userData.address;
    }

    get items(): ProductId[] {
        return this.userData.items;
    }

    removeData() {
        this.userData = {
            payment: null,
            email: null,
            phone: null,
            address: null,
            total: 0,
            items: []
        };
    }
}