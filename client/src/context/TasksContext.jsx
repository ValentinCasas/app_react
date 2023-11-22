import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  createCategoryRequest,
  getCategoriesRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {

    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
    } catch (error) {
      console.log(error.message)
    }
  };

  const createCategory = async (category) => {
    try {
      const res = await createCategoryRequest(category);

    } catch (error) {

    }
  };

  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest();
      setCategories(res.data)
    } catch (error) {

    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        getTask,
        getTasks,
        deleteTask,
        createTask,
        updateTask,
        createCategory,
        getCategories,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
