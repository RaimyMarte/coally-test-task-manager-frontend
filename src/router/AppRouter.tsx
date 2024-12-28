import { Navigate, Route, Routes, } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "."
import { TaskPage } from "@/task/pages/TaskPage"
import { LoginPage } from "@/auth/pages/LoginPage"
import { useAuthStore, useCheckAuth } from "@/hooks"
import { NotFoundPage } from "@/ui/pages/NotFoundPage"
import { Loading } from "@/ui/components/Loading"

export const AppRouter = () => {
    const { status, } = useAuthStore()

    useCheckAuth()

    if (status === 'checking') return <Loading />

    return (
        <Routes>
            <Route element={<PrivateRoutes status={status} />} >
                <Route path="/" element={<TaskPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>

            <Route element={<PublicRoutes status={status} />} >
                <Route path="/" element={<Navigate to='/auth/login' />} />
                <Route path="/auth/login" element={<LoginPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
