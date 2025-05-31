import axios from "axios";
import { toast } from 'react-toastify'
import type { IImageOrder, IUser } from "../Types/basictype";
import { useAuthStore } from "../store/userAuthStore"
import { apiClient } from "./userAxiosInstance";
const API_URI = 'http://localhost:5000/api/user'


export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message);
    } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};


export const Signup = async (userData: IUser) => {
    try {
        const response = await axios.post(`${API_URI}/signup`, { ...userData }, { withCredentials: true })
        return response.data
    } catch (error: unknown) {
        handleAxiosError(error)
    }
}

// export const SignIn = async (userData: IUser) => {
//     try {
//         const response = await axios.post(`${API_URI}/signin`, { ...userData }, { withCredentials: true })
//         console.log("response from signin", response.data)
//         const accessToken = response.data.data.accessToken
//         if (accessToken) {
//             localStorage.setItem('accessToken', accessToken)
//             useAuthStore.getState().setAuth(true)  // Zustand store update
//         }
//         return response.data

//     } catch (error: unknown) {
//         handleAxiosError(error)
//     }
// }


export const SignIn = async (userData: IUser) => {
    try {
        const response = await axios.post(`${API_URI}/signin`, { ...userData }, { withCredentials: true })
        console.log("response from signin", response.data)
        
        const accessToken = response.data.data.accessToken
        const email = response.data.data.email // Assuming email is in response.data.data.email
        
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            useAuthStore.getState().setAuth(true, email)  // Pass email to store
        }
        return response.data

    } catch (error: unknown) {
        handleAxiosError(error)
    }
}


export const forgotPassword = async(email:string) => {
    try {
        const response = await axios.post(`${API_URI}/forgot-password`,{email});
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const resetPassword = async(cacheCode:string,password:string,email:string) => {
    try {
        const response = await axios.post(`${API_URI}/reset-password`,{cacheCode,password,email});
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}


export const uploadImage = async (formData: FormData) => {
    try {
        console.log(formData.get('image'))
        console.log(formData.get('title'));
        const response = await apiClient.post('/upload', formData);
        return response.data;
    } catch (error) {
        handleAxiosError(error)
    }
}


export const getImages = async () => {
    try {
        const response = await apiClient.get('/images');
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}


export const updateImageOrder = async (imageOrder: IImageOrder[]) => {
    console.log(imageOrder)
    try {
        const response = await apiClient.post('/change-order', { imageOrder })
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const deleteImage = async (id: string) => {
    try {
        const response = await apiClient.delete(`/delete-image/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const updateImage = async (id: string, formData: FormData) => {
    try {
        console.log(formData.get('image'))
        console.log(formData.get('title'));
        // console.log(id, formData)
        const response = await apiClient.post(`/update-image/${id}`,  formData )
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}
