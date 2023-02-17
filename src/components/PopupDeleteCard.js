import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._buttonSubmit = this._formElement.querySelector('.popup__button')
    this._spinner = this._popupElement.querySelector('.popup__spinner')
  }

  // обработчик сабмита формы
  _submitForm = (evt) => {
    evt.preventDefault();
    this._callbackSubmitForm(this._cardElement, this._cardId);
  };

  // Меняем кнопку на попапе
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._buttonSubmit.value = 'Удаляем...';
      this._spinner.classList.add('popup__spinner_visible');
    }
    else {
      this._buttonSubmit.value = 'Да';
      this._spinner.classList.remove('popup__spinner_visible');
    }
  }

  open(cardElement, cardId) {
    super.open();
    this._cardElement = cardElement;
    this._cardId = cardId;
  }
  // установить слушатели событий
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this._submitForm);
  }
}
