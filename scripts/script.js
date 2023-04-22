const buttonEditElement = document.querySelector('.button__edit');
const popupElement = document.querySelector('.popup');
const buttonClose = popupElement.querySelector('.form-edit__close');
const buttonSave = document.querySelector('.form-edit__submit');
/*const UserForm = document.querySelector('.user__form');*/
const nameInput = document.querySelector('.form-edit__input_type_name');
const jobInput = document.querySelector('.form-edit__input_type_profile');
const profileName = document.querySelector('.user__name');
const profileJob = document.querySelector('.user__profile');
const editForm = document.querySelector('.form-edit');

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;
}
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}
/*const formProfile = document.querySelector('.popup__container');*/

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(formProfile);
}

editForm.addEventListener('submit', handleProfileFormSubmit);
/*buttonSave.addEventListener('click', handleProfileFormSubmit);*/
buttonSave.addEventListener('click', closePopup);
buttonEditElement.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

