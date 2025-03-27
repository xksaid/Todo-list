import { render, RenderPosition } from './framework/render.js'
import HeaderComponent from './view/header-component.js'
import AddTaskFormComponent from './view/add-task-form-component.js'
import BoardTaskComponent from './view/boardtask-component.js'
import TaskListComponent from './view/task-list-component.js'
import TaskComponent from './view/task-component.js'

const bodyContainer = document.querySelector('.page-body');
const addTaskContainer = document.querySelector('.add-new-task-component');
const deskContainer = document.querySelector('.main-content');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), addTaskContainer);
render(new BoardTaskComponent(), deskContainer);

const taskListContainer = document.querySelector(".tasks");

for (let i = 0; i < 4; i++) {
    const list = new TaskListComponent();

    render(list, taskListContainer);
    
    const taskContainer = list.getElement().querySelector(".task-container");

    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), taskContainer);
    }
}