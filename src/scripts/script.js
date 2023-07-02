
import '../pages/index.css';

import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

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
const cardTemplate = document.querySelector('#card-template').content;
const popupElement = document.querySelector('.popup');
const buttonClose = document.querySelector('.form__button-close');
export const form = document.querySelector('.form');

const popupImageCard = new PopupWithImage('.popup_type_image');
popupImageCard.setEventListeners();

function handleCardClick(name, link) {
    popupImageCard.open({ name, link });
}

const userInfo = new UserInfo({
    profileName: '.user__name',
    profileJob: '.user__profile'
});

const popupEditeProfile = new PopupWithForm('.popup_type_edit', {
    callbackSubmit: (Data) => {
        userInfo.setUserInfo({
            username: Data.name,
            profileJob: Data.job
        });
        popupEditeProfile.close();
    }
});
popupEditeProfile.setEventListeners();

function createCard(cardData) {
    // тут создаем карточку
    const cardItem = new Card(cardData, '#card-template', handleCardClick);
    return cardItem.createCard();
}

const section = new Section({
    items: initialCards,
    renderer: (cardData) => {
        section.addItem(createCard(cardData));
    }
}, '.cards');

section.renderItems();

const popupAddCard = new PopupWithForm('.popup_type_new-card',
    {
        callbackSubmit: (dataCard) => {
            section.addItem(createCard({
                name: dataCard.place,
                link: dataCard.link
            }));
            popupAddCard.close();
        }
    });
popupAddCard.setEventListeners();

const addCardValidation = new FormValidator(configFormSelector, popupElementNewCard);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(configFormSelector, popupElementEdit);
editProfileValidation.enableValidation();

buttonEditElement.addEventListener('click', () => {
    popupEditeProfile.open();
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfileValidation.toggleButtonState();
});

buttonAddElement.addEventListener('click', () => {
    popupAddCard.open();
    addCardValidation.toggleButtonState();
});
