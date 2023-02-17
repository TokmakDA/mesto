import { UserInfo } from "./UserInfo";

export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(`${containerSelector}`);
  }

  // Рендеринг элементов
  renderItems(items, userInfo) {
    items.forEach((item) => {
      this._renderer(item, userInfo);
    });
  }

  // Добавить элемент в разметку
  addItem(element) {
    this._container.append(element);
  }

  // Добавить элемент в разметку
  addItemPrepend(element) {
    this._container.prepend(element);
  }
}
