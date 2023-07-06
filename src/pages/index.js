
import './index.css';

import { initialCards, configFormSelector, buttonEditElement, buttonAddElement, popupElementEdit, popupElementNewCard, popUpImage, nameInput, jobInput } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

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
