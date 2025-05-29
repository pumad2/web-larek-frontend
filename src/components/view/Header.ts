import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { IHeader } from "../../types";

export class Header extends Component<IHeader> {
    protected cartButton: HTMLElement;
    protected cartCounter: HTMLElement;
    protected _counter: number = 0;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.cartButton = this.container.querySelector('.header__basket');
        this.cartCounter = this.cartButton.querySelector('.header__basket-counter');

        this.cartButton.addEventListener('click', () => this.events.emit('cart:open'));
    }

    set counter(value: number) {
        this.cartCounter.textContent = value.toString();
    }
}