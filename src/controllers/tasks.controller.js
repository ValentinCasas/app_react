import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

/* todas las tareas de un user */
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            include: [
                { model: User },
                { model: Category }
            ]
        });

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createCategory = async (req, res) => {
    const { name, description, colour } = req.body;
    try {
        const newCategory = await Category.create({
            name,
            description,
            colour,
        })
        res.status(201).json({ NewCategory: newCategory });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createTask = async (req, res) => {
    const { title, description, categoryId } = req.body;

    try {
        const newTask = await Task.create({
            title: title,
            description: description,
            userId: req.user.id,
            date: new Date(),
            categoryId: categoryId
        });

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export const getTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await task.update(req.body);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
