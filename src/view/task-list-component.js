import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(title, className) {
  const isTrash = className === "trash";
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

  constructor(title, status) {
    super();
    this.#title = title;
    this.#status = status;
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
}
