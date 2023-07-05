import { Popup } from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._description = document.querySelector('.popup__description');
        this._image = document.querySelector('.popup__image');
    }

    open({ name, link }) {
        super.open();
        this._description.textContent = name;
        this._image.src = link;
        this._image.alt = name;
    }
}