// React
import React from "react";
import { Link } from "react-router-dom";

// Configuration
import "./AddItemLinkButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button(props) {
    return (
        <button
            className={`link_button ${props.classes ? props.classes : ""}`}
            type='button'
            aria-label={props.name}
            onClick={props.onClick ? () => props.onClick() : undefined}
        >
            {props.icon ? (
                <FontAwesomeIcon className='faIcon' icon={props.icon} />
            ) : (
                ""
            )}
            <div
                className={`button_label ${
                    !props.alwaysShowLabel ? "hide_label" : ""
                }`}
                style={props.labelSize ? { fontSize: props.labelSize } : null}
            >
                {props.label.toUpperCase()}
            </div>
        </button>
    );
}

export default function AddItemLinkButton(props) {
    return (
        <div id='AddItemLinkButton'>
            {props.to ? (
                <Link to={props.to} title={props.name} aria-label={props.name}>
                    <Button {...props} />
                </Link>
            ) : (
                <Button {...props} />
            )}
        </div>
    );
}
