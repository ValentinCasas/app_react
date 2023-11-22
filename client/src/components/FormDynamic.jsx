import React from "react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import RadioGroupCategory from "./RadioGroupCategory";

function FormDynamic({ onSubmit, formFields, formTitle, categories, register, handleSubmit, setValue }) {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        setValue('categoryId', selectedCategoryId || '6');
    }, [selectedCategoryId, setValue]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const onSubmitForm = (data) => {
        onSubmit(data);
    };


    return (
        <section id="auth__section" className="flex bg-white flex-col-2 min-h-[calc(100vh-200px)] ">
            {/* Columna Izquierda */}
            <div className="lg:w-4/6 md:w-full bg-white flex items-center justify-center lg:p-3 md:p-4 xs:p-4 ">
                <form className="bg-white px-10 py-4 rounded-md shadow-2xl" onSubmit={handleSubmit(onSubmitForm)}>
                    <h1 className="text-3xl font-bold text-black text-center">{formTitle}</h1>

                    {formFields.map((field) => (
                        <input
                            key={field.name}
                            placeholder={field.placeholder}
                            className="mr-1 md:w-full xs:w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                            type={field.type}
                            {...register(field.name)}
                            autoFocus
                        />
                    ))}

                    <div className="h-60 p-2 overflow-auto">
                        <RadioGroupCategory categories={categories} selectedCategoryId={selectedCategoryId} onCategoryChange={handleCategoryChange} />


                    </div>

                    <input type="hidden" {...register('categoryId')} value={selectedCategoryId || '6'} />


                    {/* <input type="hidden" {...register('categoryId')} value='6' /> */}


                    <div className="w-full grid mb-4">
                        <button
                            type="submit"
                            className=" bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex bg-white justify-center items-center hidden lg:block lg:w-1/2 min-h-[calc(100vh-200px)] lg:py-20 ">
                <img src="/images/flat/puzzle.png" className="mx-auto my-auto" />
            </div>
        </section>
    );
}

export default FormDynamic;
