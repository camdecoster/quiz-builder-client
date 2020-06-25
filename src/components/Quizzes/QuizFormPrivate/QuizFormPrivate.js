// React
import React, { useContext, useEffect, useState, useMemo } from "react";
import {
    Link,
    Route,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Configuration
import "./QuizFormPrivate.css";
import QuestionService from "./question-service";
import QuizApiService from "../../../services/quiz-api-service";
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";
import TokenService from "../../../services/token-service";

// Components
// import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";

const _QUESTION_LIMIT = 20;
const _ANSWER_LIMIT = 8;

export default function QuizFormPrivate() {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Initialize state
    const [quiz, setQuiz] = useState({});
    const [quizOriginal, setQuizOriginal] = useState({});
    const [showAnswers, setShowAnswers] = useState([]);
    const [queryCompleted, setQueryCompleted] = useState(false);

    // How do I get quiz info for public page? Query API?
    // Do I query API for private page?

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);

    // Get quiz from API, store in state
    useEffect(() => {
        // NEED TO ADD IN ERROR CATCHING
        QuizApiService.getQuiz(id).then((res) => {
            // Show all question answers to start with
            setShowAnswers(res.quiz.questions.map(() => true));

            // Add quiz info to state
            setQuizOriginal(res.quiz);
            setQuiz(res.quiz);

            // Indicate that API query completed
            setQueryCompleted(true);
        });
    }, []);

    // Function to reorder questions after drag and drop
    function reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        minWidth: "250px",
        maxWidth: "100%",
    });

    function onDragEnd(result) {
        // Do nothing if dropped outside the list
        if (!result.destination) {
            return;
        }

        // Do nothing if dropped in same location
        if (result.destination.index === result.source.index) {
            return;
        }

        const newQuestions = reorder(
            quiz.questions,
            result.source.index,
            result.destination.index
        );

        const newQuiz = { ...quiz };
        newQuiz.questions = newQuestions;
        setQuiz(newQuiz);
    }

    // Create draggable question
    function Question({ question: q, index: indexQuestion }) {
        return (
            <Draggable
                draggableId={`draggable-${indexQuestion}`}
                index={indexQuestion}
                key={indexQuestion}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        {/* Show the question text */}
                        <label
                            htmlFor={`question-${indexQuestion}`}
                        >{`Question ${indexQuestion + 1}`}</label>
                        <input
                            id={`question-${indexQuestion}`}
                            // data-index_question={indexQuestion}
                            name='question'
                            value={q.question}
                            onChange={(event) =>
                                handleInputChange(event, [indexQuestion])
                            }
                        />
                        {showAnswers[indexQuestion] ? (
                            <div id={`container_answers-${indexQuestion}`}>
                                {/* Show the answer answers */}
                                {q.answers.map((answer, indexAnswer) => (
                                    <div key={indexAnswer}>
                                        <label
                                            htmlFor={`q${indexQuestion}answer-${indexAnswer}`}
                                        >{`Option ${indexAnswer + 1}`}</label>
                                        <input
                                            // id will be like q0option-0
                                            id={`q${indexQuestion}option-${indexAnswer}`}
                                            // data-index_answer={indexAnswer}
                                            name='answers'
                                            value={answer}
                                            onChange={(event) =>
                                                handleInputChange(event, [
                                                    indexQuestion,
                                                    indexAnswer,
                                                ])
                                            }
                                        />
                                    </div>
                                ))}
                                {/* Show the style info */}
                                <label htmlFor={`q${indexQuestion}image_url`}>
                                    Image URL
                                </label>
                                <input
                                    type='text'
                                    id={`q${indexQuestion}image_url`}
                                    name='image_url'
                                    value={q.style.image.url}
                                    onChange={(event) =>
                                        handleInputChange(event, [
                                            indexQuestion,
                                        ])
                                    }
                                />
                                <label htmlFor={`q${indexQuestion}image_title`}>
                                    Image Description
                                </label>
                                <input
                                    type='text'
                                    id={`q${indexQuestion}image_title`}
                                    name='image_title'
                                    value={q.style.image.title}
                                    onChange={(event) =>
                                        handleInputChange(event, [
                                            indexQuestion,
                                        ])
                                    }
                                />
                                {/* {q.style.image.url ? (
                                                            <img
                                                                src={
                                                                    q.style
                                                                        .image
                                                                        .url
                                                                }
                                                                title={
                                                                    q.style
                                                                        .image
                                                                        .title
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )} */}
                            </div>
                        ) : (
                            ""
                        )}
                        {quiz.questions.length < 20 ? (
                            <p>Add question below</p>
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </Draggable>
        );
    }

    function QuestionList({ questions }) {
        return questions.map((q, index) => (
            <Question question={q} index={index} key={index} />
        ));
    }

    function addNewQuestion(index) {
        if (quiz.questions.length < _QUESTION_LIMIT) {
            const emptyQuestion = {
                id: null,
                question: "Enter your question here",
                answerIndex: 0,
                answers: ["Enter your answer here"],
                style: {
                    image: {
                        url: "",
                        title: "",
                    },
                },
            };
            const newQuiz = { ...quiz };
            newQuiz.questions.splice(index + 1, 0, emptyQuestion);
            setQuiz(newQuiz);
        }
    }

    function addNewAnswer(indexQuestion) {
        console.log(
            quiz.questions[indexQuestion].answers.length,
            _ANSWER_LIMIT
        );

        if (quiz.questions[indexQuestion].answers.length < _ANSWER_LIMIT) {
            console.log("adding new answer");
            const newQuiz = { ...quiz };
            newQuiz.questions[indexQuestion].answers.push("");
            setQuiz(newQuiz);
        }
    }

    // Update quiz data when input is changed
    function handleInputChange(event, indices) {
        const indexQuestion = indices[0];
        const indexAnswer = indices[1];

        const { id, name, value } = event.target;
        console.log("value:", value);

        const newQuiz = { ...quiz };
        switch (name) {
            case "answers":
                newQuiz.questions[indexQuestion].answers[indexAnswer] = value;
                break;
            case "description":
                newQuiz.description = value;
                break;
            case "image_title":
                newQuiz.questions[indexQuestion].style.image.title = value;
                break;
            case "image_url":
                newQuiz.questions[indexQuestion].style.image.url = value;
                break;
            case "question":
                newQuiz.questions[indexQuestion].question = value;
                break;
            case "title":
                newQuiz.title = value;
                break;
        }
        setQuiz(newQuiz);
    }

    function handleAnswerIndexChange(indexQuestion, indexAnswer) {
        const newQuiz = { ...quiz };
        newQuiz.questions[indexQuestion].answerIndex = indexAnswer;
        setQuiz(newQuiz);
    }

    function handleDeleteQuestion(index) {
        // Don't delete the last question
        // NEED TO FIGURE OUT HOW TO DELETE QUESTION FROM DB
        if (quiz.questions.length > 1) {
            const newQuiz = { ...quiz };
            newQuiz.questions.splice(index, 1);
            setQuiz(newQuiz);
        }
    }

    function handleDeleteAnswer(indexQuestion, indexAnswer) {
        // Don't delete the last answer
        if (quiz.questions[indexQuestion].answers.length > 1) {
            const newQuiz = { ...quiz };
            // If answer to be deleted is selected as correct, select first answer as correct
            if (newQuiz.questions[indexQuestion].answerIndex === indexAnswer) {
                newQuiz.questions[indexQuestion].answerIndex = 0;
            }
            // Decrease answerIndex to account for deleted answer
            else if (
                newQuiz.questions[indexQuestion].answerIndex > indexAnswer
            ) {
                newQuiz.questions[indexQuestion].answerIndex -= 1;
            }

            // Delete answer from question
            newQuiz.questions[indexQuestion].answers.splice(indexAnswer, 1);

            setQuiz(newQuiz);
        }
    }

    function Answer({ answer, indexAnswer, indexQuestion, question }) {
        return (
            <div key={indexAnswer}>
                <input
                    type='radio'
                    id={`q${indexQuestion}a${indexAnswer}correct`}
                    name={`q${indexQuestion}answer`}
                    value={indexAnswer}
                    checked={
                        question.answerIndex === indexAnswer ? true : false
                    }
                    onChange={() =>
                        handleAnswerIndexChange(indexQuestion, indexAnswer)
                    }
                />
                <label
                    htmlFor={`q${indexQuestion}a${indexAnswer}correct`}
                >{`Answer ${indexAnswer + 1}`}</label>
                <input
                    // id will be like q0option-0
                    id={`q${indexQuestion}a${indexAnswer}`}
                    name='answers'
                    value={answer}
                    onChange={(event) =>
                        handleInputChange(event, [indexQuestion, indexAnswer])
                    }
                />
            </div>
        );
    }

    return (
        <div id='QuizFormPrivate'>
            <p>Private Quiz Page</p>
            <label htmlFor='title'>Quiz Title</label>
            <input
                type='text'
                id='title'
                name='title'
                value={quiz.title}
                onChange={(event) => handleInputChange(event, [])}
            />
            <label htmlFor='description'>Description</label>
            <input
                type='text'
                id='description'
                name='description'
                value={quiz.description}
                onChange={(event) => handleInputChange(event, [])}
            />
            {/* Only show question list if quiz is not empty */}
            {queryCompleted ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {/* <QuestionList questions={quiz.questions} /> */}
                                {quiz.questions.map((q, indexQuestion) => (
                                    // <Question question={q} indexQuestion={indexQuestion} key={indexQuestion} />
                                    <Draggable
                                        draggableId={`draggable-${indexQuestion}`}
                                        index={indexQuestion}
                                        key={indexQuestion}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {/* Show the question text */}
                                                <label
                                                    htmlFor={`question-${indexQuestion}`}
                                                >{`Question ${
                                                    indexQuestion + 1
                                                }`}</label>
                                                <input
                                                    id={`question-${indexQuestion}`}
                                                    // data-index_question={indexQuestion}
                                                    name='question'
                                                    value={q.question}
                                                    onChange={(event) =>
                                                        handleInputChange(
                                                            event,
                                                            [indexQuestion]
                                                        )
                                                    }
                                                />
                                                {/* Add button to show/hide answers */}
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        const newShowAnswers = [
                                                            ...showAnswers,
                                                        ];
                                                        newShowAnswers[
                                                            indexQuestion
                                                        ] = !newShowAnswers[
                                                            indexQuestion
                                                        ];
                                                        setShowAnswers(
                                                            newShowAnswers
                                                        );
                                                    }}
                                                >
                                                    {`${
                                                        showAnswers[
                                                            indexQuestion
                                                        ]
                                                            ? "Hide"
                                                            : "Show"
                                                    } Answers`}
                                                </button>
                                                {/* Only show if display not toggled off */}
                                                {showAnswers[indexQuestion] ? (
                                                    <div
                                                        id={`container_answers-${indexQuestion}`}
                                                    >
                                                        {/* Show the answer answers */}
                                                        {q.answers.map(
                                                            (
                                                                answer,
                                                                indexAnswer
                                                            ) => (
                                                                // <Answer
                                                                //     answer={
                                                                //         answer
                                                                //     }
                                                                //     indexQuestion={
                                                                //         indexQuestion
                                                                //     }
                                                                //     indexAnswer={
                                                                //         indexAnswer
                                                                //     }
                                                                //     question={q}
                                                                //     key={`q${indexQuestion}a${indexAnswer}`}
                                                                // />
                                                                <div
                                                                    key={
                                                                        indexAnswer
                                                                    }
                                                                >
                                                                    <input
                                                                        type='radio'
                                                                        id={`q${indexQuestion}a${indexAnswer}correct`}
                                                                        name={`q${indexQuestion}answer`}
                                                                        value={
                                                                            indexAnswer
                                                                        }
                                                                        checked={
                                                                            q.answerIndex ===
                                                                            indexAnswer
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        onChange={() =>
                                                                            QuestionService.updateAnswerIndex(
                                                                                indexQuestion,
                                                                                indexAnswer,
                                                                                quiz,
                                                                                setQuiz
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`q${indexQuestion}a${indexAnswer}correct`}
                                                                    >{`Answer ${
                                                                        indexAnswer +
                                                                        1
                                                                    }`}</label>
                                                                    <input
                                                                        // id will be like q0option-0
                                                                        id={`q${indexQuestion}a${indexAnswer}`}
                                                                        name='answers'
                                                                        value={
                                                                            answer
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleInputChange(
                                                                                event,
                                                                                [
                                                                                    indexQuestion,
                                                                                    indexAnswer,
                                                                                ]
                                                                            )
                                                                        }
                                                                    />
                                                                    {quiz
                                                                        .questions[
                                                                        indexQuestion
                                                                    ].answers
                                                                        .length >
                                                                    1 ? (
                                                                        <button
                                                                            type='button'
                                                                            className='button_delete_answer'
                                                                            onClick={() =>
                                                                                QuestionService.deleteAnswer(
                                                                                    indexQuestion,
                                                                                    indexAnswer,
                                                                                    quiz,
                                                                                    setQuiz
                                                                                )
                                                                            }
                                                                        >
                                                                            X
                                                                        </button>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                        {quiz.questions[
                                                            indexQuestion
                                                        ].answers.length <
                                                        _ANSWER_LIMIT ? (
                                                            <button
                                                                type='button'
                                                                onClick={() =>
                                                                    QuestionService.addAnswer(
                                                                        indexQuestion,
                                                                        quiz,
                                                                        setQuiz
                                                                    )
                                                                }
                                                            >
                                                                Add new answer
                                                            </button>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {/* Show the style info */}
                                                        <label
                                                            htmlFor={`q${indexQuestion}image_url`}
                                                        >
                                                            Image URL
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id={`q${indexQuestion}image_url`}
                                                            name='image_url'
                                                            value={
                                                                q.style.image
                                                                    .url
                                                            }
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    [
                                                                        indexQuestion,
                                                                    ]
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`q${indexQuestion}image_title`}
                                                        >
                                                            Image Description
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id={`q${indexQuestion}image_title`}
                                                            name='image_title'
                                                            value={
                                                                q.style.image
                                                                    .title
                                                            }
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    [
                                                                        indexQuestion,
                                                                    ]
                                                                )
                                                            }
                                                        />
                                                        {/* {q.style.image.url ? (
                                                            <img
                                                                src={
                                                                    q.style
                                                                        .image
                                                                        .url
                                                                }
                                                                title={
                                                                    q.style
                                                                        .image
                                                                        .title
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )} */}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {quiz.questions.length > 1 ? (
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            QuestionService.deleteQuestion(
                                                                indexQuestion,
                                                                quiz,
                                                                setQuiz
                                                            )
                                                        }
                                                    >
                                                        Delete Question
                                                    </button>
                                                ) : (
                                                    ""
                                                )}
                                                {quiz.questions.length <
                                                _QUESTION_LIMIT ? (
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            QuestionService.addQuestion(
                                                                indexQuestion,
                                                                quiz,
                                                                setQuiz
                                                            )
                                                        }
                                                    >
                                                        Add new question below
                                                    </button>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                // Show add question button if it's a new quiz
                ""
            )}
        </div>
    );
}
