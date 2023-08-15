const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
};
const buttonEditAvatar = document.querySelector('.user__avatar-button');
const buttonEditElement = document.querySelector('.user__button-edit');
const buttonAddElement = document.querySelector('.user__button-add');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profile');
const popupElementEditAvatar = document.querySelector('.popup_type_avatar');

export { configFormSelector, buttonEditElement, buttonAddElement, popupElementEdit, popupElementNewCard, popUpImage, nameInput, jobInput, buttonEditAvatar, popupElementEditAvatar };