// React
import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Configuration
import "./NavBar.css";
import QuizBuilderContext from "../../contexts/QuizBuilderContext";
import TokenService from "../../services/token-service";

// Components
import AddItemLinkButton from "../Utilities/AddItemLinkButton/AddItemLinkButton";

export default function NavBar() {
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
        // context.setExpenses([]);
        // context.setPayment_methods([]);
        // context.setCategories([]);
    }

    function createNavLinkList(navLinkTargets) {
        // Build list of NavLinks for <ul> in SideBar
        let navLinks = "";

        navLinks = navLinkTargets.map((navLink) => {
            return (
                <AddItemLinkButton
                    to={"/" + navLink.link}
                    label={navLink.label}
                    name={navLink.name}
                    icon={navLink.icon}
                    key={navLink.name}
                />
            );
        });

        return navLinks;
    }

    function renderAuthorized() {
        const navLinkTargets = [
            {
                label: "New Quiz",
                name: "Create New Quiz",
                link: "quizzes/edit/new",
                icon: "plus-circle",
            },
            {
                label: "Quizzes",
                name: "Go To Quizzes",
                link: "",
                icon: "list-alt",
            },
        ];

        // Get NavLinks for NavBar
        const navLinks = createNavLinkList(navLinkTargets);

        // Add log out button
        navLinks.push(
            <button
                className='link_button'
                type='button'
                title='Log Out'
                key='Log Out'
                aria-label='Log Out'
                onClick={() => handleLogOutClick()}
            >
                <FontAwesomeIcon className='faIcon' icon='sign-out-alt' />
                <div className='button_label'>LOG OUT</div>
            </button>
        );

        return navLinks;
    }

    function renderUnauthorized() {
        const navLinkTargets = [
            {
                label: "Log In",
                name: "Go to Login Page",
                link: "login",
                icon: "sign-in-alt",
            },
            {
                label: "Register",
                name: "Go to Register Page",
                link: "register",
                icon: "plus-square",
            },
        ];

        return createNavLinkList(navLinkTargets);
    }

    return (
        <nav role='navigation'>
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
