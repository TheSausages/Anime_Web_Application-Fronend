import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  let history = useHistory();
  const [token, setToken] = useState(null);
  
  const signin = async (username, password) => {
    loginUser({
            username,
            password
        })
        .then(data => {
            setToken(data)
        });

    history.push('/');
  };

  const signout = () => {
    setToken(false);

    history.push('/');
  };

  
  return {
    token,
    signin,
    signout
  };
}

export function PrivateRoute({ children, path, ...rest }) {
    let auth = useAuth();

    return (
      <Route
        {...rest}
        render={({location}) =>
          (auth !== undefined && auth.token) ? (
            children
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
          }}
        />
          )
        }
      />
    );
  }

async function loginUser(credentials) {
    let headers = new Headers({
        "Content-Type": "application/json",
    })

    return await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(credentials)
    })
    .then( data => data.headers.get("Authorization"))
    .then( data => {
        return data
    })
    .catch(error => {
        console.log("Error:" + error)
    })
}

/*async function logoutUser(token) {

}*/
   