import { Navigate,Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const admin = useAuthStore((state) => state.admin);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || !admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}