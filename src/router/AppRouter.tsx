import { Navigate, Route, Routes, } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "."
import { TaskDetailsPage, TaskPage } from "@/task/pages"
import { useAuthStore, useCheckAuth } from "@/hooks"
import { NotFoundPage } from "@/ui/pages/NotFoundPage"
import { Loading } from "@/ui/components/Loading"
import { SignUpPage, LoginPage } from "@/auth/pages"

export const AppRouter = () => {
    const { status, } = useAuthStore()

    useCheckAuth()

    if (status === 'checking') return <Loading />

    return (
        <Routes>
            <Route element={<PrivateRoutes status={status} />} >
                <Route path="/" element={<TaskPage />} />
                <Route path="/task/:taskId" element={<TaskDetailsPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>

            <Route element={<PublicRoutes status={status} />} >
                <Route path="/" element={<Navigate to='/auth/login' />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/sign-up" element={<SignUpPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
