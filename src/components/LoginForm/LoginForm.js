// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./LoginForm.css";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

export default function LoginForm(props) {
    const [error, setError] = useState(null);

    function handleSubmit(ev) {
        ev.preventDefault();

        // Get info from form
        const { email, password } = ev.target;

        // Clear previous errors (if they exist)
        setError(null);

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then((res) => {
                email.value = "";
                password.value = "";
                TokenService.saveAuthToken(res.authToken);
                props.onLoginSuccess();
            })
            .catch((res) => {
                setError(res.error);
            });
    }

    return (
        <form className='LoginForm' onSubmit={(event) => handleSubmit(event)}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    // Use default value if one is passed in (like for demo account)
                    defaultValue={props.email ? props.email : ""}
                    required
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    // Use default value if one is passed in (like for demo account)
                    defaultValue={props.password ? props.password : ""}
                    required
                />
            </div>
            <button type='submit'>Sign In</button>
            {/* Add reset option later */}
            {/* <div>
                    <p>Reset your password</p>
                </div> */}
            <div>
                <p>
                    <Link to='/register'>Register</Link> for a new account
                </p>
            </div>
            <div role='alert'>
                {error && <p className='errorMessage'>{error}</p>}
            </div>
        </form>
    );
}
