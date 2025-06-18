import { tasks } from "../mock/task.js";

export default class TasksModel {
  #boardTasks = tasks;
  get tasks() {
    return this.#boardTasks;
  }
}

export const tasksModel = new TasksModel();
