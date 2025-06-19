export const Status = {
  BACKLOG: { key: "backlog", label: "Бэклог" },
  IN_PROGRESS: { key: "in-progress", label: "В процессе" },
  COMPLETED: { key: "completed", label: "Готово" },
  TRASH: { key: "trash", label: "Корзина" },
};

export const UserAction = {
  UPDATE_TASK: "UPDATE_TASK",
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
};

export const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
  INIT: "INIT",
};

export const Method = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};
