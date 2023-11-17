import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TaskPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) return <h1>No tasks</h1>;

    return (
        <div className="flex justify-center flex-wrap gap-2 p-6 my-3">
            {tasks.map((task) => (
                <TaskCard task={task} key={task.id} />
            ))}
        </div>
    );
}

export default TaskPage;
