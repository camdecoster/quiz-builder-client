// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./QuizzesPage.css";
import QuizBuilderContext from "../../../contexts/QuizBuilderContext";
import { firstLetterUppercase } from "../../../js-utilities";

// Components
import AddItemLinkButton from "../../../components/Utilities/AddItemLinkButton/AddItemLinkButton";
import EditQuizPage from "../EditQuizPage/EditQuizPage";
import PrivateRoute from "../../../components/Utilities/PrivateRoute/PrivateRoute";
import QuizPage from "../QuizPage/QuizPage";
import SimpleTable from "../../../components/Tables/SimpleTable/SimpleTable";

export default function QuizzesPage() {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Populate table data
    const data = React.useMemo(() => context.quizzes);

    const columns = React.useMemo(
        () => [
            {
                Header: "Quiz",
                accessor: (quiz) => {
                    return <Link to={`${url}/${quiz.id}`}>{quiz.title}</Link>;
                },
            },
            {
                Header: "Length",
                accessor: (quiz) => {
                    return `${quiz.questions.length}`;
                },
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Edit",
                accessor: (quiz) => {
                    return <Link to={`${url}/${quiz.id}/edit`}>Edit</Link>;
                },
            },
        ],
        []
    );

    return (
        <section id='QuizzesPage' className='route_page'>
            <Switch>
                {/* <PrivateRoute
                    path={`${path}/new`}
                    render={(routerProps) => (
                        <div>
                            <p>New Quiz</p>
                        </div>
                    )}
                /> */}
                <Route path={`${path}/:quizId/edit`}>
                    <EditQuizPage />
                </Route>
                <Route path={`${path}/:quizId`}>
                    <QuizPage />
                </Route>
                <PrivateRoute
                    path={path}
                    render={(routerProps) => (
                        <div>
                            <header role='banner'>
                                <h1>Your Quizzes</h1>
                                <AddItemLinkButton
                                    to={`${url}/new/edit`}
                                    name='Add New Quiz'
                                    icon='plus-circle'
                                />
                            </header>
                            {context.quizzes[0] ? (
                                <SimpleTable columns={columns} data={data} />
                            ) : (
                                <div>
                                    After you add some quizzes, they'll appear
                                    on this page.
                                </div>
                            )}
                        </div>
                    )}
                />
            </Switch>
        </section>
    );
}
