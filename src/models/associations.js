import User from './user.model.js';
import Task from './tasks.model.js';
import Category from "./category.model.js";

/* la tarea pertenece a un usuario */
Task.belongsTo(User, { foreignKey: 'userId' });
/* el usuario puede tener muchas tareas */
User.hasMany(Task, { foreignKey: 'userId' });


/* la tarea pertenece a una categoria */
Task.belongsTo(Category, {foreignKey:'categoryId'});
/* la categoria puede estar en muchas tareas */
Category.hasMany(Task, { foreignKey: 'categoryId' });
