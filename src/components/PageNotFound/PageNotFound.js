import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <section id='PageNotFound'>
            <h3>Page Not Found</h3>
            <p>
                The page you were looking for can't be found. Head back to the{" "}
                <Link to={"/"}>main page</Link> and try again.
            </p>
        </section>
    );
}
