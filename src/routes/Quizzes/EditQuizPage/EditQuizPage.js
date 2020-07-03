// React
import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";

// Configuration
import "./EditQuizPage.css";

// Components
import EditQuizForm from "../../../components/Quizzes/EditQuizForm/EditQuizForm";

// Show form to edit category
export default function EditQuizPage() {
    // Access history
    const history = useHistory();

    // Get path info from Route
    const { url } = useRouteMatch();

    // Get category ID from path parameter
    const { quizId } = useParams();

    function handleDeleteSuccess() {
        history.push("/quizzes");
    }

    function handleFormCancel() {
        history.push("");
    }

    function handleFormSuccess() {
        // Route user to new quiz
        history.push("/quizzes");
    }

    return (
        <section id='EditQuizPage'>
            <header role='banner'>
                <h1>Edit Quiz</h1>
            </header>
            <EditQuizForm
                id={quizId}
                onCancel={handleFormCancel}
                onDeleteSuccess={handleDeleteSuccess}
                onSubmitSuccess={handleFormSuccess}
            />
        </section>
    );
}
