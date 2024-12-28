import { Navigate, Outlet } from "react-router-dom"
export const PrivateRoutes = ({ status }: { status: string }) => {
    return (
        status === 'authenticated' ? <Outlet /> : <Navigate to="/auth/login" />
    )
}
