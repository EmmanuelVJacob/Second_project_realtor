import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import UserStore from "./Store/UserStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={UserStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
