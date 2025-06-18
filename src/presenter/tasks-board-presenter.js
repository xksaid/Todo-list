import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskItemComponent from "../view/task-item-component.js";
import DeleteButton from "../view/delete-button.js";
import { render } from "../framework/render.js";
import { tasksModel } from "../model/task-model.js";
import { Status } from "../const.js";

export default class TasksBoardPresenter {
  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    const taskBoardComponent = new TaskBoardComponent();
    render(taskBoardComponent, this.boardContainer);

    const allTasks = this.tasksModel.getTasks();

    Object.values(Status).forEach(({ key, label }) => {
      const tasksInStatus = allTasks.filter((task) => task.status === key);
      const taskListComponent = new TaskListComponent(label, key);
      render(
        taskListComponent,
        taskBoardComponent.getElement().querySelector(".task-list")
      );

      const taskListContainer = taskListComponent
        .getElement()
        .querySelector(".task-list");

      tasksInStatus.forEach((task) => {
        const taskItemComponent = new TaskItemComponent({ task });
        render(taskItemComponent, taskListContainer);
      });

      if (key === Status.TRASH.key) {
        render(new DeleteButton(), taskListComponent.getElement());
      }
    });
  }
}
