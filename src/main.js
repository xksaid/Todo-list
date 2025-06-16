import HeaderComponent from "./view/header-component.js";
import TaskFormComponent from "./view/task-form-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskComponent from "./view/task-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyElement = document.querySelector(".board-app");
const mainElement = document.querySelector(".board-app__main");
const addTaskSection = document.querySelector(".add-task");
const taskboardSection = document.querySelector(".taskboard");

const headerComponent = new HeaderComponent();
render(headerComponent, mainElement, RenderPosition.BEFOREBEGIN);

const taskFormComponent = new TaskFormComponent();
render(taskFormComponent, addTaskSection);

const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, taskboardSection);

const backlogTasks = ["Выучить JS", "Выучить React", "Сделать домашку"];
const progressTasks = ["Выпить смузи", "Попить воды"];
const readyTasks = ["Позвонить маме", "Погладить кота"];
const trashTasks = ["Сходить погулять", "Прочитать Войну и Мир"];

const taskBoardElement = taskBoardComponent.getElement();

const backlogContainer = taskBoardElement.querySelector(
  ".backlog-section .tasks-container"
);
const progressContainer = taskBoardElement.querySelector(
  ".progress-section .tasks-container"
);
const readyContainer = taskBoardElement.querySelector(
  ".ready-section .tasks-container"
);
const trashContainer = taskBoardElement.querySelector(
  ".trash-section .tasks-container"
);

backlogTasks.forEach((taskText) => {
  const taskComponent = new TaskComponent(taskText);
  render(taskComponent, backlogContainer);
});

progressTasks.forEach((taskText) => {
  const taskComponent = new TaskComponent(taskText);
  render(taskComponent, progressContainer);
});

readyTasks.forEach((taskText) => {
  const taskComponent = new TaskComponent(taskText);
  render(taskComponent, readyContainer);
});

trashTasks.forEach((taskText) => {
  const taskComponent = new TaskComponent(taskText);
  render(taskComponent, trashContainer);
});
