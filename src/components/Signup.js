import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import axios from 'axios';


export default function Signup() {

    const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: "all" });
    const [redirect, setredirect] = useState(false)
    const [formData, setformData] = useState({
        email: "",
        password: "",
        confirmpass: "",
        username: ""

    })

    const [matchPass, setmatchPass] = useState({ error: '' })

    const onSubmit = (data) => {
        console.log(data)
        if (data.password !== data.confirmpass) {
            setmatchPass({ error: 'Password Not Match !' });
            return false;
        }

        setformData({
            ...data
        });

        const { confirmpass, ...rest } = data

        
        const headers = {
            'Authorization': 'Bearer my-token',
            'Accept' : '*/*',
            'Content-Type' : 'application/json' 
        };
        axios.post('http://localhost:3001/api/auth/createuser', rest, { headers })
            .then((response) =>{
                
            });



    }



    return (
        <div>
            <div className="limiter">
                <div className="container-login100 page-background">
                    <div className="wrap-login100">
                        <form className="login100-form" onSubmit={handleSubmit(onSubmit)}>
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-flower"></i>
                            </span>
                            <span className="login100-form-title p-b-34 p-t-27">
                                Registration
                            </span>
                            <div className="row">
                                <div className="col-lg-12 p-t-20">
                                    <div className="wrap-input100 validate-input" datavalidate="Enter username">
                                        <input className="input100" type="text" name="username" placeholder="Username" {...register("username", {
                                            required: "This input is required.",
                                            minLength: {
                                                value: 5,
                                                message: "This input must Be 5 characters"
                                            }
                                        })} />


                                        <span className="focus-input100" data-placeholder="&#xf207;"></span>
                                    </div>
                                    <ErrorMessage
                                        errors={errors}
                                        name="username"
                                        render={({ messages }) => {
                                            return messages
                                                ? Object.entries(messages).map(([type, message]) => (
                                                    <p className="text-danger" key={type}>{message}</p>
                                                ))
                                                : null;
                                        }}
                                    />
                                </div>
                                <div className="col-lg-12 p-t-20">
                                    <div className="wrap-input100 validate-input" datavalidate="Enter email">
                                        <input className="input100" type="text" name="email" placeholder="Email" {...register("email", {
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
                                </div>
                                <div className="col-lg-12 p-t-20">
                                    <div className="wrap-input100 validate-input" datavalidate="Enter password">
                                        <input className="input100" type="password" name="password" placeholder="Password"  {...register("password", {
                                            required: "This input is required.",
                                            pattern: {
                                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                                message: "Password must at least one special character,one number and 6 to 16 Charater !"
                                            }
                                        })} />
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>
                                    </div>
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ messages }) => {
                                            return messages
                                                ? Object.entries(messages).map(([type, message]) => (
                                                    <p className="text-danger" key={type}>{message}</p>
                                                ))
                                                : null;
                                        }}
                                    />
                                </div>
                                <div className="col-lg-12 p-t-20">
                                    <div className="wrap-input100 validate-input" datavalidate="Enter password again">
                                        <input className="input100" type="password" name="confirmpass" placeholder="Confirm password" {...register("confirmpass", {
                                            required: "This input is required."
                                        }
                                        )} />
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>
                                    </div>
                                    <p className="text-danger">{matchPass.error}</p>
                                </div>
                            </div>

                            <div className="container-login100-form-btn">
                                <input value="SignUp" type="submit" style={{ "background": "#fff" }} className="login100-form-btn" />

                            </div>
                            <div className="text-center p-t-90">
                                <Link className="txt1" to="/login">
                                    You already have a member?Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
