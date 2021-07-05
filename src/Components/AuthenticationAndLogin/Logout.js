import { useAuth } from "./Auth";

export default function Logout(props) {
    const auth = useAuth();

    auth.signout();

    return null;
}