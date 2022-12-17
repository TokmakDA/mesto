const popupProfileElement = document.querySelector('.popup_profile-form');
// const buttonClosePopupProfile = popupProfileElement.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');
const formElement = popupProfileElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('#profile-name');
const jobInput = formElement.querySelector('#profile-job');

const cardsListElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const popupCardFormElement = document.querySelector('.popup_card-form');
// const buttonClosePopupCardForm = popupCardFormElement.querySelector('.popup__close');
const buttonOpenPopupCard = profileInfo.querySelector('.profile__add-button');
const cardFormElement = popupCardFormElement.querySelector('.popup__form');
const placeNameInput = cardFormElement.querySelector('#place-name');
const placeLinkImageInput = cardFormElement.querySelector('#place-link-img');
const buttonElement = cardFormElement.querySelector('.popup__button')

const popupImageElement = document.querySelector('.popup_card-image');
// const buttonClosePopupImage = popupImageElement.querySelector('.popup__close');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupTitleImage = popupImageElement.querySelector('.popup__title-image');

//массив попапов
const popups = Array.from(document.querySelectorAll('.popup'));

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

//Функция добавления карточки на страницу
const renderCard = (cardData, wrapElement) => {
  const element = createCards(cardData);
  wrapElement.prepend(element);
}

// функция обработчик нажатия на Esc (закрывает все попапы)
function handleKeyUp(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

// Функция обработчик на закрытие попапа кликом на оверлей ил на крестик
const handleClosePopupByClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

// функция добаления класса для попапа (открыть попап)
function openPopup(namePopupElement) {
  namePopupElement.classList.add('popup_is-opened');
  // Добавить Слушатель кнопки для закрытия ппопапа нажатием на Escape
  document.addEventListener('keyup', handleKeyUp);
}

// функция удаления класса для попапа (закрыть попап)
function closePopup(namePopupElement) {
  namePopupElement.classList.remove('popup_is-opened');
  // Удалить Слушатель кнопки для закрытия ппопапа нажатием на Escape
  document.removeEventListener('keyup', handleKeyUp);
}

// Функция открытия попапа редактирования профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupProfileElement);
}
// Функция добавления внесенной информации о профиле на страницу и закрытие попапа
function handlerFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfileElement);
}

// Функция открытия попапа добавления карточки на страницу
function openAddCardPopup () {
  cardFormElement.reset();
  disableButton(buttonElement);
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

//Слушатель клика на кнопку сохранение профиля
formElement.addEventListener('submit', handlerFormSubmitProfile);
//Слушатель кликов для попапа профиля
profileEditButtonElement.addEventListener('click', openProfilePopup);
// buttonClosePopupProfile.addEventListener('click', closePopup);

// Слушатель клика сохранения новой карточки
cardFormElement.addEventListener('submit', handleFormSubmitCard);
// Слушатель клика для попапа добавления карточек
buttonOpenPopupCard.addEventListener('click', () => openAddCardPopup(popupCardFormElement));
// buttonClosePopupCardForm.addEventListener('click', closePopup);

// Слушатель клика для закрытия картинки
// buttonClosePopupImage.addEventListener('click', closePopup);

// колбэк-функция для добавления карточек из массива
initialCards.forEach(function(cardData) {
  renderCard(cardData, cardsListElement);
});

popups.forEach((popup) => {
  // Добавить Слушатель на закрытие попапа кликом на оверлей и на крестик
  popup.addEventListener('click', handleClosePopupByClick)
});
