import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor({ popupSelector, submitCallback }) {
        super(popupSelector);
        this._formPopup = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
    }

    open(card, cardId) {
        this._card = card;
        this._cardId = cardId;
        super.open();
    }

    setEventListeners() {
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._card, this._cardId);
        });
        super.setEventListeners();
    }

}