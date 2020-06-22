// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./PaymentMethodsPage.css";
import TrackerContext from "../../../contexts/TrackerContext";
import { firstLetterUppercase } from "../../../js-utilities";

// Components
import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";
import EditPaymentMethodPage from "../EditPaymentMethodPage/EditPaymentMethodPage";
import NewPaymentMethodPage from "../NewPaymentMethodPage/NewPaymentMethodPage";
import SimpleTable from "../../../components/Tables/SimpleTable/SimpleTable";

export default function PaymentMethodsPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    const data = React.useMemo(() => context.payment_methods, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Method",
                accessor: (row) => {
                    return (
                        <Link to={`${url}/${row.id}`}>
                            {row.payment_method_name}
                        </Link>
                    );
                },
            },
            {
                Header: "Cycle",
                accessor: (payment_method) => {
                    const {
                        cycle_type,
                        cycle_start,
                        cycle_end,
                    } = payment_method;
                    const cycleDays =
                        cycle_type === "offset"
                            ? ` (Day ${cycle_start} to Day ${cycle_end})`
                            : "";
                    return `${firstLetterUppercase(
                        payment_method.cycle_type
                    )}${cycleDays}`;
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
        <section id='PaymentMethodsPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewPaymentMethodPage />
                </Route>
                <Route path={`${path}/:payment_methodId`}>
                    <EditPaymentMethodPage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Payment Methods</h1>
                            <AddItemLinkButton
                                to={`${url}/new`}
                                name='Add New Payment Method'
                                icon='plus-circle'
                            />
                        </header>
                        {context.payment_methods[0] ? (
                            <SimpleTable columns={columns} data={data} />
                        ) : (
                            <div>
                                After you add some payment methods, they'll
                                appear on this page.
                            </div>
                        )}
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
