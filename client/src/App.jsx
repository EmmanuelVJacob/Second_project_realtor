import React, { Suspense, useState } from "react";
import UserScreen from "./Screens/UserScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "./Context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import AllProperties from "./Screens/AllProperties/AllProperties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ReactQueryDevtools} from 'react-query/devtools'
import AgentScreen from "./Screens/AgentScreen";
import AgentContext from "./Context/AgentContext";
import UserLogin from "./Screens/UserLoginScreen/UserLogin";
import UserSignUpScreen from "./Screens/UserSignUpScreen/UserSignUpScreen";

function App() {
  const [userDetails, setUserDetails] = useState([]);
  const [agentDetails,setAgentDetails] = useState({
    favourites:[],
    bookings:[],
    token:null
  })
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
        <Auth0Provider
          domain="dev-fncui3kebcve1zgy.us.auth0.com"
          clientId="uufmtgCqOsD87a5rse0EJN3cly8B1iJl"
          authorizationParams={{
            redirect_uri: "http://localhost:5173",
          }}
          audience="http://localhost:8000"
          scope="openid profile email"
        >
          <UserContext.Provider value={{ userDetails, setUserDetails }}>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<UserScreen />} />
                  <Route path="/login" element={<UserLogin/>}/>
                  <Route path="/signup" element={<UserSignUpScreen/>}/>
                  <Route path="/properties" element={<AllProperties />} />
                </Routes>
              </Suspense>
      < ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
          </UserContext.Provider>
        </Auth0Provider>
        <Auth0Provider
        domain="dev-fncui3kebcve1zgy.us.auth0.com"
        clientId="82myjUtFXChnRmPVgdxWjPgCDL6usDjo"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/agent",
        }}
        audience="http://localhost:8000"
        scope="openid profile email"
      >
        <AgentContext.Provider value={{agentDetails,setAgentDetails}}>

        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/agent" element={<AgentScreen />} />
          </Routes>
        </QueryClientProvider>
        </AgentContext.Provider>
      </Auth0Provider>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
