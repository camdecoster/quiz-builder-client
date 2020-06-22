// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import TokenService from "../../../services/token-service";

// Components
import PrivateRoute from "./PrivateRoute";

// Create mock service for TokenService
jest.mock("../../../services/token-service");

describe("<PrivateRoute> component", () => {
    TokenService.hasAuthToken.mockReturnValue(true);

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <PrivateRoute render={(routerProps) => <> </>} />
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
