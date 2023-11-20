import { createContext, useContext, useState } from "react";
import {
    createProductRequest,
    getProductsRequest,
    deleteProductRequest,
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

            if (res.status === 201) {
                setProducts((prevProducts) => [...prevProducts, res.data.product]);

            }
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    };

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            if (res.status === 201) {
                setProducts(res.data.Products);   
            }
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    };

    const deleteProduct = async (id) => {
        try {
          const res = await deleteProductRequest(id);
          if (res.status === 204) setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
     
        }
      };

    return (
        <ProductContext.Provider
            value={{
                products,
                createProduct,
                getProducts,
                deleteProduct,
                errors,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;

