export class Card {
    constructor(data, templateElem, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateElem;
        this._handleCardClick = handleCardClick;
        this._view = this._getTemplate();
        this._cardImage = this._view.querySelector('.card__image');
        this._cardName = this._view.querySelector('.card__text');
        this._buttonLike = this._view.querySelector('.card__button');
    }

    createCard() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._setEventListeners();
        return this._view;
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    }

    _handleClickDeleteCard = () => {
        this._view.remove();
    }

    _toggleLike = (event) => {
        event.target.classList.toggle('card__button_active');
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', event => this._toggleLike(event));
        this._view.querySelector('.card__del').addEventListener('click', event => this._handleClickDeleteCard(event));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}
