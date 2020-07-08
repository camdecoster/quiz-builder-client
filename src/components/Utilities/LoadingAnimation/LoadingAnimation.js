// React
import React from "react";

// Configuration
import "./LoadingAnimation.css";

export default function LoadingAnimation() {
    return (
        <div id='container_spinner'>
            {/* Used under CC0 license from https://loading.io/css/ */}
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
