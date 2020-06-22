// React
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

// Configuration
import "./NewExpensePage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import NewExpenseForm from "../../../components/Expenses/NewExpenseForm/NewExpenseForm";

// Show form to edit expense
export default function EditExpensePage() {
    // Access history
    const history = useHistory();

    // Get path info from Route
    // const { path, url } = useRouteMatch();

    // Get element ID from path parameter
    const { expenseId } = useParams();

    function handleFormCancel() {
        history.push("/expenses");
    }

    function handleFormSuccess(newItemPath) {
        // Route user to new item
        history.push(newItemPath);
    }

    return (
        <section id='NewExpensePage'>
            <header role='banner'>
                <h1>New Expense</h1>
            </header>
            {/* <Link to='/expenses'>Back to all expenses</Link> */}
            <NewExpenseForm
                id={expenseId}
                onCancel={handleFormCancel}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}
