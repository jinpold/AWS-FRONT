import  instance  from "@/app/component/common/configs/axios-config"
import { IUser } from "../model/user.model"

export const fetchAllUsersAPI = async (page: number) => {
    try {
        const response = await instance().get('/users/list', {
            params: { page, limit: 10 } 
        })
        return response.data
    } catch (error) {
        console.log(error, " fetchAllUsersAPI EERR!!!")
        return error
    }
}

export const findUserByIdAPI = async (id: number) => {
    try {
        const response = await instance().get('/users/detail', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error, " findUserByIdAPI EERR!!!")
        return error
    }
}

export const countUsersAPI = async () => {
    try {
        const response = await instance().get('/users/count')

        return response.data
    } catch (error) {
        console.log(error, " countAllUsersAPI EERR!!!")
        return error
    }
}

export const modifyUserByIdAPI = async (props: any) => {
    try {
        const response = await instance().put('/users/modify', props)
        console.log("response ", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error, " modifyUserByIdAPI EERR!!!")
        return error
    }
}

export const deleteUserByIdAPI = async (id: number) => {
    try {
        const response = await instance().delete('/users/delete', {
            params: { id }
        })
        console.log("response ", response)
        return response.data
    } catch (error) {
        console.log(error, " deleteUserByIdAPI EERR!!!")
        return error
    }
}

export const loginUserAPI = async (props: any) => {
    try {
        const response = await instance().post('/auth/login', props)
        return response.data
    } catch (error) {
        console.log(error, "loginUserByIdAPI EERR!!!")
        return error
    }
}

export const joinUserAPI = async (props: any) => {
    try {
        const response = await instance().post('/users/save', props)
        console.log("response ", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error, " joinUserAPI EERR!!!")
        return error
    }
}

export const existsByUsernameAPI = async (username: string) => {
    try {
        const response = await instance().get('/auth/exists-username', {
            params: {username} 
        })
        console.log("exist username response "+ response.data)
        return response.data
    } catch (error) {
        console.log(error, " existsByUsernameAPI EERR!!!")
        return error
    }
}

export const logoutAPI = async () =>{
    try{
        const response = await instance().get('/users/logout',)
        console.log('logout response', JSON.stringify(response.data))
        return response.data
    }catch(error){
        console.log(error, " logoutAPI EERR!!!")
        return error
    }
}