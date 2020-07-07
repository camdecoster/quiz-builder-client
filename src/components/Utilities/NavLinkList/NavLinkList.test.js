// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Components
import NavLinkList from "./NavLinkList";

describe("<NavLinkList> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <NavLinkList navLinks={[]} />
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
