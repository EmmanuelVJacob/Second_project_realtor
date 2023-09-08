import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/property/allProperties", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};

export const createUser = async ({name,email,password}) => {

  try {
   const newuser =  await api.post("/user/register", { name,email,password })
   if(newuser.data.user1){

     return newuser.data.user1
   }else{
    toast.error(newuser.data.message)
   }
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};
export const userLogin = async ({email,password}) => {

  try {
    const user =  await api.post("/user/login", { email,password })
   if(user.data.user){
     return user.data.user
   }else{
    toast.error(user.data.message)
   }
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};
// export const createAgent = async (user) => {
//   try {
//     await api.post("/agent/agentSingUp", { user });
//   } catch (error) {
//     toast.error("something went wrong");
//     throw error;
//   }
// };
