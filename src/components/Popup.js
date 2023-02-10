export class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(`${selectorPopup}`);
  }

  //Метот открытия попапа
  open() {
    this._popupElement.classList.add("popup_is-opened");
    this._setKeyupEventListeners();
  }

  //Метот закрытия попапа
  close() {
    this._popupElement.classList.remove("popup_is-opened");
    this._removeKeyupEventListeners();
  }

  //обработчик события нажатия кнопки Эскейпт для закрытия попапа
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //обработчик события клик на крестик или оверлей, потом закрыть попап
  _handleClosePopupByClick = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  };

  //установить слушатели событий
  setEventListeners() {
    this._popupElement.addEventListener(
      "click",
      this._handleClosePopupByClick
    );
  }

  //удалить слушатели событий
  removeEventListeners() {
    this._popupElement.removeEventListener(
      "click",
      this._handleClosePopupByClick
    );
  }

  //установить слушатель событий нажатия клавиш
  _setKeyupEventListeners() {
    document.addEventListener("keyup", this._handleEscClose);
  }

  //удалить слушатель событий нажатия клавиш
  _removeKeyupEventListeners() {
    document.removeEventListener("keyup", this._handleEscClose);
  }
}
