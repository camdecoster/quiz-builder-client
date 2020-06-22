import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RandomQuizSection.css";

export default function RandomQuizSection() {
    return (
        <div className='container_flex'>
            <section>
                <h3>Random Quiz</h3>
                <p>
                    Hit the button below to launch a random quiz. Do you feel
                    lucky?
                </p>
                <button type='button'>Go!</button>
            </section>
        </div>
    );
}
