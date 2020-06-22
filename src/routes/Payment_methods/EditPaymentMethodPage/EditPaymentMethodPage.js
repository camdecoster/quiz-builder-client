// React
import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";

// Configuration
import "./EditPaymentMethodPage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditPaymentMethodForm from "../../../components/Payment_methods/EditPaymentMethodForm/EditPaymentMethodForm";

// Show form to edit payment method
export default function EditPaymentMethodPage() {
    // Access history
    const history = useHistory();

    // Get path info from Route
    const { url } = useRouteMatch();

    // Get payment method ID from path parameter
    const { payment_methodId } = useParams();

    function handleDeleteSuccess() {
        history.push("/payment-methods");
    }

    function handleFormCancel() {
        history.push("/payment-methods");
    }

    function handleFormSuccess() {
        // Route user to new payment method
        history.push(url);
    }

    return (
        <section id='EditPaymentMethodPage'>
            <header role='banner'>
                <h1>Edit Payment Method</h1>
            </header>
            {/* <Link to='/payment-methods'>Back to all payment methods</Link> */}
            <EditPaymentMethodForm
                id={payment_methodId}
                onCancel={handleFormCancel}
                onDeleteSuccess={handleDeleteSuccess}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}
