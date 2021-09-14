import { useSnackbar } from "notistack";
import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BackendError } from "../../data/General/BackendError";
import { Credentials } from "../../data/General/Credentials";
import { RegistrationBody } from "../../data/General/RegistrationBody";
import { snackbarError, snackBarSuccess } from "../../data/General/SnackBar";
import { UserService } from "../../Scripts/Services/UserService";
import { checkIfLoggedIn } from "../../Scripts/Utilities";

export interface AuthReturn {
    signin: (cred: Credentials) => void;
    signout: () => void;
    register: (regis: RegistrationBody) => void;
    rerenderThisComponent: () => boolean;
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
  
  const signin = async (cred: Credentials) => {
    await UserService.login(cred)
    .then(data => {  
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('username', cred.username);
      localStorage.setItem('refreshIfLaterThen', new Date(new Date().getTime() + data.expires_in*1000).toISOString())
      setRerender(!rerender);

      history.goBack()
      enqueueSnackbar("Logged In Successfully",  snackBarSuccess )
    })
    .catch((error: BackendError) => {
      enqueueSnackbar(error.message,  snackbarError )
    })
  };

  const signout = async () => {
    await UserService.logout()
    .then(data => {
      localStorage.clear();
      setRerender(!rerender);

      history.goBack()
      enqueueSnackbar("Logged Out Successfully",  snackBarSuccess )
    })
    .catch((error: BackendError) => {
      enqueueSnackbar(error.message,  snackbarError )
    })
  };

  const register = async (regis: RegistrationBody) => {
    await UserService.register(regis)
    .then(data => {  
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('username', regis.username);
      localStorage.setItem('refreshIfLaterThen', new Date(new Date().getTime() + data.expires_in*1000).toISOString())
      setRerender(!rerender);

      history.goBack();
      history.goBack();
      enqueueSnackbar("Registered Successfully",  snackBarSuccess )
    })
    .catch((error: BackendError) => {
      enqueueSnackbar(error.message,  snackbarError )
    })
  };

  const rerenderThisComponent = () => {
    return rerender
  }

  return {
    rerenderThisComponent,
    signin,
    register,
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
          (checkIfLoggedIn() ? (
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