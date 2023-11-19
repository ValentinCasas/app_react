import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
    createProductRequest,
} from "../api/products";

// productContext.jsx

const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProduct must be used within an ProductProvider");
    return context;
}

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const createProduct = async (product, file) => {
        try {
            const formData = new FormData();

            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('imageFile', file);

            const res = await createProductRequest(formData);

            if (res.status === 200) {
                setProducts(res.data.Product);
            }
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <ProductContext.Provider
            value={{
                products,
                createProduct,
                errors,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;

