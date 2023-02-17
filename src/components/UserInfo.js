export class UserInfo {
  static Selectors = {
    selectorUserName: '.profile__name',
    selectorUserJob: '.profile__job',
    selectorUserAvatar: '.profile__avatar-image',
  }
  constructor() {
    this._profileName = document.querySelector(`${UserInfo.Selectors.selectorUserName}`);
    this._profileJob = document.querySelector(`${UserInfo.Selectors.selectorUserJob}`);
    this._profileAvatar = document.querySelector(`${UserInfo.Selectors.selectorUserAvatar}`);
  }

  //получаем данные о пользователе с верстки
  getUserInfo() {
    const userInfo = {};
    userInfo.userName = this._profileName.textContent;
    userInfo.userJob = this._profileJob.textContent;
    return userInfo;
  }

  // устанавливаем данные о пользователе в верстку
  setUserInfo({ userName, userJob }) {
    this._profileName.textContent = userName;
    this._profileJob.textContent = userJob;
  }

  // устанавливаем аватар в верстку
  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }
}
