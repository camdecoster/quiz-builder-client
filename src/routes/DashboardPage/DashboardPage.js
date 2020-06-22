// React
import React, { useState, useEffect, useContext } from "react";

// Configuration
import "./DashboardPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import { firstLetterUppercase } from "../../js-utilities";

// Components
import CategoryExpensesTable from "../../components/Tables/CategoryExpensesTable/CategoryExpensesTable";
import PaymentMethodExpensesTable from "../../components/Tables/PaymentMethodExpensesTable/PaymentMethodExpensesTable";
import CategoriesBarChart from "../../components/Charts/CategoriesBarChart/CategoriesBarChart";
import PaymentMethodsBarChart from "../../components/Charts/PaymentMethodsBarChart/PaymentMethodsBarChart";

export default function DashboardPage() {
    // Access context
    const context = useContext(TrackerContext);
    const { dateCurrent = new Date() } = context;

    // Initialize state
    const [dateSelected, setDateSelected] = useState(new Date(dateCurrent));
    const [dateString, setDateString] = useState(
        `${dateSelected.toLocaleString("default", {
            month: "long",
        })} ${dateSelected.getFullYear()}`
    );
    const [spendingInterval, setSpendingInterval] = useState("month");

    const [categoryTotals, setCategoryTotals] = useState([]);
    const [payment_methodTotals, setPayment_methodTotals] = useState([]);

    // Create link to change interval
    const createIntervalChangeButton = (interval) => {
        return (
            <button
                className={
                    spendingInterval === interval
                        ? "interval intervalActive"
                        : "interval"
                }
                onClick={() => setSpendingInterval(interval)}
            >
                {firstLetterUppercase(interval) + "ly"}
            </button>
        );
    };

    // Get categories, payment methods, expenses from context
    const { categories, payment_methods, expenses } = context;

    // Get totals of expenses in each category, payment method
    useEffect(() => {
        // Make sure info has been received from API
        if (categories[0] && payment_methods[0] && expenses[0]) {
            // Add total item to each category
            const categoryTotals = categories.map((category) => {
                return {
                    ...category,
                    total: 0,
                };
            });
            categoryTotals.sort((a, b) => {
                let compareResult = 0;
                if (a.category_name > b.category_name) {
                    compareResult = 1;
                } else if (a.category_name < b.category_name) {
                    compareResult = -1;
                }
                return compareResult;
            });
            // Add Uncategorized category to categoryTotals
            categoryTotals.push({
                category_name: null,
                amount: "0",
                total: 0,
            });

            // Add total item to each payment method
            const payment_methodTotals = payment_methods.map(
                (payment_method) => {
                    return {
                        ...payment_method,
                        total: 0,
                    };
                }
            );
            // Add No Payment Method payment method to payment_methodTotals
            payment_methodTotals.push({
                payment_method_name: null,
                // amount: "0",
                total: 0,
            });

            expenses.forEach((expense) => {
                // Add up expense info for the selected period of time
                // Just use monthly for now

                if (spendingInterval === "month") {
                    const dateExpense = new Date(expense.date);

                    // Check if expense should be added to category total
                    categoryTotals.forEach((category) => {
                        if (
                            dateExpense.getMonth() ===
                                dateSelected.getMonth() &&
                            (expense.category === category.id ||
                                (expense.category === null &&
                                    category.category_name === null)) // Account for Uncategorized expenses
                        ) {
                            const isExpense =
                                expense.type === "expense" ? 1 : -1;
                            category.total +=
                                parseFloat(expense.amount) * isExpense;
                        }
                    });

                    // Check if expense should be added to payment method total
                    payment_methodTotals.forEach((payment_method) => {
                        // Is this payment method linked to this expense?
                        if (
                            expense.payment_method === payment_method.id ||
                            (expense.payment_method === null &&
                                payment_method.payment_method_name === null) // Account for No Payment Method expenses
                        ) {
                            // Check if payment method uses offset cycle
                            if (payment_method.cycle_type === "offset") {
                                // console.log("Uses offset cycle");
                                let cycleStartDate = new Date(dateSelected);
                                let cycleEndDate = new Date(dateSelected);
                                // // Check if month cycle starts in current month
                                // if (
                                //     dateSelected.getDate() >=
                                //     payment_method.cycle_start
                                // ) {
                                //     // DON'T FORGET TO CHECK FOR DAY FALLING OUTSIDE OF MONTH (like day 31 in February)
                                //     // Get cycle start date and end date, see if expense date is in that range

                                //     cycleStartDate.setDate(
                                //         payment_method.cycle_start
                                //     );

                                //     cycleEndDate.setMonth(
                                //         dateSelected.getMonth() + 1
                                //     );
                                //     cycleEndDate.setDate(
                                //         payment_method.cycle_end
                                //     );
                                // }
                                // // Else month cycle starts in last month
                                // else {
                                //     // DON'T FORGET TO CHECK FOR DAY FALLING OUTSIDE OF MONTH (like day 31 in February)
                                //     // Get cycle start date and end date, see if expense date is in that range
                                //     cycleStartDate.setMonth(
                                //         dateSelected.getMonth() - 1
                                //     );
                                //     cycleStartDate.setDate(
                                //         payment_method.cycle_start
                                //     );

                                //     cycleEndDate.setDate(
                                //         payment_method.cycle_end
                                //     );
                                //     console.log("Start", cycleStartDate);
                                //     console.log("End", cycleEndDate);
                                // }

                                // Always set offset period to start in current month, end next month
                                cycleStartDate.setDate(
                                    payment_method.cycle_start
                                );
                                cycleEndDate.setMonth(
                                    dateSelected.getMonth() + 1
                                );
                                cycleEndDate.setDate(payment_method.cycle_end);

                                // If expense falls in cycle range, add total
                                if (
                                    dateExpense >= cycleStartDate &&
                                    dateExpense <= cycleEndDate
                                ) {
                                    // console.log(
                                    //     "Cycle start date is",
                                    //     cycleStartDate
                                    // );
                                    // console.log(
                                    //     "Cycle end date is",
                                    //     cycleEndDate
                                    // );
                                    payment_method.total += parseFloat(
                                        expense.amount
                                    );
                                }
                            }
                            // If not offset, then it should be monthly
                            // Add all expenses that are from current month
                            else if (
                                dateExpense.getMonth() ===
                                dateSelected.getMonth()
                            ) {
                                // console.log("Uses monthly cycle");
                                const isExpense =
                                    expense.type === "expense" ? 1 : -1;
                                payment_method.total +=
                                    parseFloat(expense.amount) * isExpense;
                            }
                        }
                    });
                }
            });

            setCategoryTotals(categoryTotals);
            setPayment_methodTotals(payment_methodTotals);
            // console.log("Checked expenses");
        }
    }, [
        // Only update when one of these variables changes
        JSON.stringify(categories),
        JSON.stringify(payment_methods),
        JSON.stringify(expenses),
        dateSelected,
    ]);

    // Update date string after selection changes
    useEffect(() => {
        setDateString(
            `${dateSelected.toLocaleString("default", {
                month: "long",
            })} ${dateSelected.getFullYear()}`
        );
    }, [dateSelected]);

    function shiftCurrentDateByMonths(months) {
        const tempDate = new Date(dateCurrent);
        tempDate.setMonth(tempDate.getMonth() + months);
        return tempDate;
    }

    function getShiftedDateString(prefixString, months) {
        return `${prefixString} (${shiftCurrentDateByMonths(
            months
        ).toLocaleString("default", {
            month: "long",
        })} ${shiftCurrentDateByMonths(months).getFullYear()})`;
    }

    return (
        <section id='DashboardPage' className='route_page'>
            <header role='banner'>
                <h1>Dashboard</h1>
            </header>
            <section>
                {/* Add budget interval in future */}
                {/* <div className='intervalSelector'>
                    {createIntervalChangeButton("month")}
                    {createIntervalChangeButton("quarter")}
                    {createIntervalChangeButton("year")}
                </div> */}
                <select
                    name='display-month'
                    id='display-month'
                    onChange={(ev) =>
                        setDateSelected(
                            shiftCurrentDateByMonths(-parseInt(ev.target.value))
                        )
                    }
                >
                    <option value='0'>
                        {getShiftedDateString("Current Month", 0)}
                    </option>
                    <option value='1'>
                        {getShiftedDateString("Previous Month", -1)}
                    </option>
                    <option value='2'>
                        {getShiftedDateString("2 Months Ago", -2)}
                    </option>
                    <option value='3'>
                        {getShiftedDateString("3 Months Ago", -3)}
                    </option>
                    <option value='4'>
                        {getShiftedDateString("4 Months Ago", -4)}
                    </option>
                    <option value='5'>
                        {getShiftedDateString("5 Months Ago", -5)}
                    </option>
                    <option value='6'>
                        {getShiftedDateString("6 Months Ago", -6)}
                    </option>
                </select>
            </section>
            <section className='spending_category'>
                <h4>
                    {firstLetterUppercase(spendingInterval) + "ly"} Spending
                </h4>
                {categoryTotals[0] ? (
                    <CategoryExpensesTable categoryTotals={categoryTotals} />
                ) : (
                    "Add some categories to track your progress"
                )}
                {categoryTotals[0] ? (
                    <CategoriesBarChart
                        date={dateString}
                        categories={categoryTotals}
                    />
                ) : (
                    ""
                )}
            </section>
            <section className='spending_payment_method'>
                <h4>Payment Methods</h4>
                {payment_methodTotals[0] ? (
                    <PaymentMethodExpensesTable
                        dateSelected={dateSelected}
                        payment_methodTotals={payment_methodTotals}
                    />
                ) : (
                    "Add some payment methods to track your progress"
                )}
                {payment_methodTotals[0] ? (
                    <PaymentMethodsBarChart
                        date={dateString}
                        payment_methods={payment_methodTotals}
                    />
                ) : (
                    ""
                )}
            </section>
        </section>
    );
}
