import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

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
  const { state } = useLocation();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  
  const signin = async (username, password) => {
    await loginUser({
      username,
      password
    })
    .then(data => {
      setAccessToken(data.access_token)
      setRefreshToken(data.refresh_token)
    });

    history.push(state === undefined || state.from === undefined ? '/' : state.from.pathname);
  };

  const signout = async () => {
    await logout(accessToken, refreshToken)
    .then(data => {
      setAccessToken(null)
      setRefreshToken(null)
    })

    history.push('/');
  };

  
  return {
    accessToken,
    refreshToken,
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
          (auth !== undefined && auth.accessToken) ? (
            children
          ) : (
            <Redirect push to={{
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
  .then( data => data.json())
  .then( data => {
    return data
  })
  .catch(error => {
    console.log("Error during login:" + error)
  })
}

async function logout(accessToken, refreshToken) {
  let headers = new Headers({
    "Authorization": "Bearer " + accessToken
  })

  return await fetch('http://localhost:8080/logoutUser', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({refreshToken: refreshToken})
  })
  .then(data => {return data})
  .catch(error => {
    console.log("Error during login:" + error)
  })
}
