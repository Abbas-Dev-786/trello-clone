import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const DEFAULT_ERROR_MESSAGE =
  "Something went wrong 😢. We are working on it 🔎.";

export const getAllTasks = async () => {
  try {
    const res = await axios.get("/tasks");
    return res;
  } catch (error) {
    throw Error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
  }
};

export const addTask = async (data) => {
  try {
    await axios.post("/tasks", data);
  } catch (error) {
    throw Error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
  }
};

export const EditTaskTitle = async (data) => {
  try {
    await axios.patch(`/tasks/${data.id}`, {
      task: data.task,
    });
  } catch (error) {
    throw Error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`/tasks/${id}`);
  } catch (error) {
    throw Error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
  }
};

export const editTaskType = async (data) => {
  try {
    axios.patch(`/tasks/${data.id}`, {
      type: data.type,
    });
  } catch (error) {
    throw Error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
  }
};
