// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Components
import AddItemLinkButton from "./AddItemLinkButton";

describe("<AddItemLinkButton> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <AddItemLinkButton
                    to={"/"}
                    label='test'
                    name='test'
                    icon='test'
                />
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
