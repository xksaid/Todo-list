import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(type, title) {
  return `<div class="${type}-section task-column">
      <h2 class="task-title">${title}</h2>
      <ul class="tasks-container">
      </ul>
      ${
        type === "trash"
          ? `<button
          type="button"
          class="clear-button"
          aria-label="Очистить корзину"
        >
          ✕ Очистить
        </button>`
          : ""
      }
    </div>`;
}

export default class TaskListComponent {
  constructor(type, title) {
    this.type = type;
    this.title = title;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.type, this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getTaskContainer() {
    return this.getElement().querySelector(".tasks-container");
  }

  removeElement() {
    this.element = null;
  }
}
