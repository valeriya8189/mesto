
import './index.css';

import { configFormSelector, buttonEditElement, buttonAddElement, popupElementEdit, popupElementNewCard, popUpImage, nameInput, jobInput, buttonEditAvatar, popupElementEditAvatar } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/api.js";
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

const popupImageCard = new PopupWithImage('.popup_type_image');
popupImageCard.setEventListeners();

function handleCardClick(name, link) {
    popupImageCard.open({ name, link });
}

function handleDeleteLike(instance) {
    api.changeLike(instance.getId(), instance.isLiked())
        .then(dataCardFromServer => {
            instance.setLikes(dataCardFromServer)
        })
}

const userInfo = new UserInfo({
    profileName: '.user__name',
    profileJob: '.user__profile',
    avatar: '.user__avatar'
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

const deleteCardPopup = new PopupWithConfirm({
    popupSelector: '.popup_type_card-delete',
    handleDeleteCard: (card, cardId) => {
        api.deleteCard(cardId)
            .then(() => {
                card.remove();
                deleteCardPopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
});

deleteCardPopup.setEventListeners();

const editPopupAvatar = new PopupWithForm('.popup_type_avatar', {
    callbackSubmit: (data) => {
        editPopupAvatar.loadButtonText(true);
        api.editAvatar(data)
            .then((data) => {
                avatar.src = data.avatar;
                editPopupAvatar.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                editPopupAvatar.loadButtonText(false);
            });
    }
});
editPopupAvatar.setEventListeners();

function createCard(cardData) {
    // тут создаем карточку
    const cardItem = new Card({
        data: cardData,
        userId: userId,
        templateElem: '#card-template',
        handleCardClick,
        handleClickDeleteCard: (cardId) => {
            const deleteCardPopup = new PopupWithConfirm({
                popupSelector: '.popup_type_card-delete'
            });
            deleteCardPopup.setEventListeners();
            deleteCardPopup.open();
            deleteCardPopup.submitCallback(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        deleteCardPopup.close();
                        cardItem.deleteCard();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        handleLikeCard: (cardId) => {
            api.setLike(cardId)
                .then((res) => {
                    cardItem.renderCardLike(res)
                })
                .catch((err) => {
                    console.log(`При лайке карточки возникла ошибка, ${err}`)
                })
        },
        handleDeleteLike: (cardId) => {
            api.deleteLike(cardId)
                .then((res) => {
                    cardItem.rendeLike(res);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    });
    return cardItem.createCard();
}

const config = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-70/',
    headers: {
        authorization: 'a9f267c2-0ca1-4da7-9fb9-3270924fc627',
        'Content-Type': 'application/json'
    }
}
const api = new Api(config);

const section = new Section({
    renderer: (cardData) => {
        section.addItem(createCard(cardData));
    },
}, '.cards');

let userId = null;

Promise.all([api.getCards(), api.getUser()])
    .then(([initialCards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        section.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });
//section.renderItems();

const popupAddCard = new PopupWithForm('.popup_type_new-card',
    {
        callbackSubmit: (dataCard) => {
            popupAddCard.loadButtonText(true);
            api.addCard(dataCard)
                .then((newcardData) => {
                    section.addItem(createCard(newcardData));
                    popupAddCard.close();
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
                .finally(() => {
                    popupAddCard.loadButtonText(false);
                });
            /* section.addItem(createCard({
                 name: dataCard.place,
                 link: dataCard.link
             }));*/
            //  popupAddCard.close();
        }
    });
popupAddCard.setEventListeners();



const addCardValidation = new FormValidator(configFormSelector, popupElementNewCard);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(configFormSelector, popupElementEdit);
editProfileValidation.enableValidation();

const editAvatarValidation = new FormValidator(configFormSelector, popupElementEditAvatar);
editAvatarValidation.enableValidation();

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

buttonEditAvatar.addEventListener('click', () => {
    editPopupAvatar.open();
    editAvatarValidation.toggleButtonState();
});

api.getCards()
    .then((data) => {
        section.renderItems(data);
    })