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
  const [rerender, setRerender] = useState(false); //
  const { state } = useLocation();
  
  const signin = async (username, password) => {
    await loginUser({
      username,
      password
    })
    .then(data => {
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      setRerender(true);
    });

    history.push(state === undefined || state.from === undefined ? '/' : state.from.pathname);
  };

  const signout = async () => {
    await logout()
    .then(data => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setRerender(true);
    })

    history.push('/');
  };

  const rerenderThisComponent = () => {
    return rerender
  }

  return {
    rerenderThisComponent,
    signin,
    signout
  };
}

export function PrivateRoute({ children, path, ...rest }) {
    return (
      <Route
        {...rest}
        render={({location}) =>
          (localStorage.getItem('accessToken') !== undefined && localStorage.getItem('accessToken')) ? (
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
  .then( data => { return data})
  .catch(error => {
    console.log("Error during login:" + error)
  })
}

async function logout() {
  let headers = new Headers({
    "Authorization": "Bearer " + localStorage.getItem('accessToken')
  })

  await fetch('http://localhost:8080/logoutUser', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({refreshToken: localStorage.getItem('refreshToken')})
  })
  .catch(error => {
    console.log("Error during login:" + error)
  })
}
