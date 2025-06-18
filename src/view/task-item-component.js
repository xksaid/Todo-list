import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  const { title, status } = task;
  return `
    <li class="task-item task--${status}">
      <div class="task__content">
        <p class="task__view">${title}</p>
      </div>
      <button aria-label="Изменить" class="task__edit" type="button">&nbsp;</button>
    </li>
  `;
}

export default class TaskItemComponent extends AbstractComponent {
  #task;

  constructor({ task }) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  get task() {
    return this.#task;
  }
}
