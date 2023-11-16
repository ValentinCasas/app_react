import User from './user.model.js';
import Task from './tasks.model.js';

/* la tarea pertenece a un usuario */
Task.belongsTo(User, { foreignKey: 'userId' });

/* el usuario puede tener muchas tareas */
User.hasMany(Task, { foreignKey: 'userId' });
