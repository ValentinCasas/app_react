import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import FormDynamic from "../components/FormDynamic";

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    const formTitle = params.id ? "Edit task" : "Add task";
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);

                setValue("title", task.title);
                setValue("description", task.description);

                setFormFields([
                    { name: "title", type: "text", placeholder: task.title },
                    { name: "description", type: "text", placeholder: task.description },
                    { name: "checkbox", type: "checkbox" },
                ]);
            } else {
                setFormFields([
                    { name: "title", type: "text", placeholder: "Title" },
                    { name: "description", type: "text", placeholder: "Description" },
                ]);
            }
        }

        loadTask();
    }, [params.id, getTask, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateTask(params.id, data);
        } else {
            await createTask(data);
        }
        navigate("/tasks");
    });

    return (
        <div className="bg-zinc-300 mx-auto
                         flex justify-center
                         max-w-7xl w-full p-10 
                         rounded-md">
            <FormDynamic
                onSubmit={onSubmit}
                register={register}
                formFields={formFields}
                formTitle={formTitle}
            />
        </div>
    );
}

export default TaskFormPage;
