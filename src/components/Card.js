export class Card {
    constructor({ data, templateElem, userId, handleCardClick, handleClickDeleteCard, handleLikeCard, handleDeleteLike }) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateElem;
        this._handleCardClick = handleCardClick;
        this._handleClickDeleteCard = handleClickDeleteCard;
        this._handleDeleteLike = handleDeleteLike;
        this._handleLikeCard = handleLikeCard;
        this._likes = data.likes;
        this._userid = userId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
    }

    createCard() {
        this._view = this._getTemplate();
        this._cardImage = this._view.querySelector('.card__image');
        this._cardName = this._view.querySelector('.card__text');
        this._buttonLike = this._view.querySelector('.card__button');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._deleteButton = this._view.querySelector('.card__del');
        this._likesCounter = this._view.querySelector('.card__counter-like');
        this._likesCounter.textContent = this._likes.length;
        this._deleteCardButton();
        this._isLiked();
        this._setEventListeners();
        return this._view;
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    }

    _isLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._buttonLike.classList.add('card__button_active');
        }
    }

    rendeLike(card) {
        this._likes = card.likes;
        if (this._likes.length === 0) {
            this._likesCounter.textContent = '';
        } else {
            this._likesCounter.textContent = card.likes.length;
        }
        if (this.__isLiked()) {
            this._buttonLike.classList.add('card__button_active');
        } else {
            this._buttonLike.classList.remove('card__button_active');
        }
    }

    toggleLike() {
        this._likesCounter.textContent = this._likes.length;
        this._buttonLike.classList.toggle('card__button_active');
    }

    _deleteCardButton() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteButton.remove();
        }
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', () => {
            this.toggleLike();
        });
        this._deleteButton.addEventListener('click', () => this._handleClickDeleteCard(this));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
    getId() {
        return this._data._id;
    }
}
