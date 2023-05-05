const buttonEditElement = document.querySelector('.user__button-edit');
const buttonAddElement = document.querySelector('.user__button-add');
const buttonCloseEdit = document.querySelector('.form-edit__button-close');
const buttonCloseAdd = document.querySelector('.form-add__button-close');
const buttonSaveCard = document.querySelector('form-add__button-submit');
const buttonCloseImage = document.querySelector('.form-image__button-close');

const buttonDeleteCard = document.querySelector('.card__del');

const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementNewCard = document.querySelector('.popup_type_new-card');
const popupElementImage = document.querySelector('.popup_type_image');


const nameInput = document.querySelector('.form-edit__input_type_name');
const jobInput = document.querySelector('.form-edit__input_type_profile');
const profileName = document.querySelector('.user__name');
const profileJob = document.querySelector('.user__profile');
const editForm = document.querySelector('.form-edit');
const addForm = document.querySelector('.form-add');
const inputNameCard = document.querySelector('.form-add__input_type_name-place');
const inputUrl = document.querySelector('.form-add__input_type_link');

const openPopup = function (modal) {
    modal.classList.add('popup_opened');
    /*
    popupElementEdit.classList.add('popup_opened');
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;*/
}

const closePopup = function (rem) {
    rem.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupElementEdit);
}

editForm.addEventListener('submit', handleProfileFormSubmit);
buttonEditElement.addEventListener('click', () => openPopup(popupElementEdit));
buttonAddElement.addEventListener('click', () => openPopup(popupElementNewCard));

buttonCloseEdit.addEventListener('click', () => closePopup(popupElementEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupElementNewCard));
buttonCloseImage.addEventListener('click', () => closePopup(popupElementImage));

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

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const placeCard = initialCards.map(function (element) {
    return {
        name: element.name,
        link: element.link
    }
});
function renderCard({ name, link }) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__text').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardContainer.prepend(cardElement);

    const buttonLike = cardElement.querySelector('.card__button');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__button_active');
    });
    cardElement.querySelector('.card__del').addEventListener('click', () => {
        cardElement.remove();
    });
    //open card
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        evt.preventDefault();
        document.querySelector('.form-image').src = link;
        popupElementImage.classList.add('popup_opened');
    });

    return renderCard;
}
function render() {
    placeCard.forEach(renderCard);
}
render();
function handleCardFormSubmit(e) {
    e.preventDefault();
    const name = inputNameCard.value;
    const link = inputUrl.value;
    inputNameCard.textContent = name;
    inputUrl.src = link;
    renderCard({ name, link });
    closePopup(popupElementNewCard);
}
addForm.addEventListener('submit', handleCardFormSubmit);




