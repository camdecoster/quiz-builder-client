// React
import React, { useContext, useEffect, useState, prop } from "react";
import {
    Link,
    Route,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";

// Configuration
import "./QuizPage.css";
import QuizApiService from "../../../services/quiz-api-service";
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";
import TokenService from "../../../services/token-service";

// Components
import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";
import SimpleTable from "../../../components/Tables/SimpleTable/SimpleTable";

export default function QuizPage(props) {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Initialize state
    const [quiz, setQuiz] = useState({});

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);

    // Get quiz or start new one
    useEffect(() => {
        console.log("Loading existing quiz");
        // Get quiz from API, store in state
        QuizApiService.getQuiz(id).then((res) => {
            // Add quiz info to state
            setQuiz(res.quiz);
        });
    }, []);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    return (
        <section id='QuizPage' className='route_page'>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button type='button'>Start Quiz</button>
        </section>
    );
}
