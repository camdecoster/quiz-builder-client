// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import ErrorMessage from "./ErrorMessage";

describe("<ErrorMessage> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ErrorMessage />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
