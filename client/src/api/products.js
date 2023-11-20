/* peticiones al backend con node */

import axios from "./axios";


export const createProductRequest = async (formData) => axios.post('/product/create', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const getProductsRequest = async () => axios.get("/product/products");

export const deleteProductRequest = async (id) => axios.delete(`/product/delete/${id}`);
