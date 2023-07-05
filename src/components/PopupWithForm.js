import { Popup } from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputItems = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._callbackSubmit = callbackSubmit;
    }
    _getInputValues() {
        const formDataObject = {};
        this._inputItems.forEach(input => {
            formDataObject[input.name] = input.value;
        });
        return formDataObject;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}