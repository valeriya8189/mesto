const buttonEditElement = document.querySelector('.user__button-edit');
const buttonAddElement = document.querySelector('.user__button-add');
const buttonCloseEdit = document.querySelector('.form__button-close_edit');
const buttonCloseAdd = document.querySelector('.form__button-close_add');
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

const openPopup = function (modal) {
    modal.classList.add('popup_opened');
}

const closePopup = function (modal) {
    modal.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupElementEdit);
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__text').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    const buttonLike = cardElement.querySelector('.card__button');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__button_active');
    });
    cardElement.querySelector('.card__del').addEventListener('click', () => {
        cardElement.remove();
    });
    //open card
    cardImage.addEventListener('click', function (evt) {
        evt.preventDefault();
        popUpImage.src = item.link;
        popUpImage.alt = item.name;
        openPopup(popupElementImage);
    });

    return cardElement;
}

function renderCard(item) {
    const card = createCard(item);
    cardContainer.prepend(card);
}
initialCards.forEach(renderCard);

function handleCardFormSubmit(e) {
    e.preventDefault();
    const cardDate = {
        name: inputNameCard.value,
        link: inputUrl.value
    }
    renderCard(cardDate);
    closePopup(popupElementNewCard);
}

editForm.addEventListener('submit', handleProfileFormSubmit);
buttonEditElement.addEventListener('click', () => {
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;
    openPopup(popupElementEdit);
});
buttonAddElement.addEventListener('click', () => openPopup(popupElementNewCard));
buttonCloseEdit.addEventListener('click', () => closePopup(popupElementEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupElementNewCard));
buttonCloseImage.addEventListener('click', () => closePopup(popupElementImage));
addForm.addEventListener('submit', handleCardFormSubmit);




