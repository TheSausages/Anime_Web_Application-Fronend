import { useSnackbar } from "notistack";
import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BackendError } from "../../data/General/BackendError";
import { Credentials } from "../../data/General/Credentials";
import { snackbarError, snackBarSuccess } from "../../data/General/SnackBar";
import { UserService } from "../../Scripts/Services/UserService";

export interface AuthReturn {
    signin: (username: string, password: string) => void
    signout: () => void
    rerenderThisComponent: () => boolean
}

const authContext = createContext<AuthReturn>({} as AuthReturn);

interface ProvideAuthProps {
    children: React.ReactNode
}

export function ProvideAuth(props: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(): AuthReturn {
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [rerender, setRerender] = useState<boolean>(false);
  
  const signin = async (username: string, password: string) => {
    await UserService.login({username, password} as Credentials)
    .then(data => {  
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      setRerender(!rerender);

      history.goBack()
      enqueueSnackbar("Loged In",  snackBarSuccess )
    })
    .catch((error: BackendError) => {
      enqueueSnackbar(error.message,  snackbarError )
    })
  };

  const signout = async () => {
    await UserService.logout()
    .then(data => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setRerender(!rerender);
    })
    .catch((error: BackendError) => {
      enqueueSnackbar(error.message,  snackbarError )
    })

    history.push("/")
  };

  const rerenderThisComponent = () => {
    return rerender
  }

  return {
    rerenderThisComponent,
    signin,
    signout,
  };
}

interface PrivateRouteProps {
  path: string,
  children: React.ReactNode
}

export function PrivateRoute(props: PrivateRouteProps) {  
  return (
      <Route
        render={({location}) =>
          (localStorage.getItem('accessToken') ? (
            props.children
          ) : (
            <Redirect push to={{
              pathname: '/login',
              state: { from: location }
            }}
            />
          ))
        }
      />
    );
  }