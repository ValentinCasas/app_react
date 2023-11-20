import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/productContext";
import { Link, useNavigate } from "react-router-dom";

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
            <div id="product__section" className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] p-3">
                {/* Columna Izquierda */}
                <div className="lg:w-1/2 md:w-full flex items-center justify-center p-10 ">
                    {/* Formulario */}
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
                        className="bg-white px-10 py-4 h-full rounded-md shadow-lg">

                        <h1 className="text-3xl font-bold text-black text-center m-6">Product</h1>
                        <input
                            type="text"
                            {...register("name", { required: "Username is required" })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Name"
                        />

                        <input
                            type="text"
                            {...register("description", { required: "Description is required" })}
                            className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Description"
                        />

                        <input
                            type="file"
                            onChange={handleFileChangeProduct}
                            {...register("imageFile")}
                            className="w-full bg-white border text-gray-800 px-4 py-5 rounded-md my-2 focus:outline-none focus:ring focus:border-blue-300"
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Crear
                        </button>
                    </form>
                </div>

                {/* cards */}
                <div className="lg:w-1/2 md:w-full flex  items-center max-h-[calc(100vh-110px)] justify-center overflow-auto p-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 w-full h-full flex-col-reverse">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="bg-white p-4 lg:p-6 xs:p-2 rounded-md shadow-md md:w-full lg:w-full xl:w-full"
                            >
                                <div className="grid grid-cols-2 gap-4 items-end">
                                    <img
                                        src={
                                            product.imageUrl === "product_default.png"
                                                ? `/images/image_defect/product_default.png`
                                                : `/images/image_product/${product.imageUrl}`
                                        }
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-md"
                                    />

                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-black mb-2">{product.name}</p>

                                        <button
                                            className="bg-slate-50 border text-gray-700 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-blue-300"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>


            </div>




        </>
    );
}

export default CreateProduct;
