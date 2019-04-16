import React from "react";
import PropTypes from "prop-types";
import { render } from "react-testing-library";
//import { ApolloProvider } from "react-apollo";
//import ContextStore from "../Context/ContextStore";
//import client from "../reeemApolloClient";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }) => (
  // <ApolloProvider client={client}>
  //  <ContextStore>
  <BrowserRouter>{children}</BrowserRouter>
  //  </ContextStore>
  //</ApolloProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.any
};
