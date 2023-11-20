import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";




function RegisterPage() {

    const {
        register,
        handleSubmit,
        setValue,  // Agrega setValue para actualizar el valor del campo de archivos
        formState: { errors },
    } = useForm();

    const { signup, isAuthenticated, setIsAuthenticated, user, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        await signup(values, values.imageFile[0]);
        if (!isAuthenticated) {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('imageFile', file);
        // Add a line to clear the value of the input
        event.target.value = null;
    };



    return (


        <>


            <div id="auth__section" className="flex flex-col lg:flex-row min-h-screen p-3">

                {/* Columna Izquierda */}
                <div className="lg:w-1/2 md:w-full p-8 flex flex-col justify-center items-start mb-4 lg:mb-0">
                    <h1 className="text-5xl font-bold text-blue-950 mb-4">REGISTRATE!</h1>
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
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white px-10 py-4 rounded-md shadow-lg">

                        <h1 className="text-3xl font-bold text-black text-center mb-4">Register</h1>

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
                            className="w-full bg-white borderbg-gray-200 text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
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
                            Register
                        </button>

                        <div className="flex gap-x-2 justify-between mt-4">
                            <Link to="/login" className="text-sky-500">
                                Sign in
                            </Link>
                        </div>


                    </form>
                </div>
            </div>



            <div id="auth__section-2" className="flex flex-col lg:flex-row min-h-screen p-3">
            </div>


        </>
    );
}

export default RegisterPage;
