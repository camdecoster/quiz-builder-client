// React
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// Get icons from Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faUserCircle,
    faPlusCircle,
    faDollarSign,
    faMoneyBill,
    faMoneyBillWave,
    faCreditCard,
    faList,
    faSignInAlt,
    faSignOutAlt,
    faPlusSquare,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

// Configuration
import "./App.css";
import CategoryApiService from "../../services/category-api-service";
import ExpenseApiService from "../../services/expense-api-service";
import PaymentMethodApiService from "../../services/payment_method-api-service";
import TokenService from "../../services/token-service";
import TrackerContext from "../../contexts/TrackerContext";

// Components
import ErrorBoundary from "../Utilities/ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PrivateRoute from "../Utilities/PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../Utilities/PublicOnlyRoute/PublicOnlyRoute";
import PageNotFound from "../PageNotFound/PageNotFound";

// Routes
import CategoriesPage from "../../routes/Categories/CategoriesPage/CategoriesPage";
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import ExpensesPage from "../../routes/Expenses/ExpensesPage/ExpensesPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import PaymentMethodsPage from "../../routes/Payment_methods/PaymentMethodsPage/PaymentMethodsPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";

export default function App() {
    // Initialize state
    const [categories, setCategories] = useState([]);
    const [classNames, setClassNames] = useState({
        App_container_page: "container_page",
        SideBar: "",
    });
    const [dateCurrent, setDateCurrent] = useState(new Date());
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [payment_methods, setPayment_methods] = useState([]);

    // Add Font Awesome icons to library
    library.add(
        faBars,
        faUserCircle,
        faPlusCircle,
        faDollarSign,
        faMoneyBill,
        faMoneyBillWave,
        faCreditCard,
        faList,
        faSignInAlt,
        faSignOutAlt,
        faPlusSquare,
        faPlayCircle
    );

    // Toggle classNames for every item in given object
    function toggleClassNames(classNamesObj) {
        const newClassNames = {};

        for (let element in classNamesObj) {
            const classNamesToToggleString = classNamesObj[element];
            // Split given classNames into array
            // classNamesToToggle should be space delimited string: 'class1 class2'
            let classNamesToToggle = classNamesToToggleString.split(" ");

            // Split current classNames into array
            let localClassNames = classNames[element].split(" ");

            // See if each new className is listed or not, toggle it on/off
            classNamesToToggle.forEach((classNameToToggle) => {
                const classNameFound = localClassNames.find(
                    (className) => className === classNameToToggle
                );
                if (classNameFound) {
                    // Remove className from array
                    localClassNames = localClassNames.filter(
                        (className) => className !== classNameToToggle
                    );
                } else {
                    // Add className to array
                    localClassNames.push(classNameToToggle);
                }
            });
            // Save new classNames for current element
            newClassNames[element] = localClassNames.join(" ");
            // updateClassNames(element, localClassNames.join(" "));
        }

        // Update classNames for all elements, leave rest as is
        updateClassNames(newClassNames);
    }

    function updateClassNames(newClassNames) {
        setClassNames({
            ...classNames,
            ...newClassNames,
        });
    }

    useEffect(() => {
        // Only get info from API if user is logged in

        // Get categories from API, store in context
        if (TokenService.hasAuthToken()) {
            CategoryApiService.getCategories().then((categories) =>
                setCategories(categories)
            );
        }

        // Get payment methods from API, store in context
        if (TokenService.hasAuthToken()) {
            PaymentMethodApiService.getPayment_methods().then(
                (payment_methods) => setPayment_methods(payment_methods)
            );
        }

        // Get expenses from API, store in context
        if (TokenService.hasAuthToken()) {
            ExpenseApiService.getExpenses().then((expenses) =>
                setExpenses(expenses)
            );
        }
    }, [
        JSON.stringify(categories),
        JSON.stringify(payment_methods),
        JSON.stringify(expenses),
        TokenService.hasAuthToken(),
    ]);

    const contextValue = {
        categories: categories,
        dateCurrent: dateCurrent,
        expenses: expenses,
        payment_methods: payment_methods,
        setCategories: setCategories,
        setClassNames: setClassNames,
        setExpenses: setExpenses,
        setPayment_methods: setPayment_methods,
        toggleClassNames: toggleClassNames,
    };

    return (
        <div id='App'>
            <TrackerContext.Provider value={contextValue}>
                {/* <SideBar className={classNames.SideBar} /> */}

                <section
                    id='container_page'
                    className={classNames.App_container_page}
                >
                    <NavBar />
                    <main>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={
                                            TokenService.hasAuthToken()
                                                ? `Couldn't load Dashboard page`
                                                : `Couldn't load Landing page`
                                        }
                                    >
                                        {TokenService.hasAuthToken() ? (
                                            <DashboardPage />
                                        ) : (
                                            <LandingPage />
                                        )}
                                    </ErrorBoundary>
                                )}
                            />
                            <PublicOnlyRoute
                                path='/register'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Registration page`}
                                    >
                                        <RegistrationPage {...routerProps} />
                                    </ErrorBoundary>
                                )}
                            />
                            <PublicOnlyRoute
                                path='/login'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Login page`}
                                    >
                                        <LoginPage />
                                    </ErrorBoundary>
                                )}
                            />
                            <PrivateRoute
                                path='/expenses'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Expense Log page`}
                                    >
                                        <ExpensesPage {...routerProps} />
                                    </ErrorBoundary>
                                )}
                            />
                            <PrivateRoute
                                path='/categories'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Categories page`}
                                    >
                                        <CategoriesPage {...routerProps} />
                                    </ErrorBoundary>
                                )}
                            />
                            <PrivateRoute
                                path='/payment-methods'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Payment Methods page`}
                                    >
                                        <PaymentMethodsPage {...routerProps} />
                                    </ErrorBoundary>
                                )}
                            />
                            <PublicOnlyRoute
                                path='/demo'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={`Couldn't load Demo page`}
                                    >
                                        <LoginPage
                                            // Pass in info to log in to demo account
                                            message='LOG IN TO THE DEMO ACCOUNT'
                                            email={"testuser_1@test.com"}
                                            password={"test12$FOUR"}
                                        />
                                    </ErrorBoundary>
                                )}
                            />
                            {/* Catch requests to pages that don't exist */}
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>
                    <Footer />
                </section>
            </TrackerContext.Provider>
        </div>
    );
}
