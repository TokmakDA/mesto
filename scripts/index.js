const popupElements = document.querySelectorAll('.popup');

const popupProfileElement = document.querySelector('.popup_profile-form');
const popupCloseButtonElement = popupProfileElement.querySelector('.popup__close');
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
const popupCardFormCloseButtonElement = popupCardFormElement.querySelector('.popup__close');
const addButtonCardElement = profileInfo.querySelector('.profile__add-button');
const cardFormElement = popupCardFormElement.querySelector('.popup__form');
const placeNameInput = cardFormElement.querySelector('#place-name');
const placeLinkImageInput = cardFormElement.querySelector('#place-link-img');

const popupImageElement = document.querySelector('.popup_card-image');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupTitleImage = popupImageElement.querySelector('.popup__title-image');

//Функция создания карточек
function createCards (item) {

  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.card__mane-card');
  const cardDeleteButton = card.querySelector('.card__trash');
  const cardLikeButton = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image');
  imageCard.src = item.link;
  cardName.textContent = imageCard.alt = item.name;

  // Обработчики кликов для кнопок лайка и удаления
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);
  cardLikeButton.addEventListener('click', handleCardLikeButtonClick);

  // Обработчики клика для открытия картинки
  imageCard.addEventListener('click', () => openImagePopup(item),);

  return card;
}

// функция переключения класса для попапа (открыть-закрыть)
function togglePopup(index) {
  popupElements[index].classList.toggle('popup_is-opened');
}

// функция передающия данные при открытии попапа карточки
function openImagePopup (item) {
  popupImage.src = item.link;
  popupTitleImage.textContent = popupImage.alt = item.name;

  togglePopup(2);
}

// Функция обработчик нажатия на лайк
const handleCardLikeButtonClick = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
}
// Функция обработчик удаления карточки
const handleDeleteButtonClick = (evt) => {
  evt.target.closest('.card').remove();
}

//Функция добавления карточки на страницу
const renderCard = (item, wrapElement) => {
  const element = createCards(item);
  wrapElement.prepend(element);
}

// колбэк-функция
initialCards.forEach(function(item) {
  renderCard(item, cardsListElement);
});

// Функция добавления ифнормации новой карточки из попап
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeLinkImageInput.value,
  }

  renderCard(card, cardsListElement);
  togglePopup(1);
}

// Функция открытия попапа редактирования профиля
function addProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  togglePopup(0);
}

// Функция сохранения внесенной информации о профиле
function handlerFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(0);
}

//Обработчики клика на кнопку сохранение профиля
formElement.addEventListener('submit', handlerFormSubmitProfile);
//Обработчики кликов для попапа профиля
profileEditButtonElement.addEventListener('click', addProfilePopup);
popupCloseButtonElement.addEventListener('click', () => togglePopup(0));

// Обработчик клика сохранения новой карточки
cardFormElement.addEventListener('submit', handleFormSubmit);
// Обработчики клика для попапа добавления карточек
addButtonCardElement.addEventListener('click', () => togglePopup(1));
popupCardFormCloseButtonElement.addEventListener('click', () => togglePopup(1));

// Обработчики клика для закрытия картинки
popupImageCloseButtonElement.addEventListener('click', () => togglePopup(2));
