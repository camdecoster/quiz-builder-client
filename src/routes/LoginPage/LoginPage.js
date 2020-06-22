// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./LoginPage.css";
import TrackerContext from "../../contexts/TrackerContext";

// Components
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    function handleLoginSuccess() {
        // Trigger fetching of these items by causing rerender
        context.setCategories([]);
        context.setPayment_methods([]);
        context.setExpenses([]);

        // Route user to dashboard
        history.push("/");
    }

    return (
        <section id='LoginPage' className='route_page'>
            <header role='banner'>
                <h1>Log in to Expense Tracker</h1>
            </header>
            {!!props.message ? <h2 id='demo_message'>{props.message}</h2> : ""}

            <LoginForm
                onLoginSuccess={handleLoginSuccess}
                email={props.email}
                password={props.password}
            />
        </section>
    );
}
