import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { UsersContextProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <UsersContextProvider>
          <App />
          </UsersContextProvider>
          </ListContextProvider>
     
          </MovieContextProvider>
       
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
