import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class DeleteButton extends AbstractComponent {
  get template() {
    return `<button class="clear-trash-button">✕ Очистить</button>`;
  }
}
