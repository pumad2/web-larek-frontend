import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    cartButton: HTMLElement;
    cartCounter: HTMLElement;
    _counter: number = 0;
    events: IEvents;

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