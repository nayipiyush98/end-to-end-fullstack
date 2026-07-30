import { Routes,Route } from "react-router-dom"
import { Dashboard } from "@/Pages/Dashboard"
import { Login } from "@/Pages/LoginPage"
import { Register } from "@/Pages/Register";
import { ForgotPassword } from "@/Pages/ForgotPassword";


function AppRouter() {
    const ADMIN_URL = '/admin'
  return (
    <Routes>
        <Route path={`${ADMIN_URL}`} element={<Dashboard/>}/>
        <Route path={`${ADMIN_URL}/register`} element={<Register/>}/>
        <Route path={`${ADMIN_URL}/login`} element={<Login/>}/>
        <Route path={`${ADMIN_URL}/forgot-password`} element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default AppRouter;