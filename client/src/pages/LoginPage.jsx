import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"

function LoginPage() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, logout, isAuthenticated, errors: signinErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data)
    })

    /* useEffect esta siempre atento a isAuthenticates
    entonces si me logueo me redirige a /tasks */
    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])



    return (

        <>


            <div id="auth__section" className="flex flex-col lg:flex-row h-[calc(100vh-100px)] p-3">

                {/* Columna Izquierda */}
                <div className="lg:w-1/2 md:w-full p-8 flex flex-col justify-center items-start mb-4 lg:mb-0">
                    <h1 className="text-5xl font-bold text-blue-950 mb-4">LOGUEATE!</h1>
                    <h2 className="text-2xl text-black w-full lg:w-1/2">
                        Sé parte de este gran equipo reactivo :P
                    </h2>
                    <div className="flex mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 mr-2">Botón 1</button>
                        <button className="bg-slate-200 text-black px-4 py-2">Botón 2</button>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="lg:w-1/2 md:w-full flex items-center justify-center p-10 ">

                    {/* Formulario */}
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-md shadow-lg">

                        <h1 className="text-3xl font-bold text-black text-center mb-4">Login</h1>

                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Email"
                            name="email"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password"
                            name="password"
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Login
                        </button>

                        <div className="flex gap-x-2 justify-between mt-4">
                            <Link to="/register" className="text-sky-500">
                                Sign up
                            </Link>
                        </div>


                    </form>
                </div>
            </div>



            <div id="auth__section-2" className="flex flex-col lg:flex-row h-[calc(100vh-100px)] p-3">
            </div>


        </>
    )

}

export default LoginPage