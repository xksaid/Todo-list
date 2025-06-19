import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(title, className) {
  return `
    <li class="task-column ${className}">
      <span class="task-title">${title}</span>
      <ul class="task-list"></ul> 
    </li>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  #title;
  #status;

  constructor({ title, status, onTaskDrop }) {
    super();
    this.#title = title;
    this.#status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }

  get title() {
    return this.#title;
  }

  get status() {
    return this.#status;
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element.querySelector(".task-list");

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    container.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");

      const targetTask = event.target.closest(".task-item");
      const targetTaskId = targetTask?.dataset?.id || null;

      onTaskDrop(taskId, this.#status, targetTaskId);
    });
  }
}
