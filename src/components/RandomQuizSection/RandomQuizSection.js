// React
import React from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./RandomQuizSection.css";
import QuizApiService from "../../services/quiz-api-service";

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
                    onClick={async () => {
                        const res = await QuizApiService.getRandomQuizId();
                        history.push(`/quizzes/${res.id}`);
                    }}
                >
                    Go!
                </button>
            </section>
        </div>
    );
}
