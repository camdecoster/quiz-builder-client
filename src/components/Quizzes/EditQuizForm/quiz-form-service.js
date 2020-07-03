const QuizFormService = {
    addAnswer(index, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions[index].answers.push("");
        setQuiz(newQuiz);
    },

    addQuestion(index, quiz, setQuiz) {
        const emptyQuestion = {
            id: null,
            question: "Enter your question here",
            answer_index: 0,
            answers: ["Enter your answer here"],
            color_background: "",
            color_text: "",
            image_url: "",
            image_title: "",
        };

        // Add new question to existing quiz
        const newQuiz = { ...quiz };
        newQuiz.questions.splice(index + 1, 0, emptyQuestion);
        setQuiz(newQuiz);
        return emptyQuestion;
    },

    deleteAnswer(indexQuestion, indexAnswer, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        // If answer to be deleted is selected as correct, select first answer as correct
        // IS THIS EVEN NECESSARY? ONCE AT 0, INDEX WON'T CHANGE WITH FURTHER DELETES.
        if (newQuiz.questions[indexQuestion].answer_index === indexAnswer) {
            newQuiz.questions[indexQuestion].answer_index = 0;
        }
        // Decrease answer_index to account for deleted answer
        else if (newQuiz.questions[indexQuestion].answer_index > indexAnswer) {
            newQuiz.questions[indexQuestion].answer_index -= 1;
        }

        // Delete answer from question
        newQuiz.questions[indexQuestion].answers.splice(indexAnswer, 1);

        setQuiz(newQuiz);
    },

    getNewQuiz() {
        return {
            id: null,
            title: "New Quiz",
            author: "Your Name",
            description: "",
            color_background: "",
            color_text: "",
            image_url: "",
            image_title: "",
            final_message_low: "Low score message",
            final_message_medium: "Medium score message.",
            final_message_high: "High score message.",
            final_message_perfect: "Perfect score message.",
            date_modified: new Date().toISOString(),
            questions: [],
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
        newQuiz.questions[indexQuestion].answer_index = indexAnswer;
        setQuiz(newQuiz);
    },

    updateInput(
        event,
        quiz,
        setQuiz,
        indexQuestion = null,
        indexAnswer = null
    ) {
        const { name, value } = event.target;

        const newQuiz = { ...quiz };
        switch (name) {
            case "answers":
                newQuiz.questions[indexQuestion].answers[indexAnswer] = value;
                break;
            case "author":
                newQuiz.author = value;
                break;
            case "description":
                newQuiz.description = value;
                break;
            case "image_title":
                newQuiz.questions[indexQuestion].image_title = value;
                break;
            case "image_url":
                newQuiz.questions[indexQuestion].image_url = value;
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
