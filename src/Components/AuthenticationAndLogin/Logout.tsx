import { useEffect } from "react";
import { useAuth } from "./Auth";

interface LogoutProps{
}

export default function Logout(props: LogoutProps) {
    const auth = useAuth();

    useEffect(() => {
        auth.signout();
    }, [])

    return null;
}