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

    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log('Form Values:', values);
        console.log('Form Values fileeeee:', values.imageFile[0]);
        await signup(values, values.imageFile[0]);
    };


    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated, navigate]);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('imageFile', file);
        // Add a line to clear the value of the input
        event.target.value = null;
    };



    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))}
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
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
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        type="password"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <input
                        type="file"
                        onChange={handleFileChange}
                        onClick={() => console.log("File input clicked")}  // Agregamos esto para ver si se detecta el clic en el input
                        {...register("imageFile")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />


                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        Register
                    </button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    <Link to="/login" className="text-sky-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
