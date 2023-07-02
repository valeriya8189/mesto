import { Popup } from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._inputItems = Array.from(this._popup.querySelectorAll('.form__input'));
        this._callbackSubmit = callbackSubmit;
    }
    _getInputValues() {
        /*  this._form = {};
          this._inputSelectors.forEach((input) => {
              this._form[input.name] = input.value;
          });
          return this._form;*/
        const formDataObject = {};
        // const inputElemetns = this._formSelector.querySelector('.form__input');
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