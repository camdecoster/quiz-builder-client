// React
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

// Configuration
import "./AddItemLinkButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddItemLinkButton(props) {
    return (
        <Link
            id='AddItemLinkButton'
            to={props.to}
            title={props.name}
            aria-label={props.name}
        >
            <button
                className='link_button'
                type='button'
                aria-label={props.name}
            >
                <FontAwesomeIcon className='faIcon' icon={props.icon} />
            </button>
        </Link>
    );
}
