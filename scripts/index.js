import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Массив карточек
const initialCards = [
  {
    name: 'Калининград',
    link: './images/Kalinigrad.jpeg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/St_Petersburg.jpeg'
  },
  {
    name: 'Нижний Новгород',
    link: './images/NizhnyNovgorod.jpeg'
  },
  {
    name: 'Дюкинский карьер',
    link: './images/DukinQuarry.jpeg'
  },
  {
    name: 'Владимир',
    link: './images/Vladimir-Russian-village.jpeg'
  },
  {
    name: 'Выборг',
    link: './images/Vyborg.jpeg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


const popupProfileElement = document.querySelector('.popup_profile-form');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('#profile-name');
const jobInput = profileFormElement.querySelector('#profile-job');

const cardsListElement = document.querySelector('.cards');
// const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const popupCardFormElement = document.querySelector('.popup_card-form');
const buttonOpenPopupCard = profileInfo.querySelector('.profile__add-button');
const cardFormElement = popupCardFormElement.querySelector('.popup__form');
const placeNameInput = cardFormElement.querySelector('#place-name');
const placeLinkImageInput = cardFormElement.querySelector('#place-link-img');
const buttonElementCardForm = cardFormElement.querySelector('.popup__button')

// const popupImageElement = document.querySelector('.popup_card-image');
// const popupImage = popupImageElement.querySelector('.popup__image');
// const popupTitleImage = popupImageElement.querySelector('.popup__title-image');

//массив попапов
const popups = Array.from(document.querySelectorAll('.popup'));

// //Функция создания карточек
// function createCards (cardData) {

//   const card = cardTemplate.cloneNode(true);
//   const cardName = card.querySelector('.card__mane-card');
//   const buttonDeleteCard = card.querySelector('.card__trash');
//   const buttonLikeCard = card.querySelector('.card__like-button');
//   const imageCard = card.querySelector('.card__image');
//   imageCard.src = cardData.link;
//   cardName.textContent = imageCard.alt = cardData.name;

//   // Слушатели кликов для кнопок лайка и удаления
//   buttonDeleteCard.addEventListener('click', handleButtonDeleteCardClick);
//   buttonLikeCard.addEventListener('click', handleButtonLikeCardClick);

//   // Слушатель клика для открытия картинки
//   imageCard.addEventListener('click', () => openImagePopup(cardData));

//   return card;
// }

// //Функция добавления карточки на страницу
// const renderCard = (cardData, wrapElement) => {
//   const element = createCards(cardData);
//   wrapElement.prepend(element);
// }

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
  validateForm(config, profileFormElement);

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
  validateForm(config, cardFormElement);
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

// // функция передающия данные при открытии попапа карточки
// function openImagePopup (cardData) {
//   popupImage.src = cardData.link;
//   popupTitleImage.textContent = popupImage.alt = cardData.name;

//   openPopup(popupImageElement);
// }

// // Функция обработчик для лайка карточки
// const handleButtonLikeCardClick = (evt) => {
//   evt.target.classList.toggle('card__like-button_active');
// }
// // Функция обработчик для удаления карточки
// const handleButtonDeleteCardClick = (evt) => {
//   evt.target.closest('.card').remove();
// }

//Слушатель клика на кнопку сохранение профиля
profileFormElement.addEventListener('submit', handlerFormSubmitProfile);
//Слушатель кликов для попапа профиля
profileEditButtonElement.addEventListener('click', openProfilePopup);

// Слушатель клика сохранения новой карточки
cardFormElement.addEventListener('submit', handleFormSubmitCard);
// Слушатель клика для открытия попапа добавления карточек
buttonOpenPopupCard.addEventListener('click', () => openAddCardPopup(popupCardFormElement));


//Функция создания новой карточки карточки
const addCard = (cardData) => {
  return  new Card(cardData, '#card-template').createCard();
}

//Функция добавления карточки на страницу
const renderCard = (cardData, wrapElement) => {
  wrapElement.prepend(addCard(cardData));
}

// колбэк-функция для добавления карточек из массива
initialCards.forEach(function(cardData) {
  renderCard(cardData, cardsListElement);
});

popups.forEach((popup) => {
  // Добавить Слушатель на закрытие попапа кликом на оверлей и на крестик
  popup.addEventListener('click', handleClosePopupByClick)
});

const validateForm = (config, formElement) => {
  return new FormValidator(config, formElement).enableValidation();
}

export default openPopup;
