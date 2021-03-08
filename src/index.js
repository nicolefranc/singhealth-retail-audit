import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ApolloProvider from './ApolloProvider';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";

// const httplink = createHttpLink({
//   uri: "http://localhost:5000",
// });

// const client = new ApolloClient({
//   link: httplink,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    {ApolloProvider}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
