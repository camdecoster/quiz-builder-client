// React
import React from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./LandingPage.css";
import QuizApiService from "../../services/quiz-api-service";

// Components
import ImageQuizKeyboardMobile from "../../images/quiz-keyboard.jpg";
import ImageQuizKeyboardDesktop from "../../images/quiz-keyboard-square.jpg";
import ImageFriendsWithPhoneMobile from "../../images/friends_talking_phone.jpg";
import ImageFriendsWithPhoneDesktop from "../../images/friends_talking_phone_square.jpg";
import ImageQuizMobile from "../../images/quiz_question.png";
import ImageQuizDesktop from "../../images/quiz_question_square.png";
import NavBar from "../../components/NavBar/NavBar";
import NavLinkList from "../../components/Utilities/NavLinkList/NavLinkList";

// Hooks
import useSticky from "./useSticky";

export default function LandingPage() {
    // Access history
    const history = useHistory();

    const firstSectionTargets = [
        {
            label: "Log In",
            alwaysShowLabel: true,
            labelSize: "20px",
            name: "Go to Login Page",
            to: "/login",
            classes: "landing_button",
        },
        {
            label: "Register",
            alwaysShowLabel: true,
            labelSize: "20px",
            name: "Go to Registration Page",
            to: "/register",
            classes: "landing_button",
        },
        {
            label: "Random Quiz",
            alwaysShowLabel: true,
            labelSize: "20px",
            name: "Try a random quiz",
            onClick: async () => {
                const res = await QuizApiService.getRandomQuizId();
                history.push(`/quizzes/${res.id}`);
            },
            classes: "landing_button",
        },
    ];

    const lastSectionTargets = [
        {
            label: "Register",
            alwaysShowLabel: true,
            labelSize: "20px",
            name: "Go to Registration Page",
            to: "/register",
            classes: "landing_button",
        },
        {
            label: "Try Demo",
            alwaysShowLabel: true,
            labelSize: "20px",
            name: "Try the Quiz Builder demo",
            to: "/demo",
            classes: "landing_button",
        },
    ];

    const { isSticky, element } = useSticky();

    return (
        <section id='LandingPage' className='landing_page route_page'>
            <NavBar sticky={isSticky} startHidden={true} />
            <section ref={element} id='landing_first_section'>
                <h1 id='landing_title'>Quiz Builder</h1>
                <p id='landing_subtitle'>Where you can build quizzes</p>
                <div className='container_button'>
                    <NavLinkList navLinks={firstSectionTargets} />
                </div>
            </section>
            <div id='container_other_sections'>
                <section className='landing_other_section'>
                    <h3>We all like quizzes</h3>
                    <div className='container_section'>
                        <img
                            className='landing_image image_mobile'
                            src={ImageQuizKeyboardMobile}
                            alt='close up picture of keyboard with quiz button'
                        />
                        <img
                            className='landing_image image_desktop'
                            src={ImageQuizKeyboardDesktop}
                            alt='close up picture of keyboard with quiz button'
                        />
                        <p className='landing_text'>
                            It's a scientific fact that everyone likes to answer
                            questions when the outcome doesn't matter and the
                            content is enlightening or silly. That's why you
                            should build a quiz and send it to your friends. And
                            since you're already here at Quiz Builder, why not
                            start now?
                        </p>
                    </div>
                </section>
                <section className='landing_other_section'>
                    <h3>What is it?</h3>
                    <div className='container_section'>
                        <img
                            className='landing_image image_mobile'
                            src={ImageQuizMobile}
                            alt='screenshot of question from quiz builder'
                        />
                        <img
                            className='landing_image image_desktop'
                            src={ImageQuizDesktop}
                            alt='screenshot of question from quiz builder'
                        />
                        <p className='landing_text'>
                            Quiz Builder is a site that helps you create simple
                            multiple choice quizzes and share them with your
                            friends. To get started, create an account and build
                            your first quiz! Each quiz can have up to 20
                            questions and each question can have up to 8 answer
                            choices.
                        </p>
                    </div>
                </section>
                <section className='landing_other_section'>
                    <h3>Share with your Friends</h3>
                    <div className='container_section'>
                        <img
                            className='landing_image image_mobile'
                            src={ImageFriendsWithPhoneMobile}
                            alt='three friends talking around a phone'
                        />
                        <img
                            className='landing_image image_desktop'
                            src={ImageFriendsWithPhoneDesktop}
                            alt='screenshot of quiz builder dashboard'
                        />
                        <p className='landing_text'>
                            After you're done, share the quiz URL with anyone
                            you want to take it. All quizzes will be public, so
                            anyone can take them. Are you feeling lucky? Click
                            the random quiz button and try someone else's quiz.
                            Get started today!
                        </p>
                    </div>
                </section>
            </div>
            <div className='container_button'>
                <NavLinkList navLinks={lastSectionTargets} />
            </div>
        </section>
    );
}
