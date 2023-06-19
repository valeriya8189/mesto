import { openPopup/*, popUpImage, popupElementImage */ } from "./script.js";
export class Card {
    /*_template = document.querySelector('#card-template').content;*/
    constructor(data, templateElem, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateElem;
        this._cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
        this._handleCardClick = handleCardClick;
    }
    createCard() {
        /*this._view = this._getTemplate();*/
        /* this._view = Card.this._template.querySelector('.card').cloneNode(true);*/
        /*this._view = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);*/
        const cardImage = this._cardElement.querySelector('.card__image');
        this._cardElement.querySelector('.card__text').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        const buttonLike = this._cardElement.querySelector('.card__button');
        this._handleEventClick();
        return this._cardElement;
    }
    /*_getTemplate() {
        return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    }*/

    _handleClickDeleteCard = () => {
        this._cardElement.remove();
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
        const buttonLike = this._cardElement.querySelector('.card__button');
        const cardImage = this._cardElement.querySelector('.card__image');
        buttonLike.addEventListener('click', this._addLike);
        this._cardElement.querySelector('.card__del').addEventListener('click', this._handleClickDeleteCard);
        //open card
        /*cardImage.addEventListener('click', this._zoomImageCard);*/
        cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}
