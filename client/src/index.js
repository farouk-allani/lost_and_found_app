import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./JS/store/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL='https://lost-and-found-in-tunisia.herokuapp.com/';
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
