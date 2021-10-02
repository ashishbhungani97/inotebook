import React, { useState } from 'react'
import { Link } from "react-router-dom";



export default function Login() {
    const [formData, updateFormData] = useState({
        email: "",
        password: ""
    })

    const loginProcess = (e) => {
        e.preventDefault();
        
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    }


    return (
        <div className="limiter">
            <div className="container-login100 page-background">
                <div className="wrap-login100">
                    <div className="login100-form validate-form" >
                        <span className="login100-form-logo">
                            <i className="zmdi zmdi-flower"></i>
                        </span>
                        <span className="login100-form-title p-b-34 p-t-27">
                            Log in
                        </span>
                        <div className="wrap-input100 validate-input" datavalidate="Enter email">
                            <input className="input100" type="text" name="email" placeholder="Email" onChange={handleChange} />
                            <span className="focus-input100" dataplaceholder="&#xf207;"></span>
                        </div>
                        <div className="wrap-input100 validate-input" datavalidate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <span className="focus-input100" dataplaceholder="&#xf191;"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={loginProcess} >Login</button>

                        </div>
                        <div className="text-center p-t-90">
                            <Link className="txt1" to="/signup">
                                Do You Don't have Account ?Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
