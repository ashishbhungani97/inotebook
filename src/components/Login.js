import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import userContext from '../context/notes/UserContext';
import { useHistory } from "react-router";



export default function Login() {
    const history = useHistory();
    const { state, loginUser, updateState, } = useContext(userContext);
    const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: "all" });
    const [formData, updateFormData] = useState({
        email: "",
        password: ""
    })

    const onSubmit = async (data) => {
        updateFormData({ ...data });
        updateState({});

        await loginUser(data);

       console.log(state);
            if (state.error === 'OK') {
                alert(state.message)
            }
        


    }


    return (
        <div className="limiter">
            <div className="container-login100 page-background">
                <div className="wrap-login100">
                    <form className="login100-form" onSubmit={handleSubmit(onSubmit)} >
                        <span className="login100-form-logo">
                            <i className="zmdi zmdi-flower"></i>
                        </span>
                        <span className="login100-form-title p-b-34 p-t-27">
                            Log in
                        </span>
                        <div className="wrap-input100" datavalidate="Enter email">
                            <input className="input100" type="text" name="email" placeholder="Email"
                                {...register("email", {
                                    required: "This input is required.",
                                    pattern: {
                                        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                        message: "Enter A Valid Email !"
                                    }
                                })} />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className="text-danger" key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                        <div className="wrap-input100" datavalidate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password"  {...register("password", {
                                required: "This input is required.",
                            })} />
                            <span className="focus-input100" data-placeholder="&#xf191;"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">Login</button>

                        </div>
                        <span className={`${state.error === 'OK' ? 'text-warning' : 'text-danger'} mt-5 login100-form-title`} style={{ fontSize: "11px" }}>{state.message}</span>
                        <div className="text-center p-t-90">
                            <Link className="txt1" to="/signup">
                                Do You Don't have Account ?Signup
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
