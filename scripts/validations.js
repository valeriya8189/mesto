const showError = function (inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}
const hideError = function (inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

const disabledButton = function (buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
}
const enableButton = function (buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

const toggleButtonState = function (buttonElement, isActive, config) {
    if (!isActive) {
        disabledButton(buttonElement, config);
    }
    else {
        enableButton(buttonElement, config);
    }
}

const isValid = function (inputElement, formElement, config) {
    inputElement.setCustomValidity("");
    const isInputValid = inputElement.validity.valid;
    const ErrorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!ErrorElement) return;
    if (!isInputValid) {
        showError(inputElement, ErrorElement, config);
    }
    else {
        hideError(inputElement, ErrorElement, config);
    }
}

const setEventListeners = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    [...inputList].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            isValid(inputItem, formElement, config);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
        });
    });
};

const enableValidation = function (config) {
    const formList = document.querySelectorAll(config.formSelector);
    [...formList].forEach((formItem) => {
        setEventListeners(formItem, config);
    });
};
const configFormSelector = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inputErrorClass: 'form__input_type_error',
};

enableValidation(configFormSelector);

