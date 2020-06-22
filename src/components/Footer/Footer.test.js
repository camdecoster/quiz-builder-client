import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Footer from "./Footer";

describe("<Footer> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Footer />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // it("renders the UI as expected", () => {
    //     const tree = renderer
    //         .create(
    //             <MemoryRouter>
    //                 <TrackerContext.Provider>
    //                     <Footer />
    //                 </TrackerContext.Provider>
    //             </MemoryRouter>
    //         )
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
