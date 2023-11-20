/* peticiones al backend con node */

import axios from "./axios";


export const registerRequest = async (formData) => axios.post('/auth/register', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const loginRequest = async (user) => axios.post(`/auth/login`, user)

export const verifyTokenRequest = async () => axios.get(`/auth/verify`)

export const getUsersRequest = async () => axios.get(`/auth/get-users`)