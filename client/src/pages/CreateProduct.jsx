import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/productContext";
import { Link, useNavigate } from "react-router-dom";
import CardProducts from "../components/cards/CardProducts";

function CreateProduct() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { createProduct, getProducts, deleteProduct, products, errors: createErrors } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);


    const onSubmit = async (values) => {
        await createProduct(values, values.imageFile[0]);
    };

    const handleFileChangeProduct = (event) => {
        const file = event.target.files[0];
        setValue('imageFile', file);
        event.target.value = null;
    };

    return (
        <>

            <section id="auth__section" className="flex bg-white flex-col-2 min-h-[calc(100vh-200px)] ">

                {/* Columna Izquierda */}
                <div className="lg:w-4/6 md:w-full bg-white flex items-center justify-center lg:p-3 md:p-4 xs:p-4 ">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
                        className="bg-white px-10 py-4 rounded-md shadow-2xl">

                        <h1 className="text-3xl font-bold text-black text-center m-6">Product</h1>

                        <input
                            type="text"
                            {...register("name", { required: "Username is required" })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 
                                rounded-md my-2 focus:outline-none
                                focus:ring focus:border-blue-300"
                            placeholder="Name" />

                        <input
                            type="text"
                            {...register("description", { required: "Description is required" })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 
                                    rounded-md my-2 focus:outline-none
                                    focus:ring focus:border-blue-300"
                            placeholder="Description" />

                        <input
                            type="file"
                            onChange={handleFileChangeProduct}
                            {...register("imageFile")}
                            className="w-full bg-white border text-gray-800 px-4 py-5 
                                    rounded-md my-2 focus:outline-none
                                    focus:ring focus:border-blue-300" />

                        <div className="w-full grid mb-4">
                            <button
                                type="submit"
                                className=" bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Create
                            </button>
                        </div>

                    </form>
                </div>

                <div className="flex bg-white justify-center items-center hidden lg:block lg:w-1/2 min-h-[calc(100vh-200px)] lg:py-20 ">
                    <img src="/images/flat/puzzle.png" className="mx-auto my-auto" />
                </div>

            </section>
            <CardProducts
                products={products}
            />

        </>

    );
}

export default CreateProduct;
