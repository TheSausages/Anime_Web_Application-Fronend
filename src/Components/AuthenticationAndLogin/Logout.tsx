import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { checkIfLoggedIn } from "../../Scripts/Utilities";
import { useAuth } from "./Auth";

/**
 * The props for the {@link Logout} component.
 */
interface LogoutProps{
}

/**
 * Component used to logout the user. Should redirect to the Main Page after log out.
 * @param props {@link LogoutProps}
 */
export default function Logout(props: LogoutProps) {
    const auth = useAuth();

    useEffect(() => {
        if (checkIfLoggedIn()) {
            auth.signout();
        }
    }, [auth])

    return (
        <Redirect to="/" />
    )
}