// React
import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";

// Configuration
import "./EditCategoryPage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditCategoryForm from "../../../components/Categories/EditCategoryForm/EditCategoryForm";

// Show form to edit category
export default function EditCategoryPage() {
    // Access history
    const history = useHistory();

    // Get path info from Route
    const { url } = useRouteMatch();

    // Get category ID from path parameter
    const { categoryId } = useParams();

    function handleDeleteSuccess() {
        history.push("/categories");
    }

    function handleFormCancel() {
        history.push("/categories");
    }

    function handleFormSuccess() {
        // Route user to new category
        history.push(url);
    }

    return (
        <section id='EditCategoryPage'>
            <header role='banner'>
                <h1>Edit Category</h1>
            </header>
            {/* <Link to='/categories'>Back to all categories</Link> */}
            <EditCategoryForm
                id={categoryId}
                onCancel={handleFormCancel}
                onDeleteSuccess={handleDeleteSuccess}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}
