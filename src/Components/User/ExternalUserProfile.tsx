import { useState, useCallback, useEffect } from "react";
import { BackendError } from "../../data/General/BackendError";
import useBasicState from "../../data/General/BasicState";
import { snackbarError } from "../../data/General/SnackBar";
import { CompleteUser } from "../../data/General/User/User";
import { UserService } from "../../Scripts/Services/UserService";
import Loading from "../Loading/Loading";
import UserProfile from "./UserProfile";

interface ExternalUserProfileProps {
    userId: string;
}

export default function ExternalUserProfile(props: ExternalUserProfileProps) {
    const { t, i18n, snackbar, loading, startLoading, stopLoading, error, setErrorMessage } = useBasicState();
    const [userInformation, setUserInformation] = useState<CompleteUser>();

    const getUserInformation = useCallback(async () => {
        await UserService.userProfileById(props.userId, t, i18n)
        .then((response: CompleteUser) => setUserInformation(response))
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError);
            setErrorMessage(error.message);
        })
    }, [t, i18n, props.userId, snackbar, setErrorMessage])

    useEffect(() => {
        startLoading();

        getUserInformation();

        stopLoading();
    }, [startLoading, stopLoading, getUserInformation])

    if (loading || !userInformation) {
        return <Loading error={error} />
    }

    return (
        <UserProfile user={userInformation} />
    )
}