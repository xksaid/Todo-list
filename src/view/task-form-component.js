import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskFormComponentTemplate() {
  return `
    <div class="task-wrapper">
      <p>Новая задача</p>
      <input type="text" placeholder="Название задачи..." />
      <button class="add-new-task-button">+ Добавить</button>
    </div>
  `;
}

export default class TaskFormComponent extends AbstractComponent {
  get template() {
    return createTaskFormComponentTemplate();
  }
}
