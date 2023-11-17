/* peticiones al backend con node */

import axios from "./axios";


export const registerRequest = async (formData) => axios.post('/register', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const loginRequest = async (user) => axios.post(`/login`, user)

export const verifyTokenRequest = async () => axios.get(`/verify`)