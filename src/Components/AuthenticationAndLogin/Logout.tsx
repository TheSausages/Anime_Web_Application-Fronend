import { useEffect } from "react";
import { useAuth } from "./Auth";

interface LogoutProps{
}

export default function Logout(props: LogoutProps) {
    const auth = useAuth();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            auth.signout();
        }
    }, [auth])

    return null;
}