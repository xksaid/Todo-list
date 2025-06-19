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
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  get task() {
    return this.#task;
  }

  #afterCreateElement() {
    this.element.setAttribute("draggable", true);
    this.element.dataset.id = this.#task.id;

    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.#task.id);
    });

    this.element.addEventListener("dragenter", (event) => {
      event.preventDefault();
      this.element.classList.add("drag-over");
    });

    this.element.addEventListener("dragleave", () => {
      this.element.classList.remove("drag-over");
    });
  }
}
