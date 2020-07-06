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
    // Start with empty quiz in case this is for new quiz
    const [quiz, setQuiz] = useState(QuizFormService.getNewQuiz());
    // I might not need to save the original, but it could come in handy
    const [quizOriginal, setQuizOriginal] = useState({});
    const [showAnswers, setShowAnswers] = useState([]);

    // Get category ID from path parameter
    const { quizId } = useParams();
    const id = parseInt(quizId);

    // Get quiz or start new one
    useEffect(() => {
        if (quizId === "new") {
            console.log("Starting new quiz");
            handleAddQuestion(0);
        } else {
            // Get quiz from context, or use API, only get at first page load
            if (context.quizzes.length > 0) {
                console.log("getting quiz from context");
                // Show all question answers to start with
                setShowAnswers(
                    context.quizzes
                        .filter((quiz) => quiz.id === id)[0]
                        .questions.map(() => true)
                );

                setQuizOriginal(
                    context.quizzes.filter((quiz) => quiz.id === id)[0]
                );
                setQuiz(context.quizzes.filter((quiz) => quiz.id === id)[0]);
            } else {
                console.log("Loading existing quiz");

                QuizApiService.getQuiz(id).then((res) => {
                    // Show all question answers to start with
                    setShowAnswers(res.quiz.questions.map(() => true));

                    // Add quiz info to state
                    setQuizOriginal(res.quiz);
                    setQuiz(res.quiz);

                    // Indicate that API query completed
                    // setQueryCompleted(true);
                });
            }
        }
    }, []);

    function handleAddQuestion(index) {
        // Add new question
        QuizFormService.addQuestion(index, quiz, setQuiz);
        // const newNewQuestions = [...newQuestions];
        // newNewQuestions.push(newQuestion);
        // setNewQuestions(newNewQuestions);

        // Add new show/hide answers variable to state
        const newShowAnswers = [...showAnswers];
        newShowAnswers.splice(index + 1, 0, true);
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

                // Don't show confirm delete button
                setAllowDelete(false);

                // Update item info in item array in state
                const quizzes = context.quizzes;
                const index = quizzes.findIndex((quiz) => quiz.id === id);

                // Follow successful path
                props.onDeleteSuccess();

                // Delete item from state, do this last so App state update doesn't
                // call this page again
                // const newQuizzes = quizzes
                //     .slice(0, index)
                //     .concat(quizzes.slice(index + 1));
                // context.setQuizzes(newQuizzes);
                // console.log(newQuizzes);
            } catch (error) {
                setError(error.message);
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Clear previous errors (if they exist)
        setError(null);

        // Copy current quiz, prep for database
        const newQuiz = JSON.parse(JSON.stringify(quiz));
        delete newQuiz.questions;

        // Check if submitting a new quiz, or updating existing quiz
        if (quiz.id === null) {
            console.log("adding new quiz");
            // Quiz is new, add via API
            const res = await QuizApiService.postQuiz(newQuiz);

            // Get new quiz ID, save in state
            quiz.id = res.quiz.id;
            setQuiz(quiz);
        } else {
            // Update quiz
            const res = await QuizApiService.updateQuiz(newQuiz);
        }

        // Only delete questions if some were removed from quiz
        if (deletedQuestions.length > 0) {
            const newQuiz = JSON.parse(JSON.stringify(quiz));
            // Remove deleted questions from quiz
            deletedQuestions.forEach(async (q) => {
                try {
                    const res = await QuestionApiService.deleteQuestion(q.id);
                    // Also delete question from quiz in state
                    quiz.questions.forEach((question, index) => {
                        if (question.id === q.id) {
                            // Delete question from array
                            newQuiz.questions.splice(index, 1);
                        }
                    });
                } catch (error) {
                    setError(
                        error.message || `Couldn't delete question from quiz`
                    );
                }
            });
            // Update quiz to remove deleted questions
            setQuiz(newQuiz);

            // Reset deleted questions
            setDeletedQuestions([]);
        }

        // Only add questions if some were added to quiz
        const newQuestions = quiz.questions.filter((q) => q.id === null);
        console.log("newQuestions", newQuestions);

        if (newQuestions.length > 0) {
            const newQuiz = JSON.parse(JSON.stringify(quiz));

            // Add each new question to API
            newQuestions.map(async (q) => {
                try {
                    // Add quiz ID to each question
                    q.quiz_id = newQuiz.id;

                    console.log("question is", q);

                    const res = await QuestionApiService.postQuestion(q);

                    // Delete question from quiz in state
                    newQuiz.questions.forEach((question, index) => {
                        if (question.index_quiz_order === q.index_quiz_order) {
                            // Delete question from array
                            newQuiz.questions.splice(index, 1);
                        }
                    });
                } catch (error) {
                    setError(error.message || `Couldn't add question to quiz`);
                }
            });

            // Update quiz to remove new questions
            setQuiz(newQuiz);
        }

        // Update other questions
        for (const question of quiz.questions) {
            // Don't update new questions (those with id of null)
            if (question.id !== null) {
                try {
                    const res = await QuestionApiService.updateQuestion(
                        question
                    );
                } catch (error) {
                    setError(error.message || `Couldn't update question`);
                }
            }
        }

        // Trigger a new API call by resetting the quizzes in context
        props.onSubmitSuccess(quiz.id);
    }

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        borderRadius: "10px",

        // change background colour if dragging
        background: isDragging ? "#573DD9" : "#66c4ba",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "#F7ED93" : "#573dd9",
        padding: grid,
        minWidth: "250px",
        maxWidth: "100%",
        borderRadius: "20px",
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

        // Reorder the questions based upon the new element location
        const newQuestions = QuizFormService.reorderQuestions(
            quiz.questions,
            result.source.index,
            result.destination.index
        );

        // Save the new question order
        const newQuiz = { ...quiz };
        newQuiz.questions = newQuestions;
        setQuiz(newQuiz);
    }

    return (
        <form id='QuizFormPrivate' onSubmit={(event) => handleSubmit(event)}>
            {error ? <ErrorMessage message={error} /> : ""}
            <div id='container_buttons'>
                <button type='submit'>Submit Quiz</button>
                <button
                    type='button'
                    onClick={() => {
                        // Reset quiz to original state
                        setQuiz(quizOriginal);
                        props.onCancel();
                    }}
                >
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
            </div>
            <div id='container_quiz_info'>
                <div id='container_main_info'>
                    <label htmlFor='title'>Quiz Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={quiz.title}
                        placeholder='The title of your quiz'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={quiz.description}
                        placeholder='This is my awesome quiz'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                    <label htmlFor='author'>Quiz Author</label>
                    <input
                        type='text'
                        id='author'
                        name='author'
                        value={quiz.author}
                        placeholder='Firstname Lastname'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                </div>
                <div id='container_messages'>
                    <label htmlFor='final_message_low'>Low Score Message</label>
                    <input
                        type='text'
                        id='final_message_low'
                        name='final_message_low'
                        value={quiz.final_message_low}
                        placeholder='Final message for low score.'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                    <label htmlFor='final_message_medium'>
                        Medium Score Message
                    </label>
                    <input
                        type='text'
                        id='final_message_medium'
                        name='final_message_medium'
                        value={quiz.final_message_medium}
                        placeholder='Final message for medium score.'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                    <label htmlFor='final_message_high'>
                        High Score Message
                    </label>
                    <input
                        type='text'
                        id='final_message_high'
                        name='final_message_high'
                        value={quiz.final_message_high}
                        placeholder='Final message for high score.'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                    <label htmlFor='final_message_perfect'>
                        Perfect Score Message
                    </label>
                    <input
                        type='text'
                        id='final_message_perfect'
                        name='final_message_perfect'
                        value={quiz.final_message_perfect}
                        placeholder='Final message for perfect score.'
                        onChange={(event) =>
                            QuizFormService.updateInput(event, quiz, setQuiz)
                        }
                        required
                    />
                </div>
            </div>
            {/* Only show question list if quiz is not empty */}
            <div id='container_quiz'>
                {quiz.questions.length ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='droppable'>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
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
                                                        placeholder='Enter your question here'
                                                        onChange={(event) =>
                                                            QuizFormService.updateInput(
                                                                event,
                                                                quiz,
                                                                setQuiz,
                                                                indexQuestion
                                                            )
                                                        }
                                                        required
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
                                                    {showAnswers[
                                                        indexQuestion
                                                    ] ? (
                                                        <div
                                                            id={`container_answers-${indexQuestion}`}
                                                        >
                                                            <p className='instruction_small'>
                                                                Choose the
                                                                correct answer
                                                                by clicking the
                                                                appropriate
                                                                selector
                                                            </p>
                                                            {/* Show the answers */}
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
                                                                        <label
                                                                            htmlFor={`q${indexQuestion}a${indexAnswer}correct`}
                                                                        >
                                                                            <input
                                                                                type='radio'
                                                                                id={`q${indexQuestion}a${indexAnswer}correct`}
                                                                                name={`q${indexQuestion}answer`}
                                                                                value={
                                                                                    indexAnswer
                                                                                }
                                                                                checked={
                                                                                    q.answer_index ===
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
                                                                            {`Answer ${
                                                                                indexAnswer +
                                                                                1
                                                                            }`}
                                                                        </label>
                                                                        <div>
                                                                            <input
                                                                                className='input_answer'
                                                                                type='text'
                                                                                // id will be like q0option-0
                                                                                id={`q${indexQuestion}a${indexAnswer}`}
                                                                                name='answers'
                                                                                value={
                                                                                    answer
                                                                                }
                                                                                placeholder='Answer option'
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
                                                                                required
                                                                            />
                                                                            {/* Only show delete button if there's more than 1 answer */}
                                                                            {quiz
                                                                                .questions[
                                                                                indexQuestion
                                                                            ]
                                                                                .answers
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
                                                                    Add new
                                                                    answer
                                                                </button>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <div>
                                                                {/* Show the style info */}
                                                                <div>
                                                                    <label
                                                                        htmlFor={`q${indexQuestion}image_url`}
                                                                    >
                                                                        Image
                                                                        URL
                                                                    </label>
                                                                    <input
                                                                        type='text'
                                                                        id={`q${indexQuestion}image_url`}
                                                                        name='image_url'
                                                                        value={
                                                                            q.image_url
                                                                        }
                                                                        placeholder='http://www.images.com/myimage.jpg'
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            QuizFormService.updateInput(
                                                                                event,
                                                                                quiz,
                                                                                setQuiz,
                                                                                indexQuestion
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        htmlFor={`q${indexQuestion}image_title`}
                                                                    >
                                                                        Image
                                                                        Description
                                                                    </label>
                                                                    <input
                                                                        type='text'
                                                                        id={`q${indexQuestion}image_title`}
                                                                        name='image_title'
                                                                        value={
                                                                            q.image_title
                                                                        }
                                                                        placeholder='Description of image'
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            QuizFormService.updateInput(
                                                                                event,
                                                                                quiz,
                                                                                setQuiz,
                                                                                indexQuestion
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
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
                                                    <div>
                                                        {quiz.questions.length >
                                                        1 ? (
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
                                                                Add new question
                                                                below
                                                            </button>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
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
            </div>
        </form>
    );
}
