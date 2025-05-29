import {IEvents} from "../base/events";
import { Modal } from "../common/Modal";
import { IForm } from "../../types";

export class Form extends Modal<IForm> {
    protected inputs: NodeListOf<HTMLInputElement>;
    protected _form: HTMLFormElement;
    protected formName: string;
    protected submitButton: HTMLButtonElement;
    protected errors: HTMLElement;
    protected buttonFields?: NodeListOf<HTMLElement>;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this._form = this.container as HTMLFormElement;
        this.submitButton = this.container.querySelector('button[type="submit"]');
        this.formName = this._form.getAttribute('name');
        this.errors = this.container.querySelector('.form__errors');

        const fieldsWithButtons = this.container.querySelectorAll<HTMLElement>(`.${this.formName}__buttons`);
        if (fieldsWithButtons) {
            this.buttonFields = fieldsWithButtons;
            this.toggleButtons();
        }

        this._form.addEventListener('input', (event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:input`, { field, value });
        });

        this._form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.formName}:submit`, this.getValues());
        });
    }

    protected toggleButtons() {
        this.buttonFields.forEach(field => {
            const fieldName = field.getAttribute('name');
            const buttons = field.querySelectorAll<HTMLButtonElement>('button');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('button_alt-active'));
                    button.classList.add('button_alt-active');
                    this.events.emit(`${this.formName}:input`, { field: fieldName, value: button.name });
                });
            });
        });
    }

    protected getValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        if (this.buttonFields) {
            this.buttonFields.forEach(field => {
                const fieldName = field.getAttribute('name');
                const activeButton = field.querySelector<HTMLButtonElement>('.button_alt-active');
                if (fieldName && activeButton) {
                    valuesObject[fieldName] = activeButton.name;
                };
            });
        }
        return valuesObject;
    }

    set values(data: Record<string, string>) {
        this.inputs.forEach((element) => {
            element.value = data[element.name];
        });
    }

    set valid(isValid: boolean) {
        this.setDisabled(this.submitButton, !isValid);
    }

    set error(data: { field: string, value: string, validInformation: string }) {
        if (data.validInformation) {
            this.showError(data.field, data.validInformation);
        } else {
            this.hideError(data.field);
        }
    }

    protected showError(field: string, errorMessage: string) {
        const input = this._form.querySelector<HTMLInputElement>(`[name="${field}]`);
        if (input) {
            input.style.outlineColor = 'red';
        }
        this.errors.textContent = errorMessage;
    }

    protected hideError(field: string) {
        const input = this._form.querySelector<HTMLInputElement>(`[name="${field}]`);
        if (input) {
            input.style.outlineColor = '';
        }
        this.errors.textContent = '';
    }

    checkFields(): boolean {
        let filled = true;
        this.inputs.forEach(input => {
            if (!input.value) {
                filled = false;
            }
        })
        if (this.buttonFields) {
            this.buttonFields.forEach(field => {
                const activeButton = field.querySelector('.button_alt-active');
                if (!activeButton) {
                    filled = false;
                }
            })
        }
        return filled;
    }

    get form() {
        return this._form;
    }

    close() {
        super.close();
        this._form.reset();
        this.inputs.forEach((element) => {
            this.hideError(element.name);
        })
    }
}