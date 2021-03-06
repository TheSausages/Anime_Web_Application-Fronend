import { useAuth } from "./Auth";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { Credentials } from "../../data/General/User/Credentials";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/styles";
import TextFieldColored from "../Miscellaneous/TextFieldColored";
import ButtonCollored from "../Miscellaneous/ButtonCollored";
import { Link } from "react-router-dom";

import './css/Auth.css'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    inputSpace: {
        width: '80%',
        marginBottom: '15px',
    },
    input: {
      width: '100%',
    },
    submitButton: {
        marginTop: '25px',
    }
}));

/**
 * The props for the {@link Login} component.
 */
interface LoginProps {
}

/**
 * Component contraining the form for logging in.
 * Should also containg a link to the registration component.
 * @param props {@link LoginProps}
 */
export default function Login(props: LoginProps) {
    const auth = useAuth();
    const classes = useStyles();
    const { t } = useTranslation();

    const schema = yup.object().shape({
        username: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: t("auth.login.username") })),
        password: yup.string().required(t("fieldErrors.fieldCannotBeEmpty", { field: t("auth.login.password") }))
    })
    

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<Credentials>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            username: '',
            password: ''
        }   
    })

    return(
        <form onSubmit={handleSubmit(auth.signin)} className="wrapper">
            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.username}
                    label={t("auth.login.username")}
                    control={control}
                    formControlName="username"
                />
            </div>

            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.password}
                    label={t("auth.login.password")}
                    type="password"
                    control={control}
                    formControlName="password"
                />
            </div>

            <div className={classes.submitButton}>
                <ButtonCollored text={t("auth.login.logIn")}
                    type="submit"
                    disabled={!isValid}
                />
            </div>

            <div id="registerText">
                <Link to="/register">{t("auth.register.registerTextUnderLogin")}</Link>
            </div>
      </form>
    )
}
