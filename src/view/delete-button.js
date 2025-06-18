import { createElement } from "../framework/render.js";

export default class DeleteButton {
  getTemplate() {
    return `<button class="clear-trash-button">✕ Очистить</button>`;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
