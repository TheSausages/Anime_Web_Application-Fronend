import { yupResolver } from "@hookform/resolvers/yup"
import { makeStyles } from "@material-ui/styles"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { RegistrationBody } from "../../data/General/RegistrationBody"
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

interface RegisterProps {
}

const schema = yup.object().shape({
    username: yup.string().min(6, "Must be at least 6 characters!").required(),
    password: yup.string().min(6, "Must be at least 6 characters!").matches(/^(?=.+[0-9])(?=.{4,}[a-z])(?=.*[A-Z]).{6,}$/, "Password must have the correct structure").required(),
    matchingPassword: yup.string().test("password-match", "Passwords must match!", function(value) { return this.parent.password === value }).required(),
    email: yup.string().email("Value is not an Email!").required()
})

export default function Register(props: RegisterProps) {
    const auth = useAuth()
    const classes = useStyles()

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
                <Controller render={({field}) => (
                    <TextFieldColored
                        field={field}
                        errors={errors.username}
                        label="Username"
                    />
                )}
                control={control}
                name="username"
                />
            </div>

            <div className={classes.inputSpace}>
                <Controller render={({field}) => (
                    <TextFieldColored
                        field={field}
                        errors={errors.password}
                        label="Password"
                        type="password"
                    />
                )}
                control={control}
                name="password"
                />
            </div>

            <div className={classes.inputSpace}>
                <Controller render={({field}) => (
                    <TextFieldColored
                        field={field}
                        errors={errors.matchingPassword}
                        label="Repeat Password"
                        type="password"
                    />
                )}
                control={control}
                name="matchingPassword"
                />
            </div>

            <div className={classes.inputSpace}>
                <Controller render={({field}) => (
                    <TextFieldColored
                        field={field}
                        errors={errors.email}
                        label="Email"
                        type="email"
                    />
                )}
                control={control}
                name="email"
                />
            </div>

            <div className={classes.submitButton}>
                <ButtonCollored text="Register"
                    type="submit"
                    disabled={!isValid}
                />
            </div>
        </form>
    )
}