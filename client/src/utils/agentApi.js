
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

  export const agentLogin = async ({email,password}) => {
    try {
      const agent =  await agentApi.post("/login", { email,password })
      console.log(agent)
     if(agent.data.agent){
       return agent.data.agent
     }else{
      toast.error(agent.data.message)
     }
    } catch (error) {
      toast.error("something went wrong");
      throw error;
    }
  };