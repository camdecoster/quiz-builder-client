// React
import React from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./NewCategoryPage.css";
// import TrackerContext from "../../contexts/TrackerContext";
// import ExpenseApiService from "../../services/expense-api-service";

// Components
import NewCategoryForm from "../../../components/Categories/NewCategoryForm/NewCategoryForm";

function NewCategoryPage() {
    // Access context
    // const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    function handleFormSuccess(newItemPath) {
        // Route user to new item
        history.push(newItemPath);
    }

    function handleFormCancel() {
        history.push("/categories");
    }

    return (
        <section id='NewCategoryPage' className='route_page'>
            <header role='banner'>
                <h2>Add New Budget Category</h2>
            </header>
            <NewCategoryForm
                onCancel={handleFormCancel}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}

export default NewCategoryPage;
