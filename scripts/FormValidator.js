export class FormValidator {
    constructor(object, elementValidation) {
        this._object = object;
        this._element = elementValidation;
        this._submitElement = this._element.querySelector(this._object.submitButtonSelector)
    }
    _showError(inputElement, errorElement) {
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }
    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }
    _disabledButton() {
        this._submitElement.disabled = 'disabled';
        this._submitElement.classList.add(this._object.inactiveButtonClass);
    }
    _enableButton() {
        this._submitElement.disabled = false;
        this._submitElement.classList.remove(this._object.inactiveButtonClass);
    }

    _toggleButtonState(isActive) {
        if (!isActive) {
            this._disabledButton();
        }
        else {
            this._enableButton();
        }
    }
    _isValid(inputElement) {
        inputElement.setCustomValidity("");
        const isInputValid = inputElement.validity.valid;
        const ErrorElement = this._element.querySelector(`#${inputElement.name}-error`);
        if (!ErrorElement) return;
        if (!isInputValid) {
            this._showError(inputElement, ErrorElement);
        }
        else {
            this._hideError(inputElement, ErrorElement);
        }
    }
    _setEventListeners = () => {
        const inputList = this._element.querySelectorAll(this._object.inputSelector);

        this._toggleButtonState();

        [...inputList].forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._isValid(inputItem);
                this._toggleButtonState();
            });
        });
    };
    enableValidation() {
        const formList = document.querySelectorAll(this._object.formSelector);
        [...formList].forEach((formItem) => {
            this._setEventListeners(formItem);
        });
    };
}

