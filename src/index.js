import React from "react";
import ReactDOM from "react-dom";
import ContextStore from "./Context/ContextStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ContextStore>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextStore>,
  document.getElementById("root")
);
