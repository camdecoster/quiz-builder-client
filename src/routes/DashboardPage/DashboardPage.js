// React
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./DashboardPage.css";
import QuizBuilderContext from "../../contexts/QuizBuilderContext";

// Components
import SimpleTable from "../../components/Tables/SimpleTable/SimpleTable";

export default function DashboardPage() {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Initialize state

    // Populate table data
    const data = React.useMemo(() => context.quizzes);

    const columns = React.useMemo(
        () => [
            {
                Header: "Edit Quiz",
                accessor: (quiz) => {
                    return (
                        <Link to={`quizzes/edit/${quiz.id}`}>{quiz.title}</Link>
                    );
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
                headerClassName: "left_align",
            },
            {
                Header: "Launch Quiz",
                accessor: (quiz) => {
                    return <Link to={`quizzes/${quiz.id}`}>Link</Link>;
                },
            },
        ],
        []
    );

    return (
        <section id='DashboardPage' className='route_page'>
            <header role='banner'>
                <h3>Welcome to Quiz Builder</h3>
            </header>
            <p className='intro'>
                Here are your quizzes. Use the navigation buttons to create a
                new quiz or try a random one. When you're done with a quiz, send
                the link to your friends.
            </p>
            <section>
                <h3>Your Quizzes</h3>
                {context.quizzes[0] ? (
                    <SimpleTable columns={columns} data={data} />
                ) : (
                    <div>
                        Your quizzes are loading or you haven't built one yet.
                        Try clicking that plus sign in the navigation buttons.
                    </div>
                )}
            </section>
        </section>
    );
}
