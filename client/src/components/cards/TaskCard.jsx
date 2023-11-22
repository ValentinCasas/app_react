import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import { useTasks } from "../../context/TasksContext";

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const ActionTitle = [
    { title: 'Actions' },
]

const ActionsOptions = [
    { title: 'Delete', description: 'Borra esta tarea si la completaste.', colour: 'bg-red-500', current: true },
    { title: 'Edit', description: 'Edita esta tarea si hubo algún error.', colour: 'bg-gray-500', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function TaskCard({ task }) {
    const [selected, setSelected] = useState(ActionTitle[0])

    const { deleteTask } = useTasks();

    return (
        <>


            <div key={task.title} className="bg-white shadow-md px-2">
                <div>
                    <a href="#" className="inline-block">
                        <span
                            style={{
                                background: task.Category.colour,
                            }}
                            className="inline-flex bg-gray-100 text-indigo-800 
                            items-center shadow-md px-3 py-0.3 rounded-full text-sm font-medium"
                        >
                            {task.Category.name}
                        </span>

                    </a>
                </div>
                <a href="#" className="mt-4 block">
                    <p className="text-xl font-semibold text-gray-900">{task.title}</p>
                    <p className="mt-3 text-base text-gray-500">{task.description}</p>
                </a>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#">
                            <span className="sr-only">{task.name}</span>
                            <img className="h-10 w-10 rounded-full"
                                src={`/images/image_profile/${task.User.imageUrl}`} alt="" />
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            <a href="#">{task.User.username}</a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time >{new Date(task.date).toLocaleDateString()}</time>
                            <span aria-hidden="true">&middot;</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">



                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only"> Actions </Listbox.Label>
                                <div className="relative">
                                    <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                                        <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                                            <div className="inline-flex items-center rounded-l-md border
                                             border-transparent bg-indigo-500 py-2 pl-3 pr-4 text-white shadow-sm">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                                            </div>
                                            <Listbox.Button className="inline-flex items-center rounded-l-none
                                             rounded-r-md bg-indigo-500 p-2 text-sm font-medium text-white
                                              hover:bg-indigo-600 focus:outline-none focus:ring-2
                                               focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                                <span className="sr-only">Actions</span>
                                                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                            </Listbox.Button>
                                        </div>
                                    </div>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute border right-0 z-10 mt-2 w-72 origin-top-right 
                                        divide-y divide-gray-200 overflow-hidden rounded-md
                                         bg-white shadow-lg ring-1 ring-black ring-opacity-5 
                                         focus:outline-none">
                                            {ActionsOptions.map((option) => (

                                                <Listbox.Option
                                                    key={option.title}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? `text-white ${option.colour}` : 'text-gray-900',
                                                            'cursor-default select-none p-4 text-sm'
                                                        )
                                                    }
                                                    value={option}
                                                    onClick={() => {
                                                        if (option.title === "Delete") {
                                                            deleteTask(task.id);
                                                        }
                                                    }}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            {option.title === "Edit" ? (
                                                                <Link to={`/tasks/${task.id}`}>
                                                                    <div className="flex justify-between">
                                                                        <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                                                                        {selected ? (
                                                                            <span className={active ? 'text-white' : 'text-indigo-500'}>
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </div>
                                                                    <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                                                                        {option.description}
                                                                    </p>
                                                                </Link>
                                                            ) : (
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                                                                        {selected ? (
                                                                            <span className={active ? 'text-white' : 'text-indigo-500'}>
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </div>
                                                                    <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                                                                        {option.description}
                                                                    </p>
                                                                </div>
                                                            )}
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


                </div>
                <hr className="mt-4 border-t border-gray-300" />
            </div>



        </>
    );
}

export default TaskCard;
