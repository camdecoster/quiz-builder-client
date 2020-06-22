// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./ExpensesPage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";
import EditExpensePage from "../EditExpensePage/EditExpensePage";
import ExpensesTable from "../../../components/Tables/ExpensesTable/ExpensesTable";
import NewExpensePage from "../NewExpensePage/NewExpensePage";

export default function ExpensesPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const data = React.useMemo(() => context.expenses, []);

    const columnsLargeScreen = React.useMemo(
        () => [
            {
                Header: "Amount",
                accessor: (expense) =>
                    expense.type === "expense" ? (
                        <Link to={`${url}/${expense.id}`}>
                            {currencyFormatter.format(expense.amount)}
                        </Link>
                    ) : (
                        <Link to={`${url}/${expense.id}`}>
                            {currencyFormatter.format(expense.amount * -1)}
                        </Link>
                    ),
            },
            {
                Header: "Date",
                accessor: (expense) =>
                    new Date(expense.date).toLocaleDateString(), // Change this to short form of date
            },
            {
                Header: "Payee",
                accessor: "payee",
            },
            {
                Header: "Category",
                accessor: (expense) => {
                    if (expense.category === null) return "Uncategorized";
                    // Get category name from ID taken from expense
                    const category = context.categories.filter(
                        (category) => category.id === expense.category
                    )[0];
                    return category.category_name;
                }, // FUTURE: Make link that filters table to just this category
            },
            {
                Header: "Payment Method",
                accessor: (expense) => {
                    if (expense.payment_method === null)
                        return "No Payment Method";
                    // Get payment method name from ID taken from expense
                    const payment_method = context.payment_methods.filter(
                        (payment_method) =>
                            payment_method.id === expense.payment_method
                    )[0];
                    return payment_method.payment_method_name;
                }, // FUTURE: Make link that filters table to just this method
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    const columnsSmallScreen = React.useMemo(
        () => [
            {
                Header: "Amount",
                accessor: (expense) =>
                    expense.type === "expense" ? (
                        <Link to={`${url}/${expense.id}`}>
                            {currencyFormatter.format(expense.amount)}
                        </Link>
                    ) : (
                        <Link to={`${url}/${expense.id}`}>
                            {currencyFormatter.format(expense.amount * -1)}
                        </Link>
                    ),
            },
            {
                Header: "Date",
                accessor: (expense) =>
                    new Date(expense.date).toLocaleDateString(), // Change this to short form of date
            },
            {
                Header: "Payee",
                accessor: "payee",
            },
        ],
        []
    );

    return (
        <section id='ExpensesPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewExpensePage />
                </Route>
                <Route path={`${path}/:expenseId`}>
                    <EditExpensePage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Expense Log</h1>
                            <AddItemLinkButton
                                to={`${url}/new`}
                                name='Add New Expense'
                                icon='plus-circle'
                            />
                        </header>
                        {context.expenses[0] ? (
                            <div>
                                <div className='expenses_table_small'>
                                    <ExpensesTable
                                        columns={columnsSmallScreen}
                                        data={data}
                                    />
                                </div>
                                <div className='expenses_table_large'>
                                    <ExpensesTable
                                        columns={columnsLargeScreen}
                                        data={data}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                After you add some expenses, they'll appear on
                                this page.
                            </div>
                        )}
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
