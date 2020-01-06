import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL='https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization']='AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] ='application/json'

axios.interceptors.request.use(
  request => {
    //edit request config before return the request
    console.log(request);
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  respose => {
    console.log("request", respose);
    return respose;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
