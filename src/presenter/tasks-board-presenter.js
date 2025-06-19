import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskItemComponent from "../view/task-item-component.js";
import DeleteButton from "../view/delete-button.js";
import EmptyTaskListComponent from "../view/empty-task-list-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { render } from "../framework/render.js";
import { Status, UpdateType } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer;
  #tasksModel;
  #taskBoardComponent;
  #resetButtonComponent;
  #loadingComponent;

  constructor({ boardContainer, tasksModel, resetButtonComponent = null }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#resetButtonComponent = resetButtonComponent;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  async init() {
    this.#loadingComponent = new LoadingViewComponent();
    render(this.#loadingComponent, this.#boardContainer);
    await this.#tasksModel.init();
    this.#loadingComponent.element.remove();
    this.#renderBoard();
  }

  async createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector("#add-task").value = "";
    } catch (err) {
      // Ошибка обработана, но вывод в консоль убран
    }
  }

  #renderBoard() {
    this.#taskBoardComponent = new TaskBoardComponent();
    render(this.#taskBoardComponent, this.#boardContainer);
    const allTasks = this.tasks;
    Object.values(Status).forEach(({ key, label }) => {
      const tasksByStatus = allTasks.filter((task) => task.status === key);
      if (key === Status.TRASH.key) {
        this.#renderTrashList(label, key, tasksByStatus);
      } else {
        this.#renderTasksList(label, key, tasksByStatus);
      }
    });
    if (this.#resetButtonComponent) {
      this.#resetButtonComponent.toggleDisabled(
        !this.#tasksModel.hasBasketTasks()
      );
    }
  }

  #renderTasksList(label, statusKey, tasks) {
    this.#renderTaskList(label, statusKey, tasks);
  }

  #renderTrashList(label, statusKey, tasks) {
    const taskListComponent = this.#renderTaskList(label, statusKey, tasks);
    const deleteButton = new DeleteButton();
    render(deleteButton, taskListComponent.element);
    const btnEl = deleteButton.element;
    const updateVisibility = () => {
      btnEl.style.display = this.#tasksModel.getTasksByStatus(statusKey).length
        ? "block"
        : "none";
    };
    updateVisibility();
    btnEl.addEventListener("click", async () => {
      await this.#handleClearBasketClick();
      updateVisibility();
    });
  }

  #renderTaskList(label, statusKey, tasks) {
    const listComponent = new TaskListComponent({
      title: label,
      status: statusKey,
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    render(
      listComponent,
      this.#taskBoardComponent.element.querySelector(".task-list")
    );
    const container = listComponent.element.querySelector(".task-list");
    if (tasks.length === 0) {
      this.#renderEmptyStub(container);
    } else {
      tasks.forEach((task) => this.#renderTask(task, container));
    }
    return listComponent;
  }

  #renderTask(task, container) {
    const taskComponent = new TaskItemComponent({ task });
    render(taskComponent, container);
  }

  #renderEmptyStub(container) {
    const stub = new EmptyTaskListComponent();
    render(stub, container);
  }

  #handleModelEvent(updateType, payload) {
    switch (updateType) {
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
      case UpdateType.UPDATE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
      default:
        return;
    }
  }

  #clearBoard() {
    if (this.#taskBoardComponent) {
      this.#taskBoardComponent.element.innerHTML = "";
    }
  }

  async #handleTaskDrop(taskId, newStatus, targetTaskId = null) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
      this.#tasksModel.moveTaskTo(taskId, newStatus, targetTaskId);
    } catch (err) {}
  }

  async #handleClearBasketClick() {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {}
  }
}
