// Массив карточек
export const initialCards = [
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
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const popupProfileElement = document.querySelector(
  '.popup_profile-form'
);
export const profileInfo = document.querySelector('.profile');
export const profileEditButtonElement = profileInfo.querySelector(
  '.profile__edit-button'
);

export const profileFormElement =
  popupProfileElement.querySelector('.popup__form');
export const nameInput = profileFormElement.querySelector('#profile-name');
export const jobInput = profileFormElement.querySelector('#profile-job');

export const popupCardFormElement = document.querySelector('.popup_card-form');
export const buttonOpenPopupCard = profileInfo.querySelector(
  '.profile__add-button'
);
export const cardFormElement =
  popupCardFormElement.querySelector('.popup__form');
