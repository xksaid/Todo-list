import Observable from "../framework/observable.js";
import { generateID } from "../utils.js";
import { UpdateType, UserAction, Status } from "../const.js";

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateID(),
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UpdateType.MINOR, createdTask);
      return createdTask;
    } catch (err) {
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task && task.status !== newStatus) {
      const previousStatus = task.status;

      try {
        task.status = newStatus;

        await this.#tasksApiService.updateTask({
          id: taskId,
          status: newStatus,
        });

        this._notify(UpdateType.UPDATE_TASK, task);
      } catch (err) {
        task.status = previousStatus;
        throw err;
      }
    }
  }

  moveTaskTo(taskId, newStatus, targetTaskId = null) {
    const currentIndex = this.#boardtasks.findIndex(
      (task) => task.id === taskId
    );
    if (currentIndex === -1) return;

    const [task] = this.#boardtasks.splice(currentIndex, 1);
    task.status = newStatus;

    if (targetTaskId) {
      const targetIndex = this.#boardtasks.findIndex(
        (t) => t.id === targetTaskId
      );
      if (targetIndex !== -1) {
        this.#boardtasks.splice(targetIndex, 0, task);
      } else {
        this.#boardtasks.push(task);
      }
    } else {
      this.#boardtasks.push(task);
    }

    this._notify(UpdateType.MINOR);
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, taskId);
  }

  async clearBasketTasks() {
    const tasksInTrash = this.#boardtasks.filter(
      (task) => task.status === Status.TRASH.key
    );
    const deletePromises = tasksInTrash.map((task) =>
      this.#tasksApiService.deleteTask(task.id)
    );

    try {
      await Promise.all(deletePromises);
      this.#boardtasks = this.#boardtasks.filter(
        (task) => task.status !== Status.TRASH.key
      );
      this._notify(UpdateType.MINOR);
    } catch (err) {
      throw err;
    }
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
      this._notify(UpdateType.INIT);
    } catch (err) {
      throw err;
    }
  }

  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === Status.TRASH.key);
  }
}
