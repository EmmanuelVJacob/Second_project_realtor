
import axios from "axios";
import { toast } from "react-toastify";

export const agentApi = axios.create({
  baseURL: "http://localhost:8000/api/agent",
});


export const createAgent = async ({name,email,password}) => {

    try {
     const newAgent =  await agentApi.post("/agentSingUp", { name,email,password })
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