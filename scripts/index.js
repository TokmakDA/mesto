const popupProfileElement = document.querySelector('.popup_profile-form');
const bottonClosePopupProfile = popupProfileElement.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');
const formElement = popupProfileElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const cardsListElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const popupCardFormElement = document.querySelector('.popup_card-form');
const bottonClosePopupCardForm = popupCardFormElement.querySelector('.popup__close');
const buttonOpenPopupCard = profileInfo.querySelector('.profile__add-button');
const cardFormElement = popupCardFormElement.querySelector('.popup__form');
const placeNameInput = cardFormElement.querySelector('#place-name');
const placeLinkImageInput = cardFormElement.querySelector('#place-link-img');

const popupImageElement = document.querySelector('.popup_card-image');
const bottonClosePopupImage = popupImageElement.querySelector('.popup__close');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupTitleImage = popupImageElement.querySelector('.popup__title-image');

//Функция создания карточек
function createCards (item) {

  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.card__mane-card');
  const buttonDeleteCard = card.querySelector('.card__trash');
  const buttonLikeCard = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image');
  imageCard.src = item.link;
  cardName.textContent = imageCard.alt = item.name;

  // Обработчики кликов для кнопок лайка и удаления
  buttonDeleteCard.addEventListener('click', handleButtonDeleteCardClick);
  buttonLikeCard.addEventListener('click', handleButtonLikeCardClick);

  // Обработчики клика для открытия картинки
  imageCard.addEventListener('click', () => openImagePopup(item),);

  return card;
}
//Функция добавления карточки на страницу
const renderCard = (item, wrapElement) => {
  const element = createCards(item);
  wrapElement.prepend(element);
}

// функция добаления класса для попапа (открыть попап)
function openPopup(namePopup) {
  namePopup.classList.add('popup_is-opened');
}
// функция удаления класса для попапа (закрыть попап)
function closePopup(namePopup) {
  namePopup.classList.toggle('popup_is-opened');
}

// Функция открытия попапа редактирования профиля
function addProfilePopup(namePopup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(namePopup);
}
// Функция добавления внесенной информации о профиле на страницу и закрытие попапа
function handlerFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfileElement);
}

// Функция открытия попапа добавления карточки на страницу
function addCardPopup(namePopup) {
  placeNameInput.value = "";
  placeLinkImageInput.value = "";

  openPopup(namePopup);
}
// Функция добавления новой карточки из попап и закрытие попапа
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeLinkImageInput.value,
  }

  renderCard(card, cardsListElement);
  closePopup(popupCardFormElement);
}

// функция передающия данные при открытии попапа карточки
function openImagePopup (item) {
  popupImage.src = item.link;
  popupTitleImage.textContent = popupImage.alt = item.name;

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

//Обработчики клика на кнопку сохранение профиля
formElement.addEventListener('submit', handlerFormSubmitProfile);
//Обработчики кликов для попапа профиля
profileEditButtonElement.addEventListener('click', () => addProfilePopup(popupProfileElement));
bottonClosePopupProfile.addEventListener('click', () => closePopup(popupProfileElement));

// Обработчик клика сохранения новой карточки
cardFormElement.addEventListener('submit', handleFormSubmit);
// Обработчики клика для попапа добавления карточек
buttonOpenPopupCard.addEventListener('click', () => addCardPopup(popupCardFormElement));
bottonClosePopupCardForm.addEventListener('click', () => closePopup(popupCardFormElement));

// Обработчики клика для закрытия картинки
bottonClosePopupImage.addEventListener('click', () => closePopup(popupImageElement));

// колбэк-функция
initialCards.forEach(function(item) {
  renderCard(item, cardsListElement);
});
