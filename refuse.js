
  this._element = document
    .querySelector(Card.selectors.cardTemplate)
    .content.querySelector(Card.selectors.card).cloneNode(true);


//Функция создания карточек
function createCards (cardData) {

  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.card__mane-card');
  const buttonDeleteCard = card.querySelector('.card__trash');
  const buttonLikeCard = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image');
  imageCard.src = cardData.link;
  cardName.textContent = imageCard.alt = cardData.name;

  // Слушатели кликов для кнопок лайка и удаления
  buttonDeleteCard.addEventListener('click', handleButtonDeleteCardClick);
  buttonLikeCard.addEventListener('click', handleButtonLikeCardClick);

  // Слушатель клика для открытия картинки
  imageCard.addEventListener('click', () => openImagePopup(cardData));

  return card;
}


// Функция открытия попапа добавления карточки на страницу
function openAddCardPopup () {
  cardFormElement.reset();
  disableButton(config ,buttonElementCardForm);
  openPopup(popupCardFormElement);
}
// Функция добавления новой карточки из попап и закрытие попапа
const handleFormSubmitCard = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeLinkImageInput.value,
  }

  renderCard(card, cardsListElement);
  closePopup(popupCardFormElement);
}

// функция передающия данные при открытии попапа карточки
function openImagePopup (cardData) {
  popupImage.src = cardData.link;
  popupTitleImage.textContent = popupImage.alt = cardData.name;

  openPopup(popupImageElement);
}

// Функция обработчик для лайка карточки
const handleButtonLikeCardClick = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
}
// Функция обработчик для удаления карточки
const handleButtonDeleteCardClick = (evt) => {
  evt.target.closest('.card').remove();
}


// Слушатель клика сохранения новой карточки
cardFormElement.addEventListener('submit', handleFormSubmitCard);
// Слушатель клика для открытия попапа добавления карточек
buttonOpenPopupCard.addEventListener('click', () => openAddCardPopup(popupCardFormElement));


//Функция добавления карточки на страницу
const renderCard = (cardData) => {
  return  new Card(cardData, `#card-template`).createCards();
}

// колбэк-функция для добавления карточек из массива
initialCards.forEach(function(cardData) {
  cardsListElement.prepend(renderCard(cardData));
});
