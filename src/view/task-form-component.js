import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskFormComponentTemplate() {
  return `
    <div class="task-wrapper">
      <p>Новая задача</p>
      <input type="text" id="add-task" placeholder="Название задачи..." />
      <button class="add-new-task-button">+ Добавить</button>
    </div>
  `;
}

export default class TaskFormComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element
      .querySelector(".add-new-task-button")
      .addEventListener("click", this.#clickHandler);
  }

  get template() {
    return createTaskFormComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
