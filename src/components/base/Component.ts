import { IEvents } from "./events";
import { cloneTemplate } from "../../utils/utils";

export abstract class Component<T> {
    protected container: HTMLElement;
    protected events: IEvents;

    constructor(element: HTMLTemplateElement | HTMLElement, events?: IEvents) {
        if (element instanceof HTMLTemplateElement) {
            this.container = cloneTemplate(element);
        } else {
            this.container = element;
        }
        if (events) {
            this.events = events;
        }
    }

    render(data?: Partial<T>) {
        Object.assign(this as object, data ?? {});
        return this.container;
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }
}