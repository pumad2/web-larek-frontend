import {Component} from "../base/Component";
import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";
import { Modal } from "../common/Modal";

interface IFormState {
    valid: boolean;
    errors: string;
    inputValues: Record<string, string>;
}

export class Form<T> extends Modal<IFormState> {
    protected inputs: NodeListOf<HTMLInputElement>;
    protected _form: HTMLFormElement;
    protected formName: string;
    protected submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected _handleSubmit: Function;
    protected formButtons?: NodeListOf<HTMLButtonElement>;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);
        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this._form = this.container.querySelector('.form');
        this.submitButton = this.container.querySelector('button[type="submit"]');
        this.formName = this._form.getAttribute('name');
        this._errors = this.container.querySelector('.form__errors');

        const buttons = this.container.querySelector(`.${this.formName}__buttons`);
        if (buttons) {
            this.formButtons = buttons.querySelectorAll<HTMLButtonElement>('.button');

        }

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this._form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.formName}:submit`, this.getInputValues());
        });
    }

    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }

    /*set inputValues(data: Record<string, string>) {
        this.inputs.forEach((element) => {
            element.value = data[element.name];
        });
    }*/

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.formName}.${String(field)}:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    get form() {
        return this._form;
    }

    close() {
        super.close();
        this._form.reset();
        this.inputs.forEach((element) => {
            this._errors.textContent = '';
        })
    }

    /*set handleSubmit(submitFunction: Function) {
        this._handleSubmit = submitFunction;
    }

    /*render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;

    }*/
}