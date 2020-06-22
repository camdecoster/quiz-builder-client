// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Components
import ExpensesTable from "./ExpensesTable";

const testColumns = [
    { Header: "Amount" },
    { Header: "Date" },
    { Header: "Payee", accessor: "payee" },
    { Header: "Category" },
    { Header: "Payment Method" },
    { Header: "Description", accessor: "description" },
];

const testData = [
    {
        id: 15,
        date: "2020-05-21T00:00:00.000Z",
        type: "expense",
        amount: "53",
        payee: "Guy",
        category: 1,
        payment_method: 1,
        description: "",
        date_created: "2020-05-21T22:34:27.356Z",
        date_modified: null,
    },
    {
        id: 17,
        date: "2020-05-21T00:00:00.000Z",
        type: "expense",
        amount: "42.1",
        payee: "Woods",
        category: 1,
        payment_method: 1,
        description: "",
        date_created: "2020-05-21T22:42:27.600Z",
        date_modified: null,
    },
];

describe("<ExpensesTable> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <ExpensesTable columns={testColumns} data={testData} />
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
