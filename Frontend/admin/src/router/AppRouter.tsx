import { Routes,Route } from "react-router-dom"
import { Dashboard } from "@/Pages/DashboardPage"
import { Login } from "@/Pages/LoginPage"
import { Register } from "@/Pages/Register";
import { ForgotPassword } from "@/Pages/ForgotPassword";
import  ProtectedRoute from "@/components/auth/ProtectedRoute";


function AppRouter() {
    const ADMIN_URL = '/admin'
  return (
    <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path={`${ADMIN_URL}`} element={<Dashboard/>}/>
        </Route>
        <Route path={`${ADMIN_URL}/register`} element={<Register/>}/>
        <Route path={`${ADMIN_URL}/login`} element={<Login/>}/>
        <Route path={`${ADMIN_URL}/forgot-password`} element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default AppRouter;