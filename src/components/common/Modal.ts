import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal<T> extends Component<T> {
    protected closeButton: HTMLButtonElement;
    protected modal: HTMLElement;
    protected modalContent: HTMLElement;

    constructor(container: HTMLElement | HTMLTemplateElement, protected events: IEvents) {
        super(container, events);
        this.modal = document.querySelector('#modal-container') as HTMLElement;
        this.modalContent = this.modal.querySelector('.modal__content') as HTMLElement;
        this.closeButton = this.modal.querySelector('.modal__close') as HTMLButtonElement;

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.modal.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.modal.addEventListener('click', (event) => event.stopPropagation());
        this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content(value: HTMLElement) {
        this.modalContent.replaceChildren(value);
    }

    handleEscUp(evt: KeyboardEvent) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this.modal.classList.add('modal_active');
        document.addEventListener("keyup", this.handleEscUp);
        this.events.emit('modal:open');
    }

    close() {
        this.modal.classList.remove('modal_active');
        this.modalContent.replaceChildren();
        document.removeEventListener("keyup", this.handleEscUp);
        this.events.emit('modal:close');
    }

    render(data?: Partial<T>): HTMLElement{
        super.render(data);
        this.content = this.container;
        this.open();
        return this.container;
    }
}