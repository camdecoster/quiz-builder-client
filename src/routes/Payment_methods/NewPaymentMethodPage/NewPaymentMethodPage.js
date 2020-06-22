// React
import React from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./NewPaymentMethodPage.css";

// Components
import NewPaymentMethodForm from "../../../components/Payment_methods/NewPaymentMethodForm/NewPaymentMethodForm";

export default function NewPaymentMethodPage() {
    // Access context
    // const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    function handleFormSuccess(newItemPath) {
        // Route user to new item
        history.push(newItemPath);
    }

    function handleFormCancel() {
        history.push("/payment-methods");
    }

    return (
        <section id='NewPaymentMethodPage' className='route_page'>
            <header role='banner'>
                <h2>Add New Payment Method</h2>
            </header>
            <NewPaymentMethodForm
                onCancel={handleFormCancel}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}
