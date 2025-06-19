import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskItemComponent from "../view/task-item-component.js";
import DeleteButton from "../view/delete-button.js";
import EmptyTaskListComponent from "../view/empty-task-list-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer;
  #tasksModel;
  #taskBoardComponent;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  init() {
    this.#renderBoard();
  }

  createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);
    document.querySelector("#add-task").value = "";
  }

  #renderBoard() {
    this.#taskBoardComponent = new TaskBoardComponent();
    render(this.#taskBoardComponent, this.#boardContainer);

    const allTasks = this.tasks;

    Object.values(Status).forEach(({ key, label }) => {
      const tasksInStatus = allTasks.filter((task) => task.status === key);

      if (key === Status.TRASH.key) {
        this.#renderTrashList(label, key, tasksInStatus);
      } else {
        this.#renderTasksList(label, key, tasksInStatus);
      }
    });
  }

  #renderTasksList(label, statusKey, tasks) {
    this.#renderTaskList(label, statusKey, tasks);
  }

  #renderTrashList(label, statusKey, tasks) {
    const taskListComponent = this.#renderTaskList(label, statusKey, tasks);
    const deleteButton = new DeleteButton();

    render(deleteButton, taskListComponent.element);
    const buttonElement = deleteButton.element;

    const updateButtonVisibility = () => {
      const updatedTasks = this.#tasksModel.getTasksByStatus(statusKey);
      if (updatedTasks.length === 0) {
        buttonElement.style.display = "none";
      } else {
        buttonElement.style.display = "block";
      }
    };

    updateButtonVisibility();

    buttonElement.addEventListener("click", () => {
      this.#tasksModel.deleteTasksByStatus(statusKey);
      updateButtonVisibility();
    });
  }

  #renderTaskList(label, statusKey, tasks) {
    const taskListComponent = new TaskListComponent(label, statusKey);
    render(
      taskListComponent,
      this.#taskBoardComponent.element.querySelector(".task-list")
    );

    const taskListContainer =
      taskListComponent.element.querySelector(".task-list");

    if (tasks.length === 0) {
      this.#renderEmptyStub(taskListContainer);
    } else {
      tasks.forEach((task) => {
        this.#renderTask(task, taskListContainer);
      });
    }

    return taskListComponent;
  }

  #renderTask(task, container) {
    const taskComponent = new TaskItemComponent({ task });
    render(taskComponent, container);
  }

  #renderEmptyStub(container) {
    const emptyStubComponent = new EmptyTaskListComponent();
    render(emptyStubComponent, container);
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = "";
  }
}
