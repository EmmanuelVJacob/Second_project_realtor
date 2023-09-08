import { createSlice } from "@reduxjs/toolkit";

export const agentSclice = createSlice({
  name: "agent",
  initialState: {
    agent: null,
  },
  reducers: {
    login: (state, action) => {
      state.agent = action.payload;
    },
    logout: (state) => {
      state.agent = null;
    },
  },
});

export const { login, logout } = agentSclice.actions;
export const selectAgent = (state) => state.agent.agent;
export default agentSclice.reducer;
