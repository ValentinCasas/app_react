import { Link } from "react-router-dom"
import FlyoutMenu from "./FlyoutMenu"
import { useAuth } from "../context/authContext"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CursorArrowRaysIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function NavBar() {

    const { isAuthenticated, logout, user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>



            <header className="bg-white">

                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/tasks" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="w-12" src="/images/image_defect/logo.png" alt="" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 md:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden md:flex lg:flex lg:gap-x-12 md:gap-x-12">


                        {isAuthenticated ? (
                            <>

                                <FlyoutMenu />

                                {/* create */}
                                {user.rol !== 3 ? (
                                    <Popover className="relative">
                                        <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900">
                                            Create
                                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >

                                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                                <div className="p-4">

                                                    {user.rol === 1 ? (

                                                        <>

                                                            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                    <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                                </div>
                                                                <div className="flex-auto">
                                                                    <a href={"/create-user"} className="block font-semibold text-gray-900">
                                                                        {"User"}
                                                                        <span className="absolute inset-0" />
                                                                    </a>
                                                                    <p className="mt-1 text-gray-600">{"solo admins"}</p>
                                                                </div>
                                                            </div>

                                                            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                    <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                                </div>
                                                                <div className="flex-auto">
                                                                    <a href={"/create-product"} className="block font-semibold text-gray-900">
                                                                        {"Product"}
                                                                        <span className="absolute inset-0" />
                                                                    </a>
                                                                    <p className="mt-1 text-gray-600">{"solo admins"}</p>
                                                                </div>
                                                            </div>

                                                        </>

                                                    ) : (
                                                        <>
                                                            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                    <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                                </div>
                                                                <div className="flex-auto">
                                                                    <a href={"/create-product"} className="block font-semibold text-gray-900">
                                                                        {"Product"}
                                                                        <span className="absolute inset-0" />
                                                                    </a>
                                                                    <p className="mt-1 text-gray-600">{"solo admins"}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                </div>

                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                ) : null}


                                {/* tasks */}
                                <Popover className="relative">
                                    <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900">
                                        Tasks
                                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >

                                        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-60 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div className="p-4">


                                                <>

                                                    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                            <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                        </div>
                                                        <div className="flex-auto">
                                                            <a href={"/tasks"} className="block font-semibold text-gray-900">
                                                                {"Tasks"}
                                                                <span className="absolute inset-0" />
                                                            </a>
                                                            <p className="mt-1 text-gray-600">{"my tasks"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                            <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                        </div>
                                                        <div className="flex-auto">
                                                            <a href={"/add-tasks"} className="block font-semibold text-gray-900">
                                                                {"Add tasks"}
                                                                <span className="absolute inset-0" />
                                                            </a>
                                                            <p className="mt-1 text-gray-600">{"add tasks"}</p>
                                                        </div>
                                                    </div>

                                                </>


                                            </div>

                                        </Popover.Panel>
                                    </Transition>
                                </Popover>



                                <Link to="/" onClick={() => logout()} className="text-lg font-semibold leading-6 text-gray-900">
                                    Logout
                                </Link>


                                {/* profile */}
                                {user && user.imageUrl ? (
                                    <Link to="/profile">
                                        <div className="h-[50px] shadow-md w-[50px] rounded-full border-4 overflow-hidden lg:justify-end -mt-3 border-white">
                                            <img src={`/images/image_profile/${user.imageUrl}`} className="w-full h-full rounded-full object-center object-cover" />
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="h-[50px] shadow-md w-[50px] rounded-full border-4 overflow-hidden -mt-4 border-white">
                                        <img src={`/images/image_defect/avatar_profile_default.png`} className="w-full h-full rounded-full object-center object-cover" />
                                    </div>
                                )}


                            </>) : (
                            <>
                                <Link to="/register" className="text-lg font-semibold leading-6 text-gray-900">
                                    Register
                                </Link>
                                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                    <Link to="/login" className="text-lg font-semibold leading-6 text-gray-900">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </>
                        )}


                    </Popover.Group>

                </nav>




                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {isAuthenticated ? (
                                        <>

                                            <Disclosure as="div" className="-mx-3">
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                            Create
                                                            <ChevronDownIcon
                                                                className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                                aria-hidden="true"
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="mt-2 space-y-2">

                                                            <Disclosure.Button
                                                                as="a"
                                                                href={"/create-user"}
                                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                            >
                                                                {"User"}
                                                            </Disclosure.Button>

                                                            <Disclosure.Button
                                                                as="a"
                                                                href={"/create-product"}
                                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                            >
                                                                {"Product"}
                                                            </Disclosure.Button>

                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>

                                            <Link
                                                to="/profile"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            > Profile
                                            </Link>

                                            <Link to="/tasks" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Tasks
                                            </Link>

                                            <Link to="/add-tasks" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Add task
                                            </Link>

                                            <Link to="/add-tasks" onClick={() => logout()} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Register
                                            </Link>
                                            <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Log in
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header >
        </>
    )
}

export default NavBar