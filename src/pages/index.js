import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

import {
  config,
  popupProfileElement,
  profileInfo,
  profileEditButtonElement,
  avatarEditButtonElement,
  profileFormElement,
  nameInput,
  jobInput,
  popupAvatarElement,
  avatarFormElement,
  popupCardFormElement,
  buttonOpenPopupCard,
  cardFormElement
} from '../utils/constants.js';

const popupFormProfile = new PopupWithForm(
  '.popup_profile-form',
  handlerFormSubmitProfile
);

const popupFormAvarar = new PopupWithForm(
  '.popup_profile-avatar-form',
  handlerFormSubmitAvatar
);

const popupFormCard = new PopupWithForm(
  '.popup_card-form',
  handleFormSubmitCard
);

const popupWithImage = new PopupWithImage(
  '.popup_card-image'
);

const popupDeleteCard = new PopupDeleteCard(
  '.popup_delete-card-form',
  handleDeleteCardSubmit
);

const userInfo = new UserInfo();

// Функция открытия попапа редактирования профиля
const openProfilePopup = () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.userName;
  jobInput.value = profileInfo.userJob;

  // Открыть попап в формой редактирования профиля
  popupFormProfile.open();
};

// Функция добавления внесенной информации о профиле на страницу и закрытие попапа
function handlerFormSubmitProfile(inputValues) {
  popupFormProfile.renderLoading(true);
  api.patchUserInfo(inputValues.profileName, inputValues.profileJob)
    .then(result => {
      userInfo.setUserInfo({
        userName: result.name,
        userJob: result.about
      })
    })
    .then(() => popupFormProfile.close())
    .catch((err) => console.log(err))
    .finally(() => popupFormProfile.renderLoading(false));
};

function handlerFormSubmitAvatar(inputValues) {
  popupFormAvarar.renderLoading(true);
  api.patchUserAvatar(inputValues.profileAvatarLink)
    .then(result => {
      userInfo.setUserAvatar(result.avatar)
    })
    .then(() => popupFormAvarar.close())
    .catch((err) => console.log(err))
    .finally(() => popupFormAvarar.renderLoading(false));
};

const openFormCardPopup = () => {
  // отключаем кнопку, чтобы при повторном открытии карточки кнопка была неактивна
  validateFormCard.disableButton();
  // Открыть попап в формой добавления карточки
  popupFormCard.open();
};

// Функция добавления новой карточки из попап и закрытие попапа
function handleFormSubmitCard(inputValues) {
  const card = {
    name: inputValues.placeImageName,
    link: inputValues.placeImageLink,
  };
  popupFormCard.renderLoading(true);
  api.postNewCard(card)
    .then(result => {
      section.addItemPrepend(addCard(result))
    })
    .then(() => popupFormCard.close())
    .catch((err) => console.log(err))
    .finally(() => popupFormCard.renderLoading(false));
};

// нажатие на кнопку для удаления карточки
const handleButtonDeleteCardClick = (cardElement, cardId) => {
  popupDeleteCard.open(cardElement, cardId)
};
// удаление картинки
function handleDeleteCardSubmit(cardElement, cardId) {
  popupDeleteCard.renderLoading(true);
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      cardElement = null
    })
    .then(() => popupDeleteCard.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.renderLoading(false);
      popupDeleteCard.close()
    });
};

// Функция обработчик клика на карточку
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

// Обработчик лайка карточек
const handleButtonLikeCardClick = (cardId, buttonLikeCard, likesCardQuantity) => {
  if (buttonLikeCard.classList.contains('card__like-button_active')) {
    api.deleteLikeCard(cardId)
      .then(result => {
        buttonLikeCard.classList.remove('card__like-button_active');
        likesCardQuantity.textContent = result.likes.length;
      })
      .catch((err) => console.log(err));
  }
  else {
    api.addLikeCard(cardId)
      .then(result => {
        buttonLikeCard.classList.add('card__like-button_active');
        likesCardQuantity.textContent = result.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

// Функция создания новой карточки карточки
const addCard = (cardData) => {
  return new Card(
    cardData,
    myId,
    '#card-template',
    handleCardClick,
    handleButtonDeleteCardClick,
    handleButtonLikeCardClick
  ).createCard();
};

const section = new Section(
  {
    renderer: (item) => {
      section.addItem(addCard(item));
    },
  },
  '.cards'
);

// создаем экземпляр класса FormValidator форм добавления карточки
const validateFormCard = new FormValidator(config, cardFormElement);
// вызываем валидацию форм добавления карточки
validateFormCard.enableValidation();

// создаем экземпляр класса FormValidator форм информации о Профиле
const validateFormProfile = new FormValidator(config, profileFormElement);
// вызываем валидацию форм информации о Профиле
validateFormProfile.enableValidation();

// создаем экземпляр класса FormValidator форм информации о Профиле
const validateFormAvatar = new FormValidator(config, avatarFormElement);
// вызываем валидацию форм информации о Профиле
validateFormAvatar.enableValidation();

// вызываем слушатели событий для Попапов
popupFormProfile.setEventListeners();
popupFormAvarar.setEventListeners();
popupFormCard.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();


// Слушатель клика для аткрытия попапа профиля
profileEditButtonElement.addEventListener(
  'click', () => openProfilePopup()
);

// Слушатель клика для открытия попапа добавления карточек
buttonOpenPopupCard.addEventListener(
  'click', () => openFormCardPopup()
);
avatarEditButtonElement.addEventListener(
  'click', () => popupFormAvarar.open()
);

// Класс Апи с моими данными
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '0fac7cb1-5a97-4e4b-9bc6-bcf4a65057a3',
    'Content-Type': 'application/json',
  }
});

let myId = '';
api.getInitialsData()
  .then(result => {
    // сохраняем наш ID в переменну
    myId = result[0]._id;
    // Выгружаем информацию о пользователе на страницу
    userInfo.setUserInfo({
      userName: result[0].name,
      userJob: result[0].about
    });
    // Выгружаем Аватар на страницу
    userInfo.setUserAvatar(result[0].avatar);
    // запускаем рендер карточек с сервера
    section.renderItems(result[1]);
  }
  )
  .catch((err) => console.log(err));
