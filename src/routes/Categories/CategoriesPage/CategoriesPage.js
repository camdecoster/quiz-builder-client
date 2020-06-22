// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./CategoriesPage.css";
import TrackerContext from "../../../contexts/TrackerContext";
import { firstLetterUppercase } from "../../../js-utilities";

// Components
import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";
import EditCategoryPage from "../EditCategoryPage/EditCategoryPage";
import NewCategoryPage from "../NewCategoryPage/NewCategoryPage";
import SimpleTable from "../../../components/Tables/SimpleTable/SimpleTable";

export default function CategoriesPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const data = React.useMemo(() => context.categories, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Category",
                accessor: (row) => {
                    return (
                        <Link to={`${url}/${row.id}`}>{row.category_name}</Link>
                    );
                },
            },
            {
                Header: "Budget",
                accessor: (category) => {
                    return `${currencyFormatter.format(
                        category.amount
                    )} (${firstLetterUppercase(category.type)})`;
                },
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    return (
        <section id='CategoriesPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewCategoryPage />
                </Route>
                <Route path={`${path}/:categoryId`}>
                    <EditCategoryPage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Budget Categories</h1>
                            <AddItemLinkButton
                                to={`${url}/new`}
                                name='Add New Category'
                                icon='plus-circle'
                            />
                        </header>
                        {context.categories[0] ? (
                            <SimpleTable columns={columns} data={data} />
                        ) : (
                            <div>
                                After you add some categories, they'll appear on
                                this page.
                            </div>
                        )}
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
