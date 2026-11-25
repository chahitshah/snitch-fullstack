import axios from "axios"

const api = axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})


export async function register({email,password,fullname,contact,isSeller})
{
    const response = await api.post("/register",{
        email,password,fullname,contact,isSeller
    })

    return response.data
}

export async function login({email,contact,password})
{
    const response = await api.post("/login",{
        email,contact,password
    })

    return response.data
}