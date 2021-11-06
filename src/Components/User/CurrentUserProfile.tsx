import { useCallback, useEffect, useState } from "react"
import { BackendError } from "../../data/General/BackendError";
import useBasicState from "../../data/General/BasicState";
import { snackbarError } from "../../data/General/SnackBar";
import { CompleteUser } from "../../data/General/User/User";
import { UserService } from "../../Scripts/Services/UserService";
import Loading from "../Loading/Loading";
import UserProfile from "./UserProfile";

interface CurrentUserProfileProps {
}

export default function CurrentUserProfile(props: CurrentUserProfileProps) {
    const { t, i18n, snackbar, loading, startLoading, stopLoading, error, setErrorMessage } = useBasicState();
    const [currentUserInformation, setCurrentUserInformation] = useState<CompleteUser>();

    const getCurrentUserInformation = useCallback(async () => {
        await UserService.currentUserProfile(t, i18n)
        .then((response: CompleteUser) => setCurrentUserInformation(response))
        .catch((error: BackendError) => {
            snackbar(error.message, snackbarError);
            setErrorMessage(error.message);
        })
    }, [t, i18n, snackbar, setErrorMessage])

    useEffect(() => {
        startLoading();

        getCurrentUserInformation();

        stopLoading();
    }, [startLoading, stopLoading, getCurrentUserInformation])

    if (loading || !currentUserInformation) {
        return <Loading error={error} />
    }

    return (
        <div>
            AAAAA
            <UserProfile user={currentUserInformation} />
        </div>
    )
}