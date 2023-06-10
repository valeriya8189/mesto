import { openPopup, popUpImage, popupElementImage } from "./script.js";
export class Card {
    static _template = document.querySelector('#card-template').content;
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
    }
    createCard() {
        this._view = Card._template.querySelector('.card').cloneNode(true);
        const cardImage = this._view.querySelector('.card__image');
        this._view.querySelector('.card__text').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        const buttonLike = this._view.querySelector('.card__button');
        this._handleEventClick();
        return this._view;
    }
    _handleClickDeleteCard = () => {
        this._view.remove();
    }
    _addLike = (event) => {
        event.target.classList.toggle('card__button_active');
    }
    _zoomImageCard = (evt) => {
        evt.preventDefault();
        popUpImage.src = this._link;
        popUpImage.alt = this._name;
        openPopup(popupElementImage);
    }
    _handleEventClick = () => {
        const buttonLike = this._view.querySelector('.card__button');
        const cardImage = this._view.querySelector('.card__image');
        buttonLike.addEventListener('click', this._addLike);
        this._view.querySelector('.card__del').addEventListener('click', this._handleClickDeleteCard);
        //open card
        cardImage.addEventListener('click', this._zoomImageCard);
    }
}
