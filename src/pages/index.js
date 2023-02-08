import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';



// Массив карточек
const initialCards = [
  {
    name: 'Калининград',
    link: './images/Kalinigrad.jpeg',
  },
  {
    name: 'Санкт-Петербург',
    link: './images/St_Petersburg.jpeg',
  },
  {
    name: 'Нижний Новгород',
    link: './images/NizhnyNovgorod.jpeg',
  },
  {
    name: 'Дюкинский карьер',
    link: './images/DukinQuarry.jpeg',
  },
  {
    name: 'Владимир',
    link: './images/Vladimir-Russian-village.jpeg',
  },
  {
    name: 'Выборг',
    link: './images/Vyborg.jpeg',
  },
];

// Конфигуратор для валидации форм
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
const popupCardFormElement = document.querySelector('.popup_card-form');
const buttonOpenPopupCard = profileInfo.querySelector('.profile__add-button');
const cardFormElement = popupCardFormElement.querySelector('.popup__form');
const placeNameInput = cardFormElement.querySelector('#place-image-name');
const placeLinkImageInput = cardFormElement.querySelector('#place-image-link');

// const popupImageElement = document.querySelector('.popup_card-image');
// const popupImage = popupImageElement.querySelector('.popup__image');
// const opupTitleImage = popupImageElement.querySelector('.popup__title-image');

const popupFormProfile = new PopupWithForm('.popup_profile-form',);
const popupFormCard = new PopupWithForm('.popup_card-form', handleFormSubmitCard);
const popupWithImage = new PopupWithImage('.popup_card-image');

// функция обработчик нажатия на Esc (закрывает все попапы)
// function handleKeyUp(evt) {
//   if (evt.key === 'Escape') {
//     const popupIsOpened = document.querySelector('.popup_is-opened');
//     closePopup(popupIsOpened);
//   }
// }

// // Функция обработчик на закрытие попапа кликом на оверлей ил на крестик
// const handleClosePopupByClick = (evt) => {
//   if (
//     evt.target === evt.currentTarget ||
//     evt.target.classList.contains('popup__close')
//   ) {
//     closePopup(evt.currentTarget);
//   }
// };

// // функция добаления класса для попапа (открыть попап)
// function openPopup(namePopupElement) {
//   namePopupElement.classList.add('popup_is-opened');
//   // Добавить Слушатель кнопки для закрытия ппопапа нажатием на Escape
//   document.addEventListener('keyup', handleKeyUp);
// }

// // функция удаления класса для попапа (закрыть попап)
// function closePopup(namePopupElement) {
//   namePopupElement.classList.remove('popup_is-opened');
//   // Удалить Слушатель кнопки для закрытия ппопапа нажатием на Escape
//   document.removeEventListener('keyup', handleKeyUp);
// }

// Функция открытия попапа редактирования профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  //Открыть попап в формой редактирования профиля
  popupFormProfile.open();
}

// Функция добавления внесенной информации о профиле на страницу и закрытие попапа
function handlerFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupFormProfile.close();
}

// // Функция открытия попапа добавления карточки на страницу
// function openAddCardPopup() {
//   // cardFormElement.reset();

//   //Открыть попап в формой добавления карточки
//   popupFormCard.open();
// }

// Функция добавления новой карточки из попап и закрытие попапа
function handleFormSubmitCard(inputValues) {
  const card = {
    name: inputValues.placeImageName,
    link: inputValues.placeImageLink,
  };
  section.addItem(addCard(card));
};

//Функция обработчик клика на карточку
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

//Функция создания новой карточки карточки
const addCard = (cardData) => {
  return new Card(
    cardData,
    '#card-template',
    handleCardClick,
  ).createCard();
};

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(addCard(item))
  }
}, '.cards');

section.renderItems();

// //Функция добавления карточки на страницу
// const renderCard = (cardData, wrapElement) => {
//   wrapElement.prepend(addCard(cardData));
// };

// // колбэк-функция для добавления карточек из массива
// initialCards.forEach(function (cardData) {
//   renderCard(cardData, cardsListElement);
// });

//создаем экземпляр класса FormValidator с вызовом метода запуска валидации
const validateForm = (config, formElement) => {
  return new FormValidator(config, formElement).enableValidation();
};
// включить валидацию форм профиля
validateForm(config, profileFormElement);
// включить валидацию форм карточки
validateForm(config, cardFormElement);

//Слушатель клика на кнопку сохранение профиля
profileFormElement.addEventListener('submit', handlerFormSubmitProfile);
//Слушатель кликов для попапа профиля
profileEditButtonElement.addEventListener('click', openProfilePopup);

// Слушатель клика для открытия попапа добавления карточек
buttonOpenPopupCard.addEventListener('click', () => popupFormCard.open());

