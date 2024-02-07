import { Outlet, Navigate } from "react-router-dom"
import React from "react"

const PrivateRoute = () => {
    let auth = localStorage.getItem('token')
    return (
        <div>
            {auth ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default PrivateRoute


