import { useAuth } from "./Auth";
import * as yup from "yup"
import './css/Login.css'
import { Controller, useForm } from "react-hook-form";
import { Credentials } from "../../data/General/Credentials";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/styles";
import TextFieldColored from "../Miscellaneous/TextFieldColored";
import ButtonCollored from "../Miscellaneous/ButtonCollored";
import { Link } from "react-router-dom";

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

interface LoginProps {
}

const schema = yup.object().shape({
    username: yup.string().required("Login cannot be empty"),
    password: yup.string().required("Password cannot be empty")
})

export default function Login(props: LoginProps) {
    const auth = useAuth();
    const classes = useStyles();

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

            <div className={classes.submitButton}>
                <ButtonCollored text="Log In"
                    type="submit"
                    disabled={!isValid}
                />
            </div>

            <div id="registerText">
                <Link to="/register">No Account? Register!</Link>
            </div>
      </form>
    )
}
