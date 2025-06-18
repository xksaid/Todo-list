import { createElement } from "../framework/render.js";

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

export default class TaskItemComponent {
  constructor({ task }) {
    this.task = task;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
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
