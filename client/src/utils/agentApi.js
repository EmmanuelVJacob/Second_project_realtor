
import axios from "axios";
import { toast } from "react-toastify";

export const agentApi = axios.create({
  baseURL: "http://localhost:8000/api/agent",
});


export const createAgent = async ({name,email,password}) => {

    try {
     const newAgent =  await agentApi.post("/agentSingUp", { name,email,password },{headers:{"jwt_access_to":localStorage.getItem("token")}})
     if(newAgent.data.agent1){
       return newAgent.data.agent1
     }else{
      toast.error(newAgent.data.message)
     }
    } catch (error) {
      toast.error("something went wrong");
      throw error;
    }
  };

  export const verifyOtp = async({agentOtp})=>{
    try {
      const newAgent = await agentApi.post('/otp',{agentOtp})
      if(newAgent.data.agent1){
        return newAgent.data
      }else{
        toast.error(newAgent.data.message)
      }
    } catch (error) {
      toast.error('something went wrong')
      throw error
      
    }
  }

  export const agentLogin = async ({email,password}) => {
    try {
      const agent =  await agentApi.post("/login", { email,password })
     if(agent.data.agent){
       return agent.data
     }else{
      toast.error(agent.data.message)
     }
    } catch (error) {
      toast.error("something went wrong");
      throw error;
    }
  };