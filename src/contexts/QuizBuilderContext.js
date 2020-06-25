import React from "react";

const QuizBuilderContext = React.createContext({
    dateCurrent: null,
    quizzes: null,
    setClassNames: () => {},
    setQuizzes: () => {},
    toggleClassNames: () => {},
});

export default QuizBuilderContext;
