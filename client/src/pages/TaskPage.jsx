import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/cards/TaskCard";

function TaskPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) return <h1>No tasks</h1>;

    return (
        <div className="bg-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My tasks</h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
                        arcu.
                    </p>
                </div>
                <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskPage;
