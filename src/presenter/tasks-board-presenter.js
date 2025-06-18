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
  }

  init() {
    this.#taskBoardComponent = new TaskBoardComponent();
    render(this.#taskBoardComponent, this.#boardContainer);
    this.#renderBoard();
  }

  #renderBoard() {
    const allTasks = this.#tasksModel.tasks;

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
    render(new DeleteButton(), taskListComponent.element);
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
}
