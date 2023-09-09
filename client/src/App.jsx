import React, { Suspense, useState } from "react";
import UserScreen from "./Screens/UserScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { UserContext } from "./Context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import AllProperties from "./Screens/AllProperties/AllProperties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ReactQueryDevtools} from 'react-query/devtools'
import AgentScreen from "./Screens/AgentScreen";
import UserLogin from "./Screens/UserLoginScreen/UserLogin";
import UserSignUpScreen from "./Screens/UserSignUpScreen/UserSignUpScreen";
import AgnetSignupScreen from "./Screens/AgentSignupScreen/AgnetSignupScreen";
import AgentLoginScreen from "./Screens/AgentLoginScreen/AgentLoginScreen";
function App() {

  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
       

            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<UserScreen />} />
                  <Route path="/login" element={<UserLogin/>}/>
                  <Route path="/signup" element={<UserSignUpScreen/>}/>
                  <Route path="/properties" element={<AllProperties />} />
                  <Route path="/agent" element={<AgentScreen />} />
            <Route path="/agent/login" element={<AgentLoginScreen/>}/>
            <Route path="/agent/signup" element={<AgnetSignupScreen/>}/>
                </Routes>
              </Suspense>
      < ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
    
     
       

        <QueryClientProvider client={new QueryClient()}>
          <Routes>
          
          </Routes>
        </QueryClientProvider>
     

      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
