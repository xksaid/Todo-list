import {createElement} from './render.js'; 


function createBoardTaskComponentTemplate() {
    return (
        `<div class="tasks"></div>`
      );
}


export default class BoardTaskComponent {
  getTemplate() {
    return createBoardTaskComponentTemplate();
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
