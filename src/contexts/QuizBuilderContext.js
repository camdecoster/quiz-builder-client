import React from "react";

const QuizBuilderContext = React.createContext({
    quizzes: null,
    setClassNames: () => {},
    setDoFetchData: () => {},
    setQuizzes: () => {},
    toggleClassNames: () => {},
});

export default QuizBuilderContext;
