
import axios from "axios";
import { toast } from "react-toastify";

export const agentApi = axios.create({
  baseURL: "http://localhost:8000/api/admin",
});

export const adminLogin = async({email,password})=>{
    try {
        if(email==="admin@realtor.com" && password === "123"){
            return true
        }else{
            toast.error('wrong email or password')
            return false
        }
    } catch (error) {
        toast.error("something went wrong ")
    }
}