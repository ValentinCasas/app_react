/* peticiones al backend con node */

import axios from "./axios";


export const createProductRequest = async (formData) => axios.post('/product/create', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

