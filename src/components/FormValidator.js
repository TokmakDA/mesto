export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // метод отображения ошибки ввода
  _showInputError = (inputElement, errorElement) => {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  };

  // метод скрывающий ошибки ввода
  _hideInputError = (inputElement, errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  // метод проверки валидности ввода
  _checkInputValidity = (inputElement) => {
    this._errorElement = document.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, this._errorElement);
    } else {
      this._hideInputError(inputElement, this._errorElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.every((inputElement) => {
      return inputElement.validity.valid; // проверит все поля и вернет true, если все поля валидны
    });
  };

  // Сделать кнопку активной
  _activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  // Сделать кнопку неактивной
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  // метод переключения состояния кнопки
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      // сделай кнопку активной
      this._activateButton();
    } else {
      // иначе сделай кнопку неактивной
      this.disableButton();
    }
  };

  enableValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
}
