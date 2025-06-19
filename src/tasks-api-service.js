import ApiService from "./framework/view/api-service.js";

export default class TasksApiService extends ApiService {
  get tasks() {
    return this._load({ url: "tasks" }).then(ApiService.parseResponse);
  }

  async updateTask(task) {
    const response = await this._load({
      url: `tasks/${task.id}`,
      method: "PUT",
      body: JSON.stringify(task),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteTask(taskId) {
    await this._load({
      url: `tasks/${taskId}`,
      method: "DELETE",
    });
  }
}
