import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/productContext";
import { Link, useNavigate } from "react-router-dom";
import CardProducts from "../components/CardProducts";

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

        <div id="product__section" className="flex flex-col min-h-[calc(100vh-100px)] ">

            {/* Columna Izquierda */}
            <div className="lg:w-1/2 md:w-full flex items-center justify-center p-10 ">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
                    className="bg-white px-10 py-4 h-full rounded-md shadow-lg">

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

                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-md
                                                     hover:bg-blue-600 focus:outline-none
                                                     focus:ring focus:border-blue-300" >
                        Crear
                    </button>
                </form>
            </div>


            <CardProducts
                products={products}
            />

        </div>

    );
}

export default CreateProduct;
