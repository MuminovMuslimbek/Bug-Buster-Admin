import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth === "true") {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default PublicRoute;
