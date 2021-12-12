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

/**
 * Properties retuned by the {@link authContext}. The values are set in {@link useProvideAuth}.
 */
export interface AuthReturn {
    /** Method used to log in. */
    signin: (cred: Credentials) => void;

    /** Method used to log out a user. */
    signout: () => void;

    /** Method used to register a user. */
    register: (regis: RegistrationBody) => void;

    /** 
     * When this method is used in a component, it will be rerendered when a user logs in/out.
     * Example use:
     * ```typescript
     * const rerender = useAuth().rerenderThisComponent() 
     * ```
    */
    rerenderThisComponent: () => boolean;
}

/**
 * Context for the authentification in the app. The values are provided in {@link useProvideAuth}.
 */
const authContext = createContext<AuthReturn>({} as AuthReturn);

/**
 * The props for {@link ProvideAuth}
 */
export interface ProvideAuthProps {
    /** The element that should be able to use the context. */
    children: React.ReactNode
}

/**
 * Main method for setting the provider of the authentication context.
 * @returns The provider for the auth context.
 */
export function ProvideAuth(props: ProvideAuthProps) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

/**
 * Method to get the auth context in any component. The component must be inside {@link ProvideAuth}!
 * @returns the context containing all method and fields needed for authetification inside the app.
 */
export const useAuth = () => {
    return useContext(authContext);
};

/**
 * Method used to provide the values for {@link AuthReturn}. These are set inside {@link ProvideAuth}
 * @returns The values for {@link AuthReturn}.
 */
function useProvideAuth(): AuthReturn {
    let history = useHistory();
    const { startListeningForAchievements, stopListeningForAchievements } = useAchievementService();
    const { snackbar, t, i18n } = useBasicState()
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

        UserService.logout(t, i18n)
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
        await UserService.register(regis, t, i18n)
        .then(data => {  
            localStorage.setItem(AuthenticationProperties.accessTokenItem, data.access_token);
            localStorage.setItem(AuthenticationProperties.refreshTokenItem, data.refresh_token);
            localStorage.setItem(AuthenticationProperties.usernameItem, regis.username);
            localStorage.setItem(AuthenticationProperties.refreshIfAfterItem, new Date(new Date().getTime() + data.expires_in*1000).toISOString())
            setRerender(!rerender);
            startListeningForAchievements();

            snackbar(t("auth.registerSuccessfull"), snackBarSuccess)
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

/**
 * Small helper method that cleans all data used for authetification from the localstorage.
 */
export function clearTokenFields() {
    localStorage.removeItem(AuthenticationProperties.accessTokenItem)
    localStorage.removeItem(AuthenticationProperties.refreshTokenItem)
    localStorage.removeItem(AuthenticationProperties.refreshIfAfterItem)
}

/**
 * The props for {@link PrivateRoute}. 
 * The children should consist of the component that will be accessed when the user is logged in.
 */
export interface PrivateRouteProps {
    /** Path to the original route/component. */
    path: string,

    /** The component that will be rendered when the user is logged in. */
    children: React.ReactNode
}

/**
 * A {@link Route} variant. When the user is not logged in, he/she will be redirected to the login screen.
 * If the user is logged in, it is a simple route.
 */
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