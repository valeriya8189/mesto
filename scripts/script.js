import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const configFormSelector = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
};

const buttonEditElement = document.querySelector('.user__button-edit');
const buttonAddElement = document.querySelector('.user__button-add');
const buttonCloseEdit = document.querySelector('.form__button-close_edit');
const buttonCloseAdd = document.querySelector('.form__button-close_add');

const buttonSaveEdit = document.querySelector('form__button-submit_edit');

const buttonSaveCard = document.querySelector('form__button-submit_add');
const buttonCloseImage = document.querySelector('.popup__button-close');
const buttonDeleteCard = document.querySelector('.card__del');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementNewCard = document.querySelector('.popup_type_new-card');
const popupElementImage = document.querySelector('.popup_type_image');
const popUpImage = document.querySelector('.popup__image');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profile');
const profileName = document.querySelector('.user__name');
const profileJob = document.querySelector('.user__profile');
const editForm = document.querySelector('.form_type_edit');
const addForm = document.querySelector('.form_type_add');
const inputNameCard = document.querySelector('.form__input_type_name-place');
const inputUrl = document.querySelector('.form__input_type_link');
const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupElement = document.querySelector('.popup');
const buttonClose = document.querySelector('.form__button-close');
export const form = document.querySelector('.form');

export const openPopup = function (modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeydownEsc);
    modal.addEventListener('click', closePopupOverlay);
}

const closePopup = function (modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeydownEsc);
    modal.removeEventListener('click', closePopupOverlay);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupElementEdit);
}

function createCard(item) {
    // тут создаем карточку
    const cardItem = new Card(item, '.card-template', handleCardClick);
    const card = cardItem.createCard();
    return card;
}

initialCards.forEach((item) => {
    cardContainer.append(createCard(item));
});

const handleAddedCardRender = (item) => {
    cardContainer.prepend(createCard(item));
}
/*
const renderValidationCards = function () {
    document.querySelectorAll(configFormSelector.formSelector).forEach(form => {
        new FormValidator(configFormSelector, form).enableValidation();
    });
}
renderValidationCards();*/

function handleCardFormSubmit(e) {
    e.preventDefault();
    const cardDate = {
        name: inputNameCard.value,
        link: inputUrl.value,
    };
    /*const cardDate = new Card({
        name: inputNameCard.value,
        link: inputUrl.value,
    }).createCard();*/
    handleAddedCardRender(cardDate);
    closePopup(popupElementNewCard);
    /* addCardValidation.disableButton();*/
}
/*
form.forEach(element => {
    editProfileValidation.enableValidation(element);
    addCardValidation.enableValidation(element);
});*/

editForm.addEventListener('submit', handleProfileFormSubmit);

buttonEditElement.addEventListener('click', () => {
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;
    const input = document.querySelector('.form__input');
    editProfileValidation.toggleButtonState();
    openPopup(popupElementEdit);
});

buttonAddElement.addEventListener('click', () => {
    addCardValidation.toggleButtonState();
    openPopup(popupElementNewCard);
});

const closePopupKeydownEsc = function (e) {
    /* e.preventDefault();*/
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

const closePopupOverlay = function (e) {
    if (e.target === e.currentTarget) {
        /*const activePopup = document.querySelector('.popup_opened');*/
        closePopup(e.target);
    }
}

function handleCardClick(name, link) {
    popUpImage.alt = name;
    popUpImage.src = link;
    openPopup(popupElementImage);
}

const addCardValidation = new FormValidator(configFormSelector, popupElementNewCard);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(configFormSelector, popupElementEdit);
editProfileValidation.enableValidation();

buttonCloseEdit.addEventListener('click', () => closePopup(popupElementEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupElementNewCard));
buttonCloseImage.addEventListener('click', () => closePopup(popupElementImage));
addForm.addEventListener('submit', handleCardFormSubmit);

