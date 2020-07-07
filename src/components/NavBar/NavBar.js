// React
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// Configuration
import "./NavBar.css";
import QuizApiService from "../../services/quiz-api-service";
import QuizBuilderContext from "../../contexts/QuizBuilderContext";
import TokenService from "../../services/token-service";

// Components
import NavLinkList from "../Utilities/NavLinkList/NavLinkList";

export default function NavBar({ sticky, startHidden }) {
    // Access context
    const context = useContext(QuizBuilderContext);

    // Access history
    const history = useHistory();

    // Handle tasks when logging out
    function handleLogOutClick() {
        // Clear auth token
        TokenService.clearAuthToken();

        // Route to homepage
        history.push("/");

        // Clear out User information
        context.setQuizzes([]);
    }

    function renderAuthorized() {
        const navLinkTargets = [
            {
                label: "New Quiz",
                name: "Create New Quiz",
                to: "/quizzes/edit/new",
                icon: "plus-circle",
            },
            {
                label: "Quizzes",
                name: "Go To Quizzes",
                to: "/",
                icon: "list-alt",
            },
            {
                label: "Random",
                name: "Try a random quiz",
                icon: "random",
                onClick: async () => {
                    const res = await QuizApiService.getRandomQuizId();
                    history.push(`/quizzes/${res.id}`);
                },
            },
            {
                label: "Log Out",
                name: "Log out of Quiz Builder",
                icon: "sign-out-alt",
                onClick: () => handleLogOutClick(),
            },
        ];

        return <NavLinkList navLinks={navLinkTargets} />;
    }

    function renderUnauthorized() {
        const navLinkTargets = [
            {
                label: "Log In",
                name: "Go to Login Page",
                to: "/login",
                icon: "sign-in-alt",
            },
            {
                label: "Register",
                name: "Go to Register Page",
                to: "/register",
                icon: "plus-square",
            },
            {
                label: "Random",
                name: "Try a random quiz",
                icon: "random",
                onClick: async () => {
                    const res = await QuizApiService.getRandomQuizId();
                    history.push(`/quizzes/${res.id}`);
                },
            },
        ];

        return <NavLinkList navLinks={navLinkTargets} />;
    }

    return (
        <nav
            className={`${
                startHidden ? `${sticky ? "sticky" : "not_sticky"}` : ""
            }`}
            role='navigation'
        >
            <h1>
                <Link
                    to='/'
                    title={
                        TokenService.hasAuthToken()
                            ? "Go to Dashboard"
                            : "Go to Main Page"
                    }
                >
                    QUIZ BUILDER
                </Link>
            </h1>
            <div className='link_list'>
                {/* Links and logout should only be shown if user logged in */}
                {TokenService.hasAuthToken()
                    ? renderAuthorized()
                    : renderUnauthorized()}
            </div>
            {!!TokenService.getUser() ? (
                <p id='logged_in_note'>
                    {`Logged in as ${TokenService.getUser()}`}
                </p>
            ) : (
                ""
            )}
        </nav>
    );
}
