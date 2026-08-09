import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "@/Pages/DashboardPage";
import { Login } from "@/Pages/LoginPage";
import { Register } from "@/Pages/Register";
import { ForgotPassword } from "@/Pages/ForgotPassword";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

function AppRouter() {
  const ADMIN_URL = "/admin";

  return (
    <Routes>
      {/* ================= PUBLIC ADMIN ROUTES ================= */}

      <Route path={`${ADMIN_URL}/login`} element={<Login />} />

      <Route
        path={`${ADMIN_URL}/register`}
        element={<Register />}
      />

      <Route
        path={`${ADMIN_URL}/forgot-password`}
        element={<ForgotPassword />}
      />

      {/* ================= PROTECTED ADMIN ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path={ADMIN_URL}
            element={<Dashboard />}
          />

          {/* Future routes */}
          {/* 
          <Route path={`${ADMIN_URL}/users`} element={<Users />} />
          <Route path={`${ADMIN_URL}/roles`} element={<Roles />} />
          <Route path={`${ADMIN_URL}/settings`} element={<Settings />} />
          */}
        </Route>
      </Route>

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to={`${ADMIN_URL}/login`} replace />}
      />
    </Routes>
  );
}

export default AppRouter;