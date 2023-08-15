import { Popup } from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputItems = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._callbackSubmit = callbackSubmit;
        this._submitButton = this._form.querySelector('.popup__button-submit');
        this._submitButtonText = this._submitButton.textContent;
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
            //   this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    loadButtonText(text) {
        if (text) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}