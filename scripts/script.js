const buttonEditElement = document.querySelector('.btn-edit');
const popupElement = document.querySelector('.popup');
const buttonClose = popupElement.querySelector('.close');
const buttonSave = document.querySelector('.submit');
const UserForm = document.querySelector('.user__form');


const openPopup = function () {
    popupElement.classList.add('popup_opened');
}
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('.form-edit__name');
const jobInput = document.querySelector('.form-edit__profile');
const profileName = document.querySelector('.user__name');
const profileJob = document.querySelector('.user__profile');

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(formProfile);
    console.log('123');
}

buttonSave.addEventListener('submit', handleProfileFormSubmit);
buttonSave.addEventListener('click', handleProfileFormSubmit);
buttonEditElement.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
