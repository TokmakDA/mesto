import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

import {
  config,
  popupProfileElement,
  profileInfo,
  profileEditButtonElement,
  profileFormElement,
  nameInput,
  jobInput,
  popupCardFormElement,
  buttonOpenPopupCard,
  cardFormElement
} from '../utils/constants.js';

import { initialCards } from '../utils/initialCards.js';

const popupFormProfile = new PopupWithForm(
  '.popup_profile-form',
  handlerFormSubmitProfile
);
const popupFormCard = new PopupWithForm(
  '.popup_card-form',
  handleFormSubmitCard
);
const popupWithImage = new PopupWithImage(
  '.popup_card-image'
);
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserJob: '.profile__job',
});

// Функция открытия попапа редактирования профиля
const openProfilePopup = () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.userName;
  jobInput.value = profileInfo.userJob;

  //Открыть попап в формой редактирования профиля
  popupFormProfile.open();
}

// Функция добавления внесенной информации о профиле на страницу и закрытие попапа
function handlerFormSubmitProfile(inputValues) {
  userInfo.setUserInfo({
    userName: inputValues.profileName,
    userJob: inputValues.profileJob,
  });
}
const openFormCardPopup = () => {
  //отключаем кнопку, чтобы при повторном открытии карточки кнопка была неактивна
  validateFormCard.disableButton();
  //Открыть попап в формой добавления карточки
  popupFormCard.open();
}

// Функция добавления новой карточки из попап и закрытие попапа
function handleFormSubmitCard(inputValues) {
  const card = {
    name: inputValues.placeImageName,
    link: inputValues.placeImageLink,
  };
  section.addItem(addCard(card));
}

//Функция обработчик клика на карточку
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

//Функция создания новой карточки карточки
const addCard = (cardData) => {
  return new Card(
    cardData,
    '#card-template',
    handleCardClick
  ).createCard();
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(addCard(item));
    },
  },
  '.cards'
);

//добавление карточек из массива
section.renderItems();

//создаем экземпляр класса FormValidator форм добавления карточки
const validateFormCard = new FormValidator(config, cardFormElement);
// // включить валидацию форм добавления карточки
validateFormCard.enableValidation();

//создаем экземпляр класса FormValidator форм информации о Профиле
const validateFormProfile = new FormValidator(config, profileFormElement);
// включить валидацию форм информации о Профиле
validateFormProfile.enableValidation();


//включаем слушатели событий для Попапов
popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupWithImage.setEventListeners();

//Слушатель клика для аткрытия попапа профиля
profileEditButtonElement.addEventListener(
  'click', () => openProfilePopup()
);

// Слушатель клика для открытия попапа добавления карточек
buttonOpenPopupCard.addEventListener(
  'click', () => openFormCardPopup()
);
