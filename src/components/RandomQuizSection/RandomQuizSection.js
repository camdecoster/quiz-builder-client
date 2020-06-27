// React
import React from "react";
import { useHistory } from "react-router-dom";

// Configuration
import QuizApiService from "../../services/quiz-api-service";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RandomQuizSection.css";

export default function RandomQuizSection() {
    // Acces history
    const history = useHistory();

    return (
        <div className='container_flex'>
            <section>
                <h3>Random Quiz</h3>
                <p>
                    Hit the button below to launch a random quiz. Do you feel
                    lucky?
                </p>
                <button
                    type='button'
                    onClick={() =>
                        history.push(
                            `/quizzes/${QuizApiService.getRandomQuizId()}`
                        )
                    }
                >
                    Go!
                </button>
            </section>
        </div>
    );
}
