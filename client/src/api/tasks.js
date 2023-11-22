/* peticiones al backend con node */

import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");
export const getCategoriesRequest = async () => axios.get("/getCategories");

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

export const createTaskRequest = async (task) => axios.post("/tasks", task);
export const createCategoryRequest = async (category) => axios.post("/add-category", category);

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);


