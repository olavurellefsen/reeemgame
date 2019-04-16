import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ContextStore from "./Context/ContextStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import client from "./reeemApolloClient";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextStore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextStore>
  </ApolloProvider>,
  document.getElementById("root")
);
