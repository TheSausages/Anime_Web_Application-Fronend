import { useAuth } from "./Auth";
import React, { useState } from 'react';
//import { useHistory, useLocation } from "react-router-dom";
import '../ComponentsCss/Login.css'


export default function Login(props) {
    const auth = useAuth();
    //let location = useLocation();
    //let history = useHistory();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // this gets the url of class, but cant redirect: let { from } = location.state || { from: { pathname: "/" } };
    const login = e => {
      e.preventDefault();

      auth.signin(username, password);
    }

    if (props.out) {
      auth.signout();

      return null;
    } else {
      return(
        <div className="login-wrapper">
          <form onSubmit={login}>
            <label htmlFor='username'>
              <p>Username</p>
              <input type="text" name='username' id='username' autoComplete="on" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label htmlFor='password'>
              <p>Password</p>
              <input type="password" name='password' id='password' autoComplete="on" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div className='LogInButton'>
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      )
    }
}
