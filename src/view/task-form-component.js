import { createElement } from "../framework/render.js";

function createTaskFormComponentTemplate() {
  return `<form class="task-wrapper">
      <label for="new-task">Новая задача</label>
      <input
        type="text"
        id="new-task"
        name="new-task"
        placeholder="Название задачи..."
        required
      />
      <button type="submit" class="add-new-task-button">
        <span class="plus-icon">+</span> Добавить
      </button>
    </form>`;
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
