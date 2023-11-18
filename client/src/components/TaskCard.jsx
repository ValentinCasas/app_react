import React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function TaskCard({ task }) {

    const { deleteTask } = useTasks();

    return (
        <div className="bg-gray-200  p-6 rounded-md max-w-md w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2 overflow-hidden">
            <h1 className="text-3xl font-semibold mb-4 text-blue-500 break-all">{task.title}</h1>
            <p className="text-gray-700 break-all">{task.description}</p>

            <span className="text-gray-500 text-sm">{new Date(task.date).toLocaleDateString()}</span>

            <div className="mt-4 flex justify-between items-center">
                <button
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </button>

                <Link
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                    to={`/tasks/${task.id}`}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}

export default TaskCard;
