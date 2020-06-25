// React
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

// Configuration
// import QuizBuilderContext from "../../contexts/QuizBuilderContext";
// import TokenService from "../../services/token-service";

// Components
import ErrorBoundary from "./ErrorBoundary";

function ComponentWithError() {
    throw new Error("Error caused by test component");
}

describe("<ErrorBoundary> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <ErrorBoundary>
                <ComponentWithError />
            </ErrorBoundary>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    describe("renders the UI", () => {
        it("with the default message (no message given)", () => {
            const tree = renderer
                .create(
                    <ErrorBoundary>
                        <ComponentWithError />
                    </ErrorBoundary>
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it("with the given message", () => {
            const tree = renderer
                .create(
                    <ErrorBoundary message='This is an error message'>
                        <ComponentWithError />
                    </ErrorBoundary>
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
