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
import QuizFormPrivate from "../../../components/Quizzes/QuizFormPrivate/QuizFormPrivate";
import SimpleTable from "../../../components/Tables/SimpleTable/SimpleTable";

export default function QuizPage(props) {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Initialize state
    const [quiz, setQuiz] = useState({});

    // How do I get quiz info for public page? Query API?
    // Do I query API for private page?

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);
    console.log(quizId);

    // Get quiz from API, store in context
    useEffect(() => {
        console.log(id);
        QuizApiService.getQuiz(id).then((res) => {
            console.log(res.quiz);
            setQuiz(res.quiz);
        });
    }, [JSON.stringify(quiz)]);

    // Populate table data
    const data = React.useMemo(() => quiz.questions);

    const columns = React.useMemo(
        () => [
            {
                Header: "Question",
                accessor: (data) => {
                    return <div>{data.question}</div>;
                },
            },
            {
                Header: "Option 1",
                accessor: "option_1",
            },
        ],
        []
    );

    return (
        <section id='QuizPage' className='route_page'>
            {TokenService.hasAuthToken() ? (
                <QuizFormPrivate />
            ) : (
                <p>Public Page</p>
            )}
        </section>
    );
}
