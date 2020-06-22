import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className='container_flex'>
                <p>Created by Cameron DeCoster</p>
                <a
                    href='https://github.com/camdecoster/quiz-builder-client'
                    title='GitHub Repository'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub Repository'
                >
                    <FontAwesomeIcon
                        className='faIcon'
                        icon={["fab", "github-square"]}
                    />
                </a>
                <a
                    href='https://www.linkedin.com/in/camerondecoster/'
                    title='LinkedIn Profile'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn Profile'
                >
                    <FontAwesomeIcon
                        className='faIcon'
                        icon={["fab", "linkedin"]}
                    />
                </a>
            </div>
        </footer>
    );
}
