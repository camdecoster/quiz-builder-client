// React
import React from "react";

// Configuratoin
import "./LoadingAnimation.css";

export default function LoadingAnimation() {
    return (
        <div id='container_spinner'>
            <div className='lds-spinner'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
