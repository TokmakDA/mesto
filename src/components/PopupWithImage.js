import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = document.querySelector('.popup_card-image');
    this._popupImage = this._popupImageElement.querySelector('.popup__image');
    this._opupTitleImage = this._popupImageElement.querySelector('.popup__title-image');

  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._opupTitleImage.textContent  = name;
    super.open();
  }
}
