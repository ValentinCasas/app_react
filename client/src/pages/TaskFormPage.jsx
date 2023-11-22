import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import FormDynamic from "../components/FormDynamic";
import CategoryForm from "../components/CategoryForm";


function TaskFormPage() {
    const { handleSubmit, setValue, register } = useForm();
    const { createTask, getTask, categories, updateTask, getCategories } = useTasks();
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const params = useParams();
    const formTitle = params.id ? "Edit task" : "Add task";
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

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
    });

    return (
        <>
            {showForm && <CategoryForm onClose={closeForm} />}

            <FormDynamic
                onSubmit={onSubmit}
                formFields={formFields}
                formTitle={formTitle}
                categories={categories}
                register={register}
                handleSubmit={handleSubmit}
                setValue={setValue}
            />



            <div className="w-full p-10">
                <button onClick={openForm} className="w-full bg-blue-600 border 
                text-white px-4 py-5 rounded-md my-2 
                    focus:ring hover:bg-blue-700focus:border-blue-300">
                    Add category
                </button>
            </div>
        </>
    );
}

export default TaskFormPage;
