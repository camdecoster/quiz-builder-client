import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../../services/token-service";

function PublicOnlyRoute({ render, ...props }) {
    const Component = render;
    return (
        <Route
            {...props}
            render={(componentProps) =>
                TokenService.hasAuthToken() ? (
                    <Redirect to={"/"} />
                ) : (
                    <Component {...componentProps} />
                )
            }
        />
    );
}

export default PublicOnlyRoute;
