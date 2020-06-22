import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends Component {
    static defaultProps = {
        message: `Something didn't load correctly`,
    };

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h3 className='errorMessage'>
                    There was an error: {this.props.message}.
                </h3>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    message: PropTypes.string.isRequired,
};
