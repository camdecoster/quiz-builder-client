const QuizFormService = {
    addAnswer(index, quiz, setQuiz) {
        const newQuiz = { ...quiz };
        newQuiz.questions[index].answers.push("");
        setQuiz(newQuiz);
    },

    addQuestion(index, quiz, setQuiz) {
        const emptyQuestion = {
            id: null,
            question: "",
            index_quiz_order: index + 1,
            answer_index: 0,
            answers: [""],
            color_background: "",
            color_text: "",
            image_url: "",
            image_title: "",
        };

        // Add new question to copy of quiz
        const newQuiz = { ...quiz };
        newQuiz.questions.splice(index + 1, 0, emptyQuestion);

        // Update quiz order indices
        QuizFormService.setQuizOrderIndex(newQuiz.questions);

        // Update quiz
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
            title: "",
            author: "",
            description: "",
            color_background: "",
            color_text: "",
            image_url: "",
            image_title: "",
            final_message_low: "",
            final_message_medium: "",
            final_message_high: "",
            final_message_perfect: "",
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
        console.log(startIndex, endIndex);
        // Copy array
        const result = Array.from(list);

        // Remove element that is shifted
        const [removed] = result.splice(startIndex, 1);

        // Add it back in at the new location
        result.splice(endIndex, 0, removed);

        // Reset quiz_order_index for questions
        this.setQuizOrderIndex(result);

        return result;
    },

    setQuizOrderIndex(questions) {
        // Update each question with its current quiz order index
        questions.forEach(
            (question, index, arr) =>
                (arr[index] = { ...question, index_quiz_order: index })
        );
        return;
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
            case "final_message_low":
                newQuiz.final_message_low = value;
                break;
            case "final_message_medium":
                newQuiz.final_message_medium = value;
                break;
            case "final_message_high":
                newQuiz.final_message_high = value;
                break;
            case "final_message_perfect":
                newQuiz.final_message_perfect = value;
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
