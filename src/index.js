// configure  mdbootstrap,  bopotstrap,  font-awesome,  local-color-configuration

import "@fortawesome/fontawesome-free/css/all.css";
import "mdbootstrap/css/bootstrap.css";
import "mdbootstrap/css/mdb.css";
import "./index.css";

import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

// providing "store" this (react-application)
import { Provider } from "react-redux"; // 'react-redux' -> used to established connection b/w  React & Redux page
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 'store' has been configured  and  <App /> is surrounded with  <Provider>  */}
    <Provider store={store}>
      <App />
      {/* Now, whereever 'store' present in the application they can diretly access to the store. 
           Any nested component of App can directly access to 'store' they can read and they can read and dispatch an action.*/}
    </Provider>
  </React.StrictMode>
);
