const QuizFormService = {
    addAnswer(index, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions[index].answers.push("");
        setQuiz(newQuiz);
    },

    addQuestion(index, quiz, setQuiz) {
        const emptyQuestion = {
            // id: new Date().getTime(),
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
        return emptyQuestion;
    },

    deleteAnswer(indexQuestion, indexAnswer, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        // If answer to be deleted is selected as correct, select first answer as correct
        // IS THIS EVEN NECESSARY? ONCE AT 0, INDEX WON'T CHANGE WITH FURTHER DELETES.
        if (newQuiz.questions[indexQuestion].answerIndex === indexAnswer) {
            newQuiz.questions[indexQuestion].answerIndex = 0;
        }
        // Decrease answerIndex to account for deleted answer
        else if (newQuiz.questions[indexQuestion].answerIndex > indexAnswer) {
            newQuiz.questions[indexQuestion].answerIndex -= 1;
        }

        // Delete answer from question
        newQuiz.questions[indexQuestion].answers.splice(indexAnswer, 1);

        setQuiz(newQuiz);
    },

    getNewQuiz() {
        return {
            id: null,
            title: "New Quiz",
            description: "",
            style: {
                colors: {
                    background: "",
                    text: "",
                },
                image: {
                    url: "",
                    title: "",
                },
            },

            final_message: {
                low: "Low score message",
                medium: "Medium score message.",
                high: "High score message.",
                perfect: "Perfect score message.",
            },

            questions: [],
            date: {
                modified: new Date().toISOString(),
            },
        };
    },

    deleteQuestion(index, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions.splice(index, 1);
        setQuiz(newQuiz);
    },

    // Function to reorder questions after drag and drop
    reorderQuestions(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    },

    updateAnswerIndex(indexQuestion, indexAnswer, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions[indexQuestion].answerIndex = indexAnswer;
        setQuiz(newQuiz);
    },

    updateInput(
        event,
        quiz,
        setQuiz,
        indexQuestion = null,
        indexAnswer = null
    ) {
        const { id, name, value } = event.target;

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
    },
};

export default QuizFormService;
