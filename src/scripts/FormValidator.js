
export class FormValidator {
    constructor(object, elementValid) {
        this._object = object;
        this._element = elementValid;
        this._submitElement = this._element.querySelector(this._object.submitButtonSelector)
        this._inputList = Array.from(this._element.querySelectorAll(this._object.inputSelector));
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

    toggleButtonState = () => {
        this._hasInvalidInput(this._inputList)
            ? this._disabledButton()
            : this._enableButton();
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

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
        this._inputList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._isValid(inputItem);
                this.toggleButtonState();
            });
        });
        this.toggleButtonState();
    };

    enableValidation() {
        this._setEventListeners();
    }
}
