// React
import React, { useState, useEffect, useContext } from "react";

// Configuration
import "./DashboardPage.css";
import QuizBuilderContext from "../../contexts/QuizBuilderContext";
import { firstLetterUppercase } from "../../js-utilities";

// Components
import RandomQuizSection from "../../components/RandomQuizSection/RandomQuizSection";
import { Link } from "react-router-dom";

export default function DashboardPage() {
    // Access context
    const context = useContext(QuizBuilderContext);
    const { dateCurrent = new Date(), quizzes } = context;

    // Initialize state
    const [dateSelected, setDateSelected] = useState(new Date(dateCurrent));

    // function shiftCurrentDateByMonths(months) {
    //     const tempDate = new Date(dateCurrent);
    //     tempDate.setMonth(tempDate.getMonth() + months);
    //     return tempDate;
    // }

    // function getShiftedDateString(prefixString, months) {
    //     return `${prefixString} (${shiftCurrentDateByMonths(
    //         months
    //     ).toLocaleString("default", {
    //         month: "long",
    //     })} ${shiftCurrentDateByMonths(months).getFullYear()})`;
    // }

    function QuizList() {
        console.log(quizzes);
        return quizzes.map((quiz) => {
            return (
                <Link to={`quizzes/${quiz.id}`} key={quiz.id}>
                    {quiz.title}
                </Link>
            );
        });
    }

    return (
        <section id='DashboardPage' className='route_page'>
            <header role='banner'>
                <h1>Welcome to Quiz Builder</h1>
            </header>
            <section>
                <h3>Your Quizzes</h3>
                {quizzes[0] ? (
                    <QuizList />
                ) : (
                    <div>
                        After you add some quizzes, they'll appear in this
                        section
                    </div>
                )}
            </section>
            <RandomQuizSection />
        </section>
    );
}
