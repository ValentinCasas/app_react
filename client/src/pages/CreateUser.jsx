import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Fragment, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const roles = [
    {
        rol: 1,
        name: 'Administrador',
        avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        rol: 2,
        name: 'Empleado',
        avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        rol: 3,
        name: 'Cliente',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function CreateUser() {
    const [selectedRole, setSelectedRole] = useState(roles[2]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { createUser, isAuthenticated, user, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const roleValue = selectedRole.rol;
        await createUser(roleValue, { ...values }, values.imageFile[0]);
        navigate('/tasks');
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('imageFile', file);
        event.target.value = null;
    };

    return (
        <div id="auth__section" className="flex flex-col lg:flex-row h-[calc(100vh-100px)] p-3">
            <div className="lg:w-1/2 md:w-full p-8 flex flex-col justify-center items-start mb-4 lg:mb-0">
                <h1 className="text-5xl font-bold text-blue-950 mb-4">AGREGA UN USUARIO</h1>
                <h2 className="text-2xl text-black w-full lg:w-1/2">
                    Los admins podrán crear clientes, empleados y otros admins
                </h2>
                <div className="flex mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 mr-2">Botón 1</button>
                    <button className="bg-slate-200 text-black px-4 py-2">Botón 2</button>
                </div>
            </div>

            <div className="lg:w-1/2 md:w-full flex items-center justify-center p-10  mt-10 ">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white px-10 py-4 rounded-md shadow-lg">
                    <h1 className="text-3xl font-bold text-black text-center mb-4">User</h1>

                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                        {({ open }) => (
                            <>

                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                        <span className="flex items-center">
                                            <img src={selectedRole.avatar} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" />
                                            <span className="ml-3 block truncate">{selectedRole.name}</span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {roles.map((role) => (
                                                <Listbox.Option
                                                    key={role.rol}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={role}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center ">
                                                                <img src={role.avatar} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" />
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {role.name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>

                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Username"
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter a valid email address",
                            },
                        })}
                        className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        type="password"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <input
                        type="file"
                        onChange={handleFileChange}
                        {...register("imageFile")}
                        className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                    />



                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Create
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateUser;
