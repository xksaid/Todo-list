import {createElement} from './render.js'; 


function createAddTaskFormComponentTemplate() {
    return (
        `<div class="new-task">
            <h1>Новая задача</h1>
            <div class="add-task">
                <input placeholder="Название задачи..." type="text">
                <button>十 Добавить</button>
            </div>
        </div>`
      );
}


export default class AddTaskFormComponent {
  getTemplate() {
    return createAddTaskFormComponentTemplate();
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
