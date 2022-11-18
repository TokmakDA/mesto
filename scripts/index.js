const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector(
  '.profile__edit-button'
);
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__job');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

function addPopup() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function removePopup() {
  popupElement.classList.remove('popup_is-opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

profileEditButtonElement.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);
