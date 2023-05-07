import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks/`;

// Create New Task
const createTask = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Task
const deleteTask = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Task
const getTask = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Task
const updateTask = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};

export default taskService;