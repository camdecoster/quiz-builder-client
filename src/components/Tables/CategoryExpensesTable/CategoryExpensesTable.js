// React
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Components
import SimpleTable from "../../Tables/SimpleTable/SimpleTable";

export default function CategoryExpensesTable(props) {
    // Get selected date from props
    const { categoryTotals = [] } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Create table data
    const data = useMemo(() => categoryTotals, [
        // Only update when categoryTotals is changed
        JSON.stringify(categoryTotals),
    ]);

    // Create column headers for category expenses table
    const columns = useMemo(
        () => [
            {
                Header: "Category",
                accessor: (category) =>
                    category.category_name !== null ? (
                        <Link to={`/categories/${category.id}`}>
                            {category.category_name}
                        </Link>
                    ) : (
                        "Uncategorized"
                    ),
            },
            {
                Header: "Expenses",
                accessor: (category) => {
                    return `${currencyFormatter.format(category.total)}`;
                },
            },
            {
                Header: "Budget",
                accessor: (category) =>
                    currencyFormatter.format(category.amount),
            },
            {
                Header: "Remain",
                accessor: (category) => {
                    return `${currencyFormatter.format(
                        category.amount - category.total
                    )}`;
                },
            },
        ],
        []
    );

    return <SimpleTable columns={columns} data={data} />;
}
