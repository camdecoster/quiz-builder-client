// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./RegistrationForm.css";
import AuthApiService from "../../services/auth-api-service";

export default function RegistrationForm(props) {
    // Initialize state
    const [error, setError] = useState(null);
    const [showPasswordReqs, setShowPasswordReqs] = useState(false);
    const [passwords, setPasswords] = useState({
        password: "",
        passwordRepeat: "",
        match: true,
    });

    function handleSubmit(ev) {
        ev.preventDefault();

        // Get info from form
        const { email, password } = ev.target;

        // Clear previous errors (if they exist)
        setError(null);

        // Submit registration info
        AuthApiService.postUser({
            email: email.value,
            password: password.value,
        })
            .then((res) => {
                email.value = "";
                password.value = "";
                props.onRegistrationSuccess(true);
            })
            .catch((res) => {
                setError(res.error);
            });
    }

    // Make sure passwords entered are the same
    useEffect(() => {
        if (passwords.password !== passwords.passwordRepeat) {
            setError("Passwords do not match");
            setPasswords({ ...passwords, match: false });
        } else {
            setError(null);
            setPasswords({ ...passwords, match: true });
        }
    }, [passwords.password, passwords.passwordRepeat]);

    return (
        <form id='RegistrationForm' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' required />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={passwords.password}
                    onChange={(ev) => {
                        setPasswords({
                            ...passwords,
                            password: ev.target.value,
                        });
                    }}
                    required
                />
            </div>
            <div>
                <label htmlFor='password_repeat'>Enter Password Again</label>
                <input
                    type='password'
                    name='password_repeat'
                    id='password_repeat'
                    value={passwords.passwordRepeat}
                    onChange={(ev) => {
                        setPasswords({
                            ...passwords,
                            passwordRepeat: ev.target.value,
                        });
                    }}
                    required
                />
            </div>
            <button
                id='button_password_reqs'
                type='button'
                onClick={() => setShowPasswordReqs(!showPasswordReqs)}
            >
                Click For Password Requirements
            </button>
            {showPasswordReqs && (
                <div id='password_reqs'>
                    <p>Password requirements:</p>
                    <ul>
                        <li>
                            Password must be between 8 and 72 characters long
                        </li>
                        <li>
                            Password must not start or end with empty spaces
                        </li>
                        <li>
                            Password must contain 1 upper case, lower case,
                            number and special character
                        </li>
                    </ul>
                </div>
            )}
            <button
                id='button_register'
                type='submit'
                disabled={!passwords.match}
            >
                Register
            </button>
            <div>
                <p>
                    Already have an account? <Link to='/login'>Login</Link>.
                </p>
            </div>
            <div role='alert'>
                {error && <p className='errorMessage'>{error}</p>}
            </div>
        </form>
    );
}
