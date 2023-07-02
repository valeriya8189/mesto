/*import { openPopup } from "./script.js";*/

export class Card {
    constructor(data, templateElem, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateElem;
        this._handleCardClick = handleCardClick;
    }

    createCard() {
        this._view = this._getTemplate();
        const cardImage = this._view.querySelector('.card__image');
        //this._view.querySelector('.card__text').textContent = this._name;
        const cardName = this._view.querySelector('.card__text');
        cardName.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        // const buttonLike = this._view.querySelector('.card__button');
        this._handleEventClick();
        return this._view;
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    }

    _handleClickDeleteCard = () => {
        this._view.remove();
    }

    _addLike = (event) => {
        event.target.classList.toggle('card__button_active');
    }
    /*
        _zoomImageCard = (evt) => {
            evt.preventDefault();
            popUpImage.src = this._link;
            popUpImage.alt = this._name;
            openPopup(popupElementImage);
        }*/

    _handleEventClick = () => {
        const buttonLike = this._view.querySelector('.card__button');
        const cardImage = this._view.querySelector('.card__image');
        buttonLike.addEventListener('click', event => this._addLike(event));
        this._view.querySelector('.card__del').addEventListener('click', event => this._handleClickDeleteCard(event));
        cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}
