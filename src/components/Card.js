export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    // Обработчик открытия попапа карточки с картинкой
    this._handleCardClick = handleCardClick;
  }

  //Обработчик клика на кнопку удаления карточки
  _handleButtonDeleteCardClick() {
    this._element.remove();
    this._element = null;
  }

  //Обработчик клика на кнопку лайка карточки
  _handleButtonLikeCardClick() {
    this._buttonLikeCard.classList.toggle('card__like-button_active');
  }

  // Слушатели событий
  _setEventListener() {
    this._buttonDeleteCard = this._element.querySelector('.card__trash');
    this._buttonLikeCard = this._element.querySelector('.card__like-button');
    this._imageCard = this._element.querySelector('.card__image');

    // Слушатель клика для кнопки удаления карточки
    this._buttonDeleteCard.addEventListener('click', () =>
      this._handleButtonDeleteCardClick()
    );
    // Слушатель клика для кнопки лайка карточки
    this._buttonLikeCard.addEventListener('click', () =>
      this._handleButtonLikeCardClick()
    );
    // Слушатель клика для открытия картинки
    this._imageCard.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
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
