import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function TaskCard({ task }) {

    const { deleteTask } = useTasks();

    return (

        <div className="bg-gray-100 border border-gray-300 p-6 rounded-md max-w-md w-full mx-auto my-3">
            <h1 className="text-3xl font-semibold mb-4 text-blue-500">{task.title}</h1>
            <p className="text-gray-700">{task.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500 text-sm">{new Date(task.date).toLocaleDateString()}</span>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => deleteTask(task.id)} > Delete </button>

                <Link className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    to={`/tasks/${task.id}`} > Edit </Link>

            </div>
        </div >



    )
}

export default TaskCard