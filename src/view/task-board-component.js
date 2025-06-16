import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate() {
  return `<div class="task-sections">
      <div class="backlog-section task-column">
        <h2 class="task-title">Бэклог</h2>
        <ul class="tasks-container">
        </ul>
      </div>

      <div class="progress-section task-column">
        <h2 class="task-title">В процессе</h2>
        <ul class="tasks-container">
        </ul>
      </div>

      <div class="ready-section task-column">
        <h2 class="task-title">Готово</h2>
        <ul class="tasks-container">
        </ul>
      </div>

      <div class="trash-section task-column">
        <h2 class="task-title">Корзина</h2>
        <ul class="tasks-container">
        </ul>
        <button
          type="button"
          class="clear-button"
          aria-label="Очистить корзину"
        >
          ✕ Очистить
        </button>
      </div>
    </div>`;
}

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponentTemplate();
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
