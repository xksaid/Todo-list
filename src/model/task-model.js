import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
  #boardtasks = [];
  #observers = [];

  constructor() {
    this.#boardtasks = tasks.slice();
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateID(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this._notifyObservers();
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

    this._notifyObservers();
  }

  deleteTasksByStatus(status) {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== status
    );
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}
