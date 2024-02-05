import * as React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { ComponentType } from 'react'
import { useNavigate } from "react-router-dom"

const IsUserAuthenticate = ({ children }: { children: ComponentType }) => {
    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate();

    const ProtectedComponent = withAuthenticationRequired(children);

    if (!isAuthenticated) {
        navigate("/");
    }

    return <ProtectedComponent />
}

export default IsUserAuthenticate