import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api = axios.create({
    baseURL:"http://localhost:8000/api"
})

export const getAllProperties = async()=>{
    console.log('notngi')
    try {
       const response = await api.get('/property/allProperties',{
        timeout:10*1000
       }) 
       console.log(response,'respldvkonse')
       if(response.status ===400 || response.status === 500){
        throw response.data
       }
       return response.data
    } catch (error) {
        toast.error("something went wrong")
        throw error
    }
}

export const createUser = async(user)=>{
    try {
        await api.post('/user/register',{user})
    } catch (error) {
        toast.error("something went wrong")
        throw error
    }
}
export const createAgent = async(user)=>{
    try {
        await api.post('/agent/agentSingUp',{user})
    } catch (error) {
        toast.error("something went wrong")
        throw error
    }
}