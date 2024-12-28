import { Navigate, Outlet } from "react-router-dom"

export const PublicRoutes = ({ status }: { status: string }) => {

    return (
        status === 'not-authenticated' ? <Outlet /> : <Navigate to="/home" />
    )
}
