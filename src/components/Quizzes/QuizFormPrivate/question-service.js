const QuestionService = {
    addAnswer(index, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions[index].answers.push("");
        setQuiz(newQuiz);
    },

    addQuestion(index, quiz, setQuiz) {
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
};

export default QuestionService;
