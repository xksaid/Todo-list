import HeaderComponent from "./view/header-component.js";
import TaskFormComponent from "./view/task-form-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from "./model/task-model.js";
import TasksApiService from "./tasks-api-service.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".taskboard");
const END_POINT = "https://685470ce6a6ef0ed662f1b34.mockapi.io";

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT),
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

const formAddTaskComponent = new TaskFormComponent({
  onClick: handleNewTaskButtonClick,
});

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init();
