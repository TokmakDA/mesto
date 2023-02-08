class FormValidator {
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

  _hasInvalidInput = (inputList) => {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid; // проверит все поля и вернет true, если все поля валидны
    });
  };

  // Сделать кнопку активной
  _activateButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  // Сделать кнопку неактивной
  _disableButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  // метод переключения состояния кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку активной
      this._activateButton(buttonElement);
    } else {
      // иначе сделай кнопку неактивной
      this._disableButton(buttonElement);
    }
  };

  enableValidation = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };
}

export { FormValidator };
