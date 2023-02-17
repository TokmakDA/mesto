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
export const avatarEditButtonElement = profileInfo.querySelector(
  '.profile__avatar-edit-buttom'
);

export const profileFormElement =
  popupProfileElement.querySelector('.popup__form');
export const nameInput = profileFormElement.querySelector('#profile-name');
export const jobInput = profileFormElement.querySelector('#profile-job');

export const popupAvatarElement = document.querySelector('.popup_profile-avatar-form');
export const avatarFormElement = popupAvatarElement.querySelector('.popup__form')

export const popupCardFormElement = document.querySelector('.popup_card-form');
export const buttonOpenPopupCard = profileInfo.querySelector(
  '.profile__add-button'
);
export const cardFormElement =
  popupCardFormElement.querySelector('.popup__form');
