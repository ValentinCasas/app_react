import React, { useState, useContext } from "react";
import { useTasks } from "../context/TasksContext";
function CategoryForm({ onClose }) {

    const { createCategory } = useTasks();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        colour: "#ffffff",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleColorChange = (colour) => {
        setFormData({
            ...formData,
            colour,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            await createCategory(formData);

            onClose();
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        }
    };


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
         bg-white border h-full p-10 rounded-md lg:w-5/6 md:w-3/4 xs:w-full shadow-2xl z-10">
            {/* Contenido del formulario */}
            <form onSubmit={handleSubmit}>
                {/* Campo Name */}
                <div className="mb-4">

                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mr-1 md:w-full xs:w-full bg-white border text-gray-800
                        px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                {/* Campo Description */}
                <div className="mb-4">

                    <input
                        id="description"
                        name="description"
                        placeholder="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mr-1 md:w-full xs:w-full bg-white border text-gray-800 px-4 py-5 
                        rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        required
                    ></input>
                </div>

                {/* Campo Color */}
                <div className="mb-4">

                    <input
                        type="color"
                        id="colour"
                        name="colour"
                        value={formData.colour}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="mr-1 md:w-full xs:w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    {/* Botón de enviar */}
                    <button type="submit" className="bg-blue-500  mx-2 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                    {/* Botón de cerrar */}
                    <button type="button" onClick={onClose} className="bg-red-400
                     hover:bg-red-600 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;
