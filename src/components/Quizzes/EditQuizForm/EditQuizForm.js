// React
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Configuration
import "./EditQuizForm.css";
import QuestionApiService from "../../../services/question-api-service";
import QuizApiService from "../../../services/quiz-api-service";
import QuizFormService from "./quiz-form-service";
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";

// Components
// import AddItemLinkButton from "../../Utilities/AddItemLinkButton/AddItemLinkButton";
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

const _QUESTION_LIMIT = 20;
const _ANSWER_LIMIT = 8;

export default function EditQuizForm(props) {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Initialize state
    const [allowDelete, setAllowDelete] = useState(false);
    const [deletedQuestions, setDeletedQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [newQuestions, setNewQuestions] = useState([]);
    const [queryCompleted, setQueryCompleted] = useState(false);
    // Start with empty quiz in case this is for new quiz
    const [quiz, setQuiz] = useState(QuizFormService.getNewQuiz());
    // I might not need to save the original, but it could come in handy
    const [quizOriginal, setQuizOriginal] = useState({});
    const [showAnswers, setShowAnswers] = useState([]);

    // How do I get quiz info for public page? Query API?
    // Do I query API for private page?

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);

    // Get quiz or start new one
    useEffect(() => {
        if (quizId === "new") {
            console.log("Starting new quiz");
            console.log(quiz);
            handleAddQuestion(0);
        } else {
            console.log("Loading existing quiz");
            // Get quiz from API, store in state
            QuizApiService.getQuiz(id).then((res) => {
                // Show all question answers to start with
                setShowAnswers(res.quiz.questions.map(() => true));

                // Add quiz info to state
                setQuizOriginal(res.quiz);
                setQuiz(res.quiz);

                // Indicate that API query completed
                setQueryCompleted(true);
            });
        }
    }, []);

    function handleAddQuestion(index) {
        // Add new question and keep track of new questions added
        const newQuestion = QuizFormService.addQuestion(index, quiz, setQuiz);
        const newNewQuestions = [...newQuestions];
        newNewQuestions.push(newQuestion);
        setNewQuestions(newNewQuestions);

        // Add new show/hide answers variable to state
        const newShowAnswers = [...showAnswers];
        newShowAnswers.splice(index + 1, 0, true);
        console.log(newShowAnswers);
        setShowAnswers(newShowAnswers);
    }

    function handleDeleteQuestion(index) {
        // Only track question for deletion if it was already part of quiz (id != null)
        if (quiz.questions[index].id !== null) {
            const questions = [...deletedQuestions];
            questions.push(quiz.questions[index]);
            setDeletedQuestions(questions);
        }
        QuizFormService.deleteQuestion(index, quiz, setQuiz);

        // Remove new show/hide answers variable in state
        const newShowAnswers = [...showAnswers];
        newShowAnswers.splice(index, 1);
        setShowAnswers(newShowAnswers);
    }

    async function handleDeleteQuiz(event) {
        // Clear previous errors (if they exist)
        setError(null);

        if (quiz.id === null) {
            // Follow successful path
            props.onDeleteSuccess();
        } else {
            try {
                const res = await QuizApiService.deleteQuiz(id);

                // Disable item edit, don't show confirm delete button
                setAllowDelete(false);

                // Update item info in item array in state
                const quizzes = context.quizzes;

                // Get index of item in state
                const index = quizzes.findIndex((quiz) => quiz.id === id);

                // Follow successful path
                props.onDeleteSuccess();

                // Delete item from state, do this last so App state update doesn't
                // call this page again
                const newQuizzes = quizzes
                    .slice(0, index)
                    .concat(quizzes.slice(index + 1));
                context.setQuizzes(newQuizzes);
            } catch (error) {
                setError(error.message);
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Clear previous errors (if they exist)
        setError(null);

        // Store new questions when they are added via API
        const addedQuestions = [];

        // Only delete questions if some were removed from quiz
        if (deletedQuestions.length > 0) {
            // Remove deleted questions from quiz

            deletedQuestions.forEach(async (q) => {
                try {
                    const res = await QuestionApiService.deleteQuestion(q);
                } catch (error) {
                    setError(
                        error.message || `Couldn't delete question from quiz`
                    );
                }
            });
            // Reset deleted questions
            setDeletedQuestions([]);
        }

        // Only add questions if some were added to quiz
        if (newQuestions.length > 0) {
            let res;

            // Add each new question to API
            newQuestions.map(async (q) => {
                try {
                    res = await QuestionApiService.postQuestion(q);
                    addedQuestions.push(res.question);
                } catch (error) {
                    setError(error.message || `Couldn't add question to quiz`);
                }
            });
        }

        // Now create question ID array for quiz update, add new question ID's to array
        // if they exist
        const questions = [];
        quiz.questions.forEach((q) => {
            // Add ID if it is missing from question (because it's a new question)
            // TECHNICALLY, SOMEONE COULD ADD THE SAME QUESTION MULTIPLE TIMES
            // I NEED TO FIND A DIFFERENT WAY TO COMPARE
            if (q.id === null) {
                addedQuestions.forEach((aq) => {
                    if (aq.question === q.question) questions.push(aq.id);
                });
            } else {
                questions.push(q.id);
            }
        });

        // Update quiz with ID's of questions to submit back to API
        const newQuiz = JSON.parse(JSON.stringify(quiz));
        newQuiz.questions = questions;

        console.log("Question ID's are", questions);

        // Check if submitting a new quiz, or updating existing quiz
        if (quiz.id === null) {
            console.log("adding new quiz");
            // Quiz is new, add via API
            const res = await QuizApiService.postQuiz(newQuiz);
            console.log("res is", res);

            // Update item info in item array in state
            const quizzes = context.quizzes;

            // Add new item
            quizzes.push(res.quiz);
            context.setQuizzes(quizzes);
            console.log(context.quizzes);

            // Follow successful path
            props.onSubmitSuccess(res.quiz.id);
        } else {
            const res = await QuizApiService.updateQuiz(newQuiz);

            // Update item info in item array in state
            const quizzes = context.quizzes;

            // Get index of item in state
            const index = quizzes.findIndex(
                (oldQuiz) => oldQuiz.id === quiz.id
            );

            // Replace old item with updated item
            quizzes.splice(index, 1, quiz);
            context.setQuizzes(quizzes);

            // Follow successful path
            props.onSubmitSuccess(quiz.id);
        }
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

        const newQuestions = QuizFormService.reorderQuestions(
            quiz.questions,
            result.source.index,
            result.destination.index
        );

        const newQuiz = { ...quiz };
        newQuiz.questions = newQuestions;
        setQuiz(newQuiz);
    }

    return (
        <form id='QuizFormPrivate' onSubmit={(event) => handleSubmit(event)}>
            {error ? <ErrorMessage message={error} /> : ""}
            <button type='submit'>Submit Quiz</button>
            <button type='button' onClick={() => props.onCancel()}>
                Go Back
            </button>
            {!allowDelete ? (
                <button type='button' onClick={() => setAllowDelete(true)}>
                    Delete
                </button>
            ) : (
                ""
            )}
            {allowDelete ? (
                <button
                    type='button'
                    onClick={(event) => handleDeleteQuiz(event)}
                >
                    Confirm Deletion
                </button>
            ) : (
                ""
            )}
            <label htmlFor='title'>Quiz Title</label>
            <input
                type='text'
                id='title'
                name='title'
                value={quiz.title}
                onChange={(event) =>
                    QuizFormService.updateInput(event, quiz, setQuiz)
                }
            />
            <label htmlFor='description'>Description</label>
            <input
                type='text'
                id='description'
                name='description'
                value={quiz.description}
                onChange={(event) =>
                    QuizFormService.updateInput(event, quiz, setQuiz)
                }
            />
            {/* Only show question list if quiz is not empty */}
            {quiz.questions.length ? (
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
                                                    type='text'
                                                    id={`question-${indexQuestion}`}
                                                    name='question'
                                                    value={q.question}
                                                    onChange={(event) =>
                                                        QuizFormService.updateInput(
                                                            event,
                                                            quiz,
                                                            setQuiz,
                                                            indexQuestion
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
                                                                            QuizFormService.updateAnswerIndex(
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
                                                                        type='text'
                                                                        // id will be like q0option-0
                                                                        id={`q${indexQuestion}a${indexAnswer}`}
                                                                        name='answers'
                                                                        value={
                                                                            answer
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            QuizFormService.updateInput(
                                                                                event,
                                                                                quiz,
                                                                                setQuiz,
                                                                                indexQuestion,
                                                                                indexAnswer
                                                                            )
                                                                        }
                                                                    />
                                                                    {/* Only show delete button if there's more than 1 answer */}
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
                                                                                QuizFormService.deleteAnswer(
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
                                                        {/* Only show add button if there are fewer than answer limit */}
                                                        {quiz.questions[
                                                            indexQuestion
                                                        ].answers.length <
                                                        _ANSWER_LIMIT ? (
                                                            <button
                                                                type='button'
                                                                onClick={() =>
                                                                    QuizFormService.addAnswer(
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
                                                                QuizFormService.updateInput(
                                                                    event,
                                                                    quiz,
                                                                    setQuiz,
                                                                    indexQuestion
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
                                                                QuizFormService.updateInput(
                                                                    event,
                                                                    quiz,
                                                                    setQuiz,
                                                                    indexQuestion
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
                                                {/* Only show delete button if there's more than 1 question */}
                                                {quiz.questions.length > 1 ? (
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            handleDeleteQuestion(
                                                                indexQuestion
                                                            )
                                                        }
                                                    >
                                                        Delete Question
                                                    </button>
                                                ) : (
                                                    ""
                                                )}
                                                {/* Only show add button if there are fewer than answer limit */}
                                                {quiz.questions.length <
                                                _QUESTION_LIMIT ? (
                                                    <button
                                                        type='button'
                                                        // onClick={() =>
                                                        //     QuizFormService.addQuestion(
                                                        //         indexQuestion,
                                                        //         quiz,
                                                        //         setQuiz
                                                        //     )
                                                        // }
                                                        onClick={() =>
                                                            handleAddQuestion(
                                                                indexQuestion
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
                <button type='button' onClick={() => handleAddQuestion(0)}>
                    Add new question
                </button>
            )}
        </form>
    );
}
