import { IUserData, ProductId, IUser, PaymentMethod } from "../../types";
import { constraintsUser } from "../../utils/constants";
import { IEvents } from "../base/events";
import validate from "validate.js";

export class UserData implements IUserData {
    userData: IUser;
    events: IEvents;

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
        const {...otherUserData} = userData;
        Object.assign(this, otherUserData);
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
        this.userData = null;
    }

    checkValidation(data: Record<keyof IUser, string | number>) {
        const isValid = !Boolean(validate(data, constraintsUser));
        return isValid;
    }

    checkField(data: {field: keyof IUser; value: string}) {
        switch (data.field) {
            case 'address':
                return this.checkAddress(data.value);
            case 'email':
                return this.checkEmail(data.value);
            case 'phone':
                return this.checkPhone(data.value);
        }
    }

    checkAddress(value: string) {
        const result = validate.single(value, constraintsUser.address);
        if (result) {
            return result[0]
        } else {
            return '';
        }
    }

    checkEmail(value: string) {
        const result = validate.single(value, constraintsUser.email);
        if (result) {
            return result[0]
        } else {
            return '';
        }
    }

    checkPhone(value: string) {
        const result = validate.single(value, constraintsUser.phone);
        if (result) {
            return result[0]
        } else {
            return '';
        }
    }
}