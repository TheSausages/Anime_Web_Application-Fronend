import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { checkIfLoggedIn } from "../../Scripts/Utilities";
import { useAuth } from "./Auth";

interface LogoutProps{
}

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