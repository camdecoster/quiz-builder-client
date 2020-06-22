// React
import React from "react";
import { Link } from "react-router-dom";
import ImageQuizKeyboard from "../../images/quiz-keyboard.jpg";
import ImageFriendsWithPhone from "../../images/friends_talking_phone.jpg";
import ImageItems from "../../images/groceries.jpg";

// Configuration
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <section id='LandingPage' className='route_page'>
            <section>
                <h3>We all like quizzes</h3>
                <img
                    className='landing_image'
                    src={ImageQuizKeyboard}
                    alt='close up picture of keyboard with quiz button'
                />
                <p>
                    It's a scientific fact that everyone likes to answer
                    questions when the outcome doesn't matter and the content is
                    enlightening or silly. It's also widely known that people
                    are competitive and want to prove how much they know. That's
                    why you should build a quiz and send it to your friends. And
                    since you're already here at Quiz Builder, why not start
                    here?
                </p>
            </section>

            <section>
                <h3>What is it?</h3>
                <p>
                    [<em>Placeholder for image of Quiz Builder interface</em>]
                </p>
                <p>
                    Quiz Builder is a site that helps you create simple multiple
                    choice quizzes and share them with your friends. To get
                    started, create an account and build your first quiz! Each
                    quiz can have up to 20 questions and each question can have
                    up to 8 answer choices.
                </p>
            </section>

            <section>
                <h3>Share with your Friends</h3>
                <img
                    className='landing_image'
                    src={ImageFriendsWithPhone}
                    alt='three friends talking around a phone'
                />
                <p>
                    After you're done, share the quiz URL with anyone you want
                    to take it. All quizzes will be public, so anyone can take
                    them. Are you feeling lucky? Click the random quiz button
                    and try someone else's quiz. Get started today!
                </p>
            </section>

            <section>
                <Link to='/register'>
                    <h3 className='landing_link'>Sign up for Quiz Builder</h3>
                </Link>
                <Link to='/demo'>
                    <h3 className='landing_link'>Try the Demo</h3>
                </Link>
            </section>
        </section>
    );
}
