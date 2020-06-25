// React
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// Get icons from Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faCreditCard,
    faDollarSign,
    faList,
    faListAlt,
    faMoneyBill,
    faMoneyBillWave,
    faPlayCircle,
    faPlusCircle,
    faPlusSquare,
    faSignInAlt,
    faSignOutAlt,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Configuration
import "./App.css";
import QuizApiService from "../../services/quiz-api-service";
import TokenService from "../../services/token-service";
import QuizBuilderContext from "../../contexts/QuizBuilderContext";

// Components
import ErrorBoundary from "../Utilities/ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PrivateRoute from "../Utilities/PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../Utilities/PublicOnlyRoute/PublicOnlyRoute";
import PageNotFound from "../PageNotFound/PageNotFound";

// Routes
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import QuizzesPage from "../../routes/QuizzesPage/QuizzesPage";

export default function App() {
    // Initialize state
    const [quizzes, setQuizzes] = useState([]);
    const [classNames, setClassNames] = useState({
        App_container_page: "container_page",
    });
    const [dateCurrent, setDateCurrent] = useState(new Date());
    const [error, setError] = useState(null);

    // Add Font Awesome icons to library
    library.add(
        faBars,
        faCreditCard,
        faDollarSign,
        faGithubSquare,
        faLinkedin,
        faList,
        faListAlt,
        faMoneyBill,
        faMoneyBillWave,
        faPlayCircle,
        faPlusCircle,
        faPlusSquare,
        faSignInAlt,
        faSignOutAlt,
        faUserCircle
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
        if (TokenService.hasAuthToken()) {
            QuizApiService.getQuizzes().then((quizzes) => setQuizzes(quizzes));
            console.log("Quizzes:", quizzes);
        }
    }, [JSON.stringify(quizzes), TokenService.hasAuthToken()]);

    const contextValue = {
        dateCurrent: dateCurrent,
        quizzes: quizzes,
        setClassNames: setClassNames,
        setQuizzes: setQuizzes,
        toggleClassNames: toggleClassNames,
    };

    return (
        <div id='App'>
            <QuizBuilderContext.Provider value={contextValue}>
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
                            <Route
                                path='/quizzes'
                                render={(routerProps) => (
                                    <ErrorBoundary
                                        message={
                                            TokenService.hasAuthToken()
                                                ? `Couldn't load Dashboard page`
                                                : `Couldn't load Landing page`
                                        }
                                    >
                                        <QuizzesPage />
                                    </ErrorBoundary>
                                )}
                            />
                            {/* <PrivateRoute
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
                            /> */}
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
            </QuizBuilderContext.Provider>
        </div>
    );
}
