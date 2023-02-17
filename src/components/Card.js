export class Card {
  constructor(cardData, myId, templateSelector, handleCardClick, handleButtonDeleteCardClick, handleButtonLikeCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._createdAt = cardData.createdAt;
    this._myId = myId;
    this._templateSelector = templateSelector;
    // Внешние функции
    this._handleCardClick = handleCardClick;
    this._handleButtonDeleteCardClick = handleButtonDeleteCardClick;
    this._handleButtonLikeCardClick = handleButtonLikeCardClick;
  }

  // Слушатели событий
  _setEventListener() {
    this._buttonDeleteCard = this._element.querySelector('.card__trash');
    this._buttonLikeCard = this._element.querySelector('.card__like-button');
    this._imageCard = this._element.querySelector('.card__image');

    // Слушатель клика для кнопки удаления карточки
    this._buttonDeleteCard.addEventListener('click', () =>
      this._handleButtonDeleteCardClick(this._element, this._id)
    );
    // Слушатель клика для кнопки лайка карточки
    this._buttonLikeCard.addEventListener('click', () =>
      this._handleButtonLikeCardClick(this._id, this._buttonLikeCard, this._likesCardQuantity)
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

  // проверка на персонализацию картинки для добавления кнопки удалить
  _checkMyCard() {
    if (this._owner._id === this._myId) {
      this._element.querySelector('.card__trash').classList.add('card__trash_active');
    }
    return;
  }
  // проверка на персонализацию лайка картинки
  _checkMyLike() {
    this._likes.forEach(element => {
      if (element._id === this._myId) {
        this._buttonLikeCard.classList.add('card__like-button_active');
      }
      return;
    });
  }

  // метод создания карточек
  createCard() {
    this._element = this._getTemplate();
    this._nameCard = this._element.querySelector('.card__mane-card');
    this._imageCard = this._element.querySelector('.card__image');
    this._likesCardQuantity = this._element.querySelector('.care__like-quantity');
    this._nameCard.textContent = this._name;
    this._imageCard.alt = this._name;
    this._imageCard.src = this._link;
    this._likesCardQuantity.textContent = this._likes.length;
    this._setEventListener();
    this._checkMyCard();
    this._checkMyLike();
    return this._element;
  }
}
