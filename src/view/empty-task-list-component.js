import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class EmptyTaskListComponent extends AbstractComponent {
  get template() {
    return `<p class="task-list__empty">Перетащите карточку</p>`;
  }
}
