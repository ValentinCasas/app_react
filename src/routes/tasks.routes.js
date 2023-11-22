import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getTasks, getTask,
    createTask, deleteTask,
    updateTask, createCategory,
    getCategories
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from '../schemas/task.schema.js';


const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);

router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

router.post("/add-category", authRequired, createCategory);
router.get("/getCategories", authRequired, getCategories);

export default router