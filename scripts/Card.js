class Card {
  constructor(cardData, templateSelector, openPopup, popupImageElement, popupImage, popupTitleImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._popupImageElement = popupImageElement;
    this._popupImage = popupImage;
    this._popupTitleImage = popupTitleImage;

  }

  //Обработчик клика на кнопку удаления карточки
  _handleButtonDeleteCardClick(evt) {
    evt.target.closest('.card').remove();
  }

  //Обработчик клика на кнопку лайка карточки
  _handleButtonLikeCardClick(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  //Обработчик для открытия попапа карточки
  _openImagePopup(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitleImage.textContent = name;

    this._openPopup(this._popupImageElement);
  }

  // Слушатели событий
  _setEventListener() {
    this._buttonDeleteCard = this._element.querySelector('.card__trash');
    this._buttonLikeCard = this._element.querySelector('.card__like-button');
    this._imageCard = this._element.querySelector('.card__image');

    // Слушатель клика для кнопки удаления карточки
    this._buttonDeleteCard.addEventListener('click', this._handleButtonDeleteCardClick);
    // Слушатель клика для кнопки лайка карточки
    this._buttonLikeCard.addEventListener('click', this._handleButtonLikeCardClick);
    // Слушатель клика для открытия картинки
    this._imageCard.addEventListener('click', () =>
      this._openImagePopup(this._name, this._link)
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  //метод создания карточек
  createCard() {
    this._element = this._getTemplate();
    this._nameCard = this._element.querySelector('.card__mane-card');
    this._imageCard = this._element.querySelector('.card__image');
    this._nameCard.textContent = this._name;
    this._imageCard.alt = this._name;
    this._imageCard.src = this._link;
    this._setEventListener();
    return this._element;
  }
}

export { Card } ;
