export class UserInfo {
  constructor({ selectorUserName, selectorUserJob }) {
    this._profileName = document.querySelector(`${selectorUserName}`);
    this._profileJob = document.querySelector(`${selectorUserJob}`);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.userName = this._profileName.textContent;
    userInfo.userJob = this._profileJob.textContent;
    return userInfo;
  }

  setUserInfo({ userName, userJob }) {
    this._profileName.textContent = userName;
    this._profileJob.textContent = userJob;
  }
}
