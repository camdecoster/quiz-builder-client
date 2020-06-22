// React
import React, { useMemo, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import SimpleTable from "../../Tables/SimpleTable/SimpleTable";

export default function PaymentMethodExpensesTable(props) {
    // Get selected date, payment method info from props
    const { dateSelected = new Date(), payment_methodTotals = [] } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Create table data
    const data = useMemo(() => payment_methodTotals, [
        JSON.stringify(payment_methodTotals),
    ]);

    // Create column headers for payment method expenses table
    const columns = useMemo(
        () => [
            {
                Header: "Method",
                // accessor: "payment_method_name", // accessor is the "key" in the data
                accessor: (payment_method) =>
                    payment_method.payment_method_name !== null ? (
                        <Link to={`/payment-methods/${payment_method.id}`}>
                            {payment_method.payment_method_name}
                        </Link>
                    ) : (
                        "No Payment Method"
                    ),
            },
            {
                Header: "Expenses",
                accessor: (payment_method) =>
                    currencyFormatter.format(payment_method.total),
            },
            {
                Header: "Cycle",
                accessor: (payment_method) => {
                    const monthCurrent = dateSelected.getMonth() + 1;
                    const monthNext = dateSelected.getMonth() + 2;
                    const lastDayOfMonthCurrent = new Date(
                        dateSelected.getFullYear(),
                        dateSelected.getMonth() + 1,
                        0
                    ).getDate();
                    if (payment_method.cycle_type === "offset") {
                        return `${monthCurrent}/${payment_method.cycle_start} to ${monthNext}/${payment_method.cycle_end}`;
                    }
                    return `${monthCurrent}/01 to ${monthCurrent}/${lastDayOfMonthCurrent}`;
                },
            },
        ],
        [dateSelected]
    );

    return <SimpleTable columns={columns} data={data} />;
}
