import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this.callbackSubmitForm = callbackSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputs = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._formElement.querySelector('.popup__button')
    this._spinner = this._popupElement.querySelector('.popup__spinner')
  }

  // получить значения инпутов
  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // обработчик сабмита формы
  _submitForm = (evt) => {
    evt.preventDefault();
    this.callbackSubmitForm(this._getInputValues());
  };

  // Меняем кнопку на попапе
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._buttonSubmit.value = 'Сохраняем...';
      this._spinner.classList.add('popup__spinner_visible');
    }
    else {
      this._buttonSubmit.value = 'Сохранить';
      this._spinner.classList.remove('popup__spinner_visible');
    }
  }

  // установить слушатели событий
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitForm);
  }

  // Закрыть попап
  close() {
    super.close();
    this._formElement.reset();
  }
}
