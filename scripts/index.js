const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupSaveButtonElement = popupElement.querySelector('.popup__submit');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__job');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

const addPopup = function() {
  popupElement.classList.add('popup_is-opened');
}

const removePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

profileEditButtonElement.addEventListener('click' , addPopup);
popupCloseButtonElement.addEventListener('click' , removePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    removePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
