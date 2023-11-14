import User from './user.model.js';
import Task from './tasks.model.js';

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });
