import {createElement} from './render.js'; 


function createTaskListComponentTemplate() {
    return (
        `<div class="tasks">
            <h3>Название блока</h3>
            <ul class="task-container"></ul>
        </div>`
      );
}


export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
