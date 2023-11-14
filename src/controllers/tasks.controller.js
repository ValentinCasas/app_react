import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";

/* todas las tareas de un user */
export const getTasks = async (req, res) => {

    const Tasks = await Task.findAll({
        where: { userId: req.user.id },
        include: User
    });

    res.json(Tasks)
}


export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const date = Date.now();

    const newTask = new Task({
        title,
        description,
        userId: req.user.id,
        date
    });

    try {
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).send('Error al guardar la tarea');
    }
}


export const getTask = async (req, res) => {
    const Task = await Task.findById(req.params.id);
    if (!Task) return res.status(404).json({ error: "Task not found" });
    res.json(Task);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTask = await task.update(req.body);
    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {

    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
}
