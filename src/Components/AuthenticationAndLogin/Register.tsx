import { yupResolver } from "@hookform/resolvers/yup"
import { makeStyles } from "@material-ui/styles"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import useBasicState from "../../data/General/BasicState"
import { RegistrationBody } from "../../data/General/User/RegistrationBody"
import ButtonCollored from "../Miscellaneous/ButtonCollored"
import TextFieldColored from "../Miscellaneous/TextFieldColored"
import { useAuth } from "./Auth"

import './css/Auth.css'

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
 * The props for the {@link Register} component.
 */
interface RegisterProps {
}

/**
 * Component containing the form used for Registration.
 * @param props {@link RegisterProps}
 */
export default function Register(props: RegisterProps) {
    const auth = useAuth()
    const classes = useStyles()
    const { t } = useBasicState();

    const schema = yup.object().shape({
        username: yup.string().min(6, t("fieldErrors.fieldAtLeastCharacters", { number: 6 })).required(),
        password: yup.string().min(6, t("fieldErrors.fieldAtLeastCharacters", { number: 6 }))
            .matches(/^(?=.+[0-9])(?=.{4,}[a-z])(?=.+[A-Z]).{6,}$/, "Wrong structure!").required(),
        matchingPassword: yup.string().test("password-match",t("fieldErrors.fieldMustMatch", { field: t("auth.register.password") }), function(value) { return this.parent.password === value }).required(),
        email: yup.string().email(t("fieldErrors.fieldIsNotAn", { field: t("auth.register.email") })).required()
    })

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<RegistrationBody>({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            username: '',
            password: '',
            matchingPassword: '',
            email: ''
        }
    })

    return (
        <form onSubmit={handleSubmit(auth.register)} className="wrapper">
            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.username}
                    label={t("auth.register.username")}
                    control={control}
                    formControlName="username"
                />
            </div>

            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.password}
                    label={t("auth.register.password")}
                    type="password"
                    control={control}
                    formControlName="password"
                />
            </div>

            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.matchingPassword}
                    label={t("auth.register.matchingPassword")}
                    type="password"
                    control={control}
                    formControlName="matchingPassword"
                />
            </div>

            <div className={classes.inputSpace}>
                <TextFieldColored errors={errors.email}
                    label={t("auth.register.email")}
                    type="email"
                    control={control}
                    formControlName="email"
                />
            </div>

            <div className={classes.submitButton}>
                <ButtonCollored text={t("input.register")}
                    type="submit"
                    disabled={!isValid}
                />
            </div>
        </form>
    )
}