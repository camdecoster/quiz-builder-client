import React from "react";

const QuizBuilderContext = React.createContext({
    dateCurrent: null,
    quizzes: null,
    setClassNames: () => {},
    setDoFetchData: () => {},
    setQuizzes: () => {},
    toggleClassNames: () => {},
});

export default QuizBuilderContext;
