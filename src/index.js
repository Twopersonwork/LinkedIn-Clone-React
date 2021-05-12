import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div class="loading-scr">
        <div class="loading-animation">
          <img src="/images/home-logo.svg" alt="Linkedin logo" class="logo" />
          <div class="load-bar"></div>
        </div>
      </div>
    )
  );
};


ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
