// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Configuration
import "./RegistrationPage.css";

// Components
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

class RegistrationPage extends Component {
    handleRegistrationSuccess = () => {
        // Route user to login page
        this.props.history.push("/login");
    };

    render() {
        return (
            <section id='RegistrationPage' className='route_page'>
                <header>
                    <h3>Sign up for Expense Tracker</h3>
                </header>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </section>
        );
    }
}

export default withRouter(RegistrationPage);
