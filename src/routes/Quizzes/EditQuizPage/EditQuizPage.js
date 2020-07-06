// React
import React, { useContext } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

// Configuration
import "./EditQuizPage.css";
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";

// Components
import EditQuizForm from "../../../components/Quizzes/EditQuizForm/EditQuizForm";

// Show form to edit category
export default function EditQuizPage() {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Access history
    const history = useHistory();

    // Get path info from Route
    const { url } = useRouteMatch();

    // Get category ID from path parameter
    const { quizId } = useParams();

    function handleDeleteSuccess() {
        // Trigger new API call
        context.setDoFetchData(true);

        // Route user to new main page
        history.push("");
    }

    function handleFormCancel() {
        // Route user to new main page
        history.push("");
    }

    function handleFormSuccess() {
        // Trigger new API call
        context.setDoFetchData(true);

        // Route user to new main page
        history.push("");
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
