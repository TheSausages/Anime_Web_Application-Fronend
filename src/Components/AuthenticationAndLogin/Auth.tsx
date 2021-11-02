import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BackendError } from "../../data/General/BackendError";
import useBasicState from "../../data/General/BasicState";
import { Credentials } from "../../data/General/User/Credentials";
import { RegistrationBody } from "../../data/General/User/RegistrationBody";
import { snackbarError, snackBarSuccess } from "../../data/General/SnackBar";
import { UserService } from "../../Scripts/Services/UserService";
import { checkIfLoggedIn } from "../../Scripts/Utilities";
import useAchievementService from "../../Scripts/Services/AchievementService";
import { AuthenticationProperties } from "../../Properties/AuthenticationProperties";
import { useTranslation } from "react-i18next";

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
    const { startListeningForAchievements, stopListeningForAchievements } = useAchievementService();
    const { snackbar } = useBasicState()
    const { t, i18n } = useTranslation();
    const [rerender, setRerender] = useState<boolean>(false);
  
    const signin = async (cred: Credentials) => {
        await UserService.login(cred, t, i18n)
        .then(data => {  
            localStorage.setItem(AuthenticationProperties.accessTokenItem, data.access_token);
            localStorage.setItem(AuthenticationProperties.refreshTokenItem, data.refresh_token);
            localStorage.setItem(AuthenticationProperties.usernameItem, cred.username);
            localStorage.setItem(AuthenticationProperties.refreshIfAfterItem, new Date(new Date().getTime() + data.expires_in*800).toISOString())
            setRerender(!rerender);
            startListeningForAchievements();

            history.goBack()
            snackbar(t("auth.loginSuccessfull"),  snackBarSuccess)
        })
        .catch((error: BackendError) => snackbar(error.message,  snackbarError))
    };

    const signout = () => {
        stopListeningForAchievements();

        UserService.logout()
        .then(data => {
            clearTokenFields();
            setRerender(!rerender);

            snackbar(t("auth.logoutSuccessfull"),  snackBarSuccess)
            history.push("/")
        })
        .catch((error: BackendError) => {
            startListeningForAchievements()
            snackbar(error.message,  snackbarError )
        })
    };

    const register = async (regis: RegistrationBody) => {
        await UserService.register(regis)
        .then(data => {  
            localStorage.setItem(AuthenticationProperties.accessTokenItem, data.access_token);
            localStorage.setItem(AuthenticationProperties.refreshTokenItem, data.refresh_token);
            localStorage.setItem(AuthenticationProperties.usernameItem, regis.username);
            localStorage.setItem(AuthenticationProperties.refreshIfAfterItem, new Date(new Date().getTime() + data.expires_in*1000).toISOString())
            setRerender(!rerender);
            startListeningForAchievements();

            snackbar(t("auth.registerSuccessfull"),  snackBarSuccess)
            history.push("/")
        })
        .catch((error: BackendError) => snackbar(error.message,  snackbarError))
    };

    const rerenderThisComponent = () => {
        return rerender
    }

    return {
        rerenderThisComponent,
        signin: signin,
        register,
        signout,
    };
}

export function clearTokenFields() {
    localStorage.removeItem(AuthenticationProperties.accessTokenItem)
    localStorage.removeItem(AuthenticationProperties.refreshTokenItem)
    localStorage.removeItem(AuthenticationProperties.refreshIfAfterItem)
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
                    }} />
                ))
            }
        />
    );
}