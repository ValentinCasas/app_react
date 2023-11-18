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
        <section id="tasks__section__contain" className="flex justify-center flex-wrap gap-2 p-6 my-3">
            {tasks.map((task) => (
                <TaskCard task={task} key={task.id} />
            ))}
        </section>
    );
}

export default TaskPage;
