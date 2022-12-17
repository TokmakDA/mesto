// Функция отображения ошибки ввода
const showInputError = (inputElement, config, errorElement) => {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

// Функция скрывающая ошибки ввода
const hideInputError = (inputElement, config, errorElement) => {
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};

// функция проверки валидности ввода
const checkInputValidity = (inputElement, config) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    hideInputError(inputElement, config, errorElement);
  } else {
    showInputError(inputElement, config, errorElement);
  }
};

// функция включения валидации
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];

  formList.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, config);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.every((inputElement) => {
    // Если все поля валидны, колбэк вернёт true
    // hasInvalidInput вернёт true
    return inputElement.validity.valid;
  });
}
// функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass); //
    buttonElement.disabled = '';
  } else {
    // иначе сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(config);
