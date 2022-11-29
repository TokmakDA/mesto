const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile');
const profileEditButtonElement = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

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


// 5 спринт
// Массив карочек
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

const cardsListElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCards (item) {

  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.card__mane-card');
  const cardDeleteButton = card.querySelector('.card__trash');
  const cardLikeButton = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image');
  imageCard.src = item.link;
  imageCard.alt = cardName.textContent =  item.name;

  // Обработчики кликов для кнопок лайка и удаления
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);
  cardLikeButton.addEventListener('click', handleCardLikeButtonClick);

  return card;
}

const handleCardLikeButtonClick = (e) => {
  e.target.classList.toggle('card__like-button_active');
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.card').remove()
}

const renderCard = (item, wrapElement) => {
  const element = createCards(item);
  wrapElement.append(element);
}

initialCards.forEach(function(item) {
  renderCard(item, cardsListElement);
});

