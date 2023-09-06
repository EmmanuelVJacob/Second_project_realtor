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

export const createUser = async (user, token) => {
  try {
    await api.post(
      "/user/register",
      { user },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};
export const createAgent = async (user) => {
  try {
    await api.post("/agent/agentSingUp", { user });
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};
