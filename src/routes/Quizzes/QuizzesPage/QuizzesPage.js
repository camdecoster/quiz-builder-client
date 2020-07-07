// React
import React from "react";
import { Route, Redirect, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./QuizzesPage.css";

// Components
import EditQuizPage from "../EditQuizPage/EditQuizPage";
import PrivateRoute from "../../../components/Utilities/PrivateRoute/PrivateRoute";
import QuizPage from "../QuizPage/QuizPage";

export default function QuizzesPage() {
    // Initialize state

    // Get path info from Route
    const { path } = useRouteMatch();

    return (
        <section id='QuizzesPage' className='route_page'>
            <Switch>
                <PrivateRoute
                    path={`${path}/edit/:quizId`}
                    render={(routerProps) => <EditQuizPage />}
                />
                <Route path={`${path}/:quizId`}>
                    <QuizPage />
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to='' />
                </Route>
            </Switch>
        </section>
    );
}
