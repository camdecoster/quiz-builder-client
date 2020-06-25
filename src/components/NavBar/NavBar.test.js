// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

// Configuration
import QuizBuilderContext from "../../contexts/QuizBuilderContext";
import TokenService from "../../services/token-service";

// Components
import NavBar from "./NavBar";

// Create mock service for TokenService
jest.mock("../../services/token-service");

function NavBarTest(props) {
    return (
        <MemoryRouter>
            <QuizBuilderContext.Provider
                value={{ showUserMenu: props.showUserMenu }}
            >
                <NavBar />
            </QuizBuilderContext.Provider>
        </MemoryRouter>
    );
}

describe("<NavBar> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<NavBarTest showUserMenu={false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe("renders the UI", () => {
        describe("with authorization", () => {
            TokenService.hasAuthToken.mockReturnValue(true);

            it("with the UserMenu showing", () => {
                const tree = renderer
                    .create(<NavBarTest showUserMenu={true} />)
                    .toJSON();
                expect(tree).toMatchSnapshot();
            });

            it("with the UserMenu showing", () => {
                const tree = renderer
                    .create(<NavBarTest showUserMenu={false} />)
                    .toJSON();
                expect(tree).toMatchSnapshot();
            });
        });

        describe("without authorization", () => {
            TokenService.hasAuthToken.mockReturnValue(false);

            it("with the UserMenu showing", () => {
                const tree = renderer
                    .create(<NavBarTest showUserMenu={true} />)
                    .toJSON();
                expect(tree).toMatchSnapshot();
            });

            it("with the UserMenu showing", () => {
                const tree = renderer
                    .create(<NavBarTest showUserMenu={false} />)
                    .toJSON();
                expect(tree).toMatchSnapshot();
            });
        });
    });
});
