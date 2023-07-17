import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Series from "./pages/series/Series1";
import Movie from './pages/movies/Movie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Chatgpt from "./components/chatGPT/chatgpt";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
    <Switch>
    <Route path="/chatgpt">
            <Chatgpt></Chatgpt>
          </Route>
      <Route exact path="/">
      {user ? <Home /> : <Redirect to="/register" />}
      </Route>
      <Route path="/register">
        
        <Register /> 
      </Route>
      <Route path="/login">{!user ?<Login /> : <Redirect to="/"/>}</Route>
     
       
      {user && (
          <>
            <Route path="/movies">
             <Movie type="Movies"></Movie>
            </Route>
            <Route path="/series">
             <Series type="Series"></Series>
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
          
        
    
    </Switch>
  </Router>
  )
};

export default App;