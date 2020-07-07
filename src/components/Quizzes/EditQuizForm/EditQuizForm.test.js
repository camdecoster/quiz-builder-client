// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";

// Components
import EditQuizForm from "./EditQuizForm";

describe("<EditQuizForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <QuizBuilderContext.Provider
                    value={{
                        quizzes: [],
                    }}
                >
                    <EditQuizForm />
                </QuizBuilderContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
