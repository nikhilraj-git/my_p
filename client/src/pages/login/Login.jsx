import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
   const history = useHistory();

  const handleLogin = async (e) => {
    console.log("111111111");
    e.preventDefault();
    try{
      login({ email, password }, dispatch);
      
        await axios.post("/auth/login", { email, password });
        history.push("/");

    }

    catch(err)
    {
      console.log("AAAAAAAAAAA",err);
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
        <div className='logo'>
                    <h1>WATCHNOW</h1>
                </div>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}