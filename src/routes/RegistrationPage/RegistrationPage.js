// React
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// Configuration
import "./RegistrationPage.css";

// Components
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
    // Access history
    const history = useHistory();

    // Initialize state
    const [showRegSuccess, setShowRegSuccess] = useState(false);

    function RegistrationSuccess() {
        // Redirect to login page after 10 seconds
        useEffect(() => {
            setTimeout(() => history.push("/login"), 10000);
        }, []);

        return (
            <div>
                Your account was successfully created. Now you can{" "}
                <Link to='/login'>log in</Link> and create your first quiz.
                You'll be redirected in 10 seconds.
            </div>
        );
    }

    return (
        <section id='RegistrationPage' className='route_page'>
            <header>
                <h3>Sign up for Quiz Builder</h3>
            </header>
            {!showRegSuccess ? (
                <RegistrationForm onRegistrationSuccess={setShowRegSuccess} />
            ) : (
                <RegistrationSuccess />
            )}
        </section>
    );
}
