import { Routes,Route } from "react-router-dom"
import { Dashboard } from "@/Pages/Dashboard"
import { Login } from "@/Pages/LoginPage"
import { ForgotPassword } from "@/Pages/ForgotPassword";


function AppRouter() {
  return (
    <Routes>
        <Route path="" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default AppRouter;