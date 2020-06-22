// React
import React from "react";

// Configuration
import "./ErrorMessage.css";

export default function ErrorMessage(props) {
    const { message = `Something didn't load correctly` } = props;
    return <h4 className='errorMessage'>There was an error: {message}</h4>;
}
