// React
import React, { useContext, useEffect, useState, prop } from "react";
import {
    Link,
    Route,
    Switch,
    useHistory,
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

    // Access history
    const history = useHistory();

    // Initialize state
    const [quiz, setQuiz] = useState({});
    const [score, setScore] = useState(0);

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);

    // Get quiz from context, or use API, only get at first page load
    useEffect(() => {
        if (context.quizzes.length > 0) {
            console.log("getting quiz from context");
            setQuiz(context.quizzes.filter((quiz) => quiz.id === id)[0]);
        } else {
            console.log("getting quiz from API");
            // Get quiz from API, store in state
            QuizApiService.getQuiz(id).then((res) => {
                console.log("API quiz", res);
                // Add quiz info to state
                setQuiz(res.quiz);
            });
        }
    }, []);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    function QuizQuestion({ questions, score, setScore }) {
        // Initialize state
        const [answerSubmitted, setAnswerSubmitted] = useState(false);
        const [userAnswer, setUserAnswer] = useState(null);

        const [localScore, setLocalScore] = useState(score);

        // Get question number from URL parameter
        const { questionNum } = useParams();
        const number = parseInt(questionNum);

        // Save question from questions array
        const question = questions[number - 1];

        // Handle submit button click
        function handleSubmit(event) {
            event.preventDefault();

            const answer = parseInt(event.target.quiz_question.value);

            // Check if answer is correct
            if (answer === question.answer_index) {
                setLocalScore(localScore + 1);
            }

            // Save user answer
            setUserAnswer(answer);

            // Switch answerSubmitted to show question result
            setAnswerSubmitted(true);
        }

        function handleNextClick() {
            // set the quiz score to the local score
            setScore(localScore);

            if (number === questions.length) {
                // Handle quiz summary page
                history.push(`${url}/summary`);
            } else {
                history.push(`${url}/questions/${number + 1}`);
            }
        }

        return (
            <div>
                <p>
                    Question {number} out of {questions.length}
                </p>
                <h4>{question.question}</h4>
                {!!question.image_url ? (
                    <img
                        src={question.image_url}
                        title={question.image_title || "no title given"}
                    />
                ) : (
                    ""
                )}
                {!answerSubmitted ? (
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {question.answers.map((answer, index) => (
                            <QuizAnswer
                                answer={answer}
                                index={index}
                                key={index}
                            />
                        ))}
                        <button type='submit'>Submit Answer</button>
                    </form>
                ) : (
                    <div>
                        <p>
                            Correct answer:{" "}
                            {question.answers[question.answer_index]}
                        </p>
                        <p>Your answer: {question.answers[userAnswer]}</p>
                        {question.answer_index === userAnswer ? (
                            <p>You got it right!</p>
                        ) : (
                            <p>You got it wrong :(</p>
                        )}
                        <button type='button' onClick={() => handleNextClick()}>
                            {number < questions.length
                                ? "Next Question"
                                : "Finish Quiz"}
                        </button>
                    </div>
                )}
                <p>
                    {/* UPDATE SO TOTAL SCORE IS ONLY UP TO CURRENT QUIZ LENGTH */}
                    Score: {localScore} out of {questions.length}
                </p>
            </div>
        );
    }

    function QuizAnswer({ answer, index }) {
        return (
            <div>
                <input
                    type='radio'
                    name='quiz_question'
                    id={`answer${index}`}
                    value={index}
                />
                <label htmlFor={`answer${index}`}>{answer}</label>
            </div>
        );
    }

    function getFinalMessage(scorePercent) {
        if (scorePercent === 1) {
            return quiz.final_message_perfect;
        } else if (scorePercent >= 0.9) {
            return quiz.final_message_high;
        } else if (scorePercent >= 0.7) {
            return quiz.final_message_medium;
        } else {
            return quiz.final_message_low;
        }
    }

    return (
        <section id='QuizPage' className='route_page'>
            {Object.entries(quiz).length > 0 ? (
                <div>
                    <h3>{quiz.title}</h3>
                    <h5>By {quiz.author}</h5>
                    <Switch>
                        <Route path={`${path}/questions/:questionNum`}>
                            {Object.entries(quiz).length > 0 ? (
                                <QuizQuestion
                                    questions={quiz.questions}
                                    score={score}
                                    setScore={setScore}
                                />
                            ) : (
                                <h3>Loading Quiz...</h3>
                            )}
                        </Route>
                        {/* Show final summary page */}
                        <Route path={`${path}/summary`}>
                            {Object.entries(quiz).length > 0 ? (
                                <div>
                                    <p>Quiz Results</p>
                                    <p>
                                        Congratulations! You finished the quiz!
                                        You got {score} out of{" "}
                                        {quiz.questions.length} questions
                                        correct.{" "}
                                        {getFinalMessage(
                                            score / quiz.questions.length
                                        )}{" "}
                                        Press the button if you'd like to try
                                        again.
                                    </p>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            history.push(`${url}`);
                                            setScore(0);
                                        }}
                                    >
                                        Restart Quiz
                                    </button>
                                </div>
                            ) : (
                                <h3>Loading Quiz Summary...</h3>
                            )}
                        </Route>
                        <Route>
                            {/* If no question number given, show quiz start page */}
                            <p>{quiz.description}</p>
                            <button
                                type='button'
                                onClick={() =>
                                    history.push(`${url}/questions/1`)
                                }
                            >
                                Start Quiz
                            </button>
                        </Route>
                    </Switch>
                </div>
            ) : (
                <h3>Loading Quiz...</h3>
            )}
        </section>
    );
}
