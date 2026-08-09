import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "@/Pages/DashboardPage";
import { Login } from "@/Pages/LoginPage";
import { Register } from "@/Pages/Register";
import { ForgotPassword } from "@/Pages/ForgotPassword";
import { Products } from "@/Pages/ProductPage";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { Orders } from "@/Pages/OrdersPage";
import { Categories } from "@/Pages/CategoriesPage";
import { Chats } from "@/Pages/ChatsPage";
import { Security } from "@/Pages/SecurityPage";
import { Users } from "@/Pages/UsersPage";
import { Profile } from "@/Pages/ProfilePage";
import { Account } from "@/Pages/AccountPage";
import { Appearance } from "@/Pages/AppearancePage";
import { Notifications } from "@/Pages/NotificationsPage";
import { Display } from "@/Pages/DisplayPage";

function AppRouter() {
  const ADMIN_URL = "/admin";

  return (
    <Routes>
      {/* ================= PUBLIC ADMIN ROUTES ================= */}

      <Route path={`${ADMIN_URL}/login`} element={<Login />} />

      <Route path={`${ADMIN_URL}/register`} element={<Register />} />

      <Route
        path={`${ADMIN_URL}/forgot-password`}
        element={<ForgotPassword />}
      />

      {/* ================= PROTECTED ADMIN ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ADMIN_URL} element={<Dashboard />} />
          <Route path={`${ADMIN_URL}/products`} element={<Products />} />
          <Route path={`${ADMIN_URL}/orders`} element={<Orders />} />
          <Route path={`${ADMIN_URL}/categories`} element={<Categories />} />
          <Route path={`${ADMIN_URL}/chats`} element={<Chats />} />
          <Route path={`${ADMIN_URL}/users`} element={<Users />} />
          <Route path={`${ADMIN_URL}/security`} element={<Security />} />
          <Route path={`${ADMIN_URL}/settings`} element={<Profile />} />
          <Route path={`${ADMIN_URL}/settings/account`} element={<Account />} />
          <Route
            path={`${ADMIN_URL}/settings/appearance`}
            element={<Appearance />}
          />
          <Route
            path={`${ADMIN_URL}/settings/notifications`}
            element={<Notifications />}
          />
          <Route path={`${ADMIN_URL}/settings/display`} element={<Display />} />
          {/* Future routes */}
          {/* 
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
