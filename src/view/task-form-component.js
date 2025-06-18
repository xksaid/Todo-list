import { createElement } from "../framework/render.js";

function createTaskFormComponentTemplate() {
  return `
    <div class="task-wrapper">
      <p>Новая задача</p>
      <input type="text" placeholder="Название задачи..." />
      <button class="add-new-task-button">+ Добавить</button>
    </div>
  `;
}

export default class TaskFormComponent {
  getTemplate() {
    return createTaskFormComponentTemplate();
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
