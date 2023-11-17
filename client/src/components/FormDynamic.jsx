import React from "react";

function FormDynamic({ onSubmit, register, formFields, formTitle }) {
    return (
        <div className="w-80 rounded-2xl bg-white">
            <form className="flex  flex-col gap-2 p-8" onSubmit={onSubmit}>
                <h1 className="text-black">{formTitle}</h1>
                {formFields.map((field) => (
                    <input
                        key={field.name}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-gray-300 text-black bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                        type={field.type}
                        {...register(field.name)}
                        autoFocus
                    />
                ))}

                {/* Resto de tu formulario ... */}
                <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Save</button>
            </form>
        </div>
    );
}

export default FormDynamic;
