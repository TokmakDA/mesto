export class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(`${selectorPopup}`);
  }

  //Метот открытия попапа
  open() {
    this._popupElement.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  //Метот закрытия попапа
  close() {
    this._popupElement.classList.remove('popup_is-opened');
    this.removeEventListeners();
  }

  //обработчик события нажатия кнопки Эскейпт для закрытия попапа
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  //обработчик события клик на крестик или оверлей, потом закрыть попап
  _handleClosePopupByClick = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close')
    ) {
      this.close();
    }
  };

  //установить слушатели событий
  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleClosePopupByClick);
  }

  //удалить слушатели событий
  removeEventListeners() {
    document.removeEventListener('keyup', this._handleEscClose);
    this._popupElement.removeEventListener(
      'click',
      this._handleClosePopupByClick
    );
  }
}
