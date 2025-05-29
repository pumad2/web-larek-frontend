import { ISuccess } from "../../types";
import { IEvents } from "../base/events";
import { Modal } from "../common/Modal";

export class Success extends Modal<ISuccess> {
    protected submitButton: HTMLButtonElement;
    protected productsTotal: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.submitButton = this.container.querySelector('.order-success__close');
        this.productsTotal = this.container.querySelector('.order-success__description');
        this.submitButton.addEventListener('click', () => this.events.emit('success:submit'));
    }

    set total(value: number) {
        this.productsTotal.textContent = `Списано ${value} синапсов`;
        super.open();
    }
}