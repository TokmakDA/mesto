import openPopup from './index.js';

class Card {
  static selectors = {
    card: '.card',
    nameCard: '.card__mane-card',
    imageCard: '.card__image',
    buttonDeleteCard: '.card__trash',
    buttonLikeCard: '.card__like-button',
    activeLiceCard: 'card__like-button_active',
    cards: '.cards',
    popupImageElement: '.popup_card-image',
    popupImage: '.popup__image',
    popupTitleImage: '.popup__title-image',
  };

  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  //Обработчик клика на кнопку удаления карточки
  _handleButtonDeleteCardClick(evt) {
    evt.target.closest(Card.selectors.card).remove();
  }

  //Обработчик клика на кнопку лайка карточки
  _handleButtonLikeCardClick(evt) {
    evt.target.classList.toggle(Card.selectors.activeLiceCard);
  }

  //Обработчик для открытия попапа карточки
  _openImagePopup(name, link) {
    this._popupImageElement = document.querySelector(Card.selectors.popupImageElement);
    this._popupImage = this._popupImageElement.querySelector(Card.selectors.popupImage);
    this._popupTitleImage = this._popupImageElement.querySelector(Card.selectors.popupTitleImage);

    this._popupImage.src = link;
    this._popupTitleImage.textContent = this._popupImage.alt = name;

    openPopup(this._popupImageElement);
  }

  // Слушатели событий
  _setEventListener() {
    this._buttonDeleteCard = this._element.querySelector(Card.selectors.buttonDeleteCard);
    this._buttonLikeCard = this._element.querySelector(Card.selectors.buttonLikeCard);
    this._imageCard = this._element.querySelector(Card.selectors.imageCard);

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
      .content.querySelector(Card.selectors.card)
      .cloneNode(true);
  }

  //метод создания карточек
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(Card.selectors.nameCard).textContent = this._name;
    this._element.querySelector(Card.selectors.imageCard).alt = this._name;
    this._element.querySelector(Card.selectors.imageCard).src = this._link;
    this._setEventListener();
    return this._element;
  }
}

export { Card } ;
