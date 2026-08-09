import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export function Dashboard() {
    const { admin, getAdmin } = useAuth();

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Name: {admin?.name}</p>
      <p>Email: {admin?.email}</p>
      <p>Role: {admin?.role ?? "No role assigned"}</p>

      <p>
        Permissions:{" "}
        {admin?.permissions?.join(", ") || "No permissions"}
      </p>
    </div>
  );
}