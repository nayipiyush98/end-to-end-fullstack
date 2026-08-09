import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const { initializeAuth } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("Auth initialization started");

        const result = await initializeAuth();

        console.log("Auth initialization result:", result);
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setInitialized(true);
      }
    };

    initialize();
  }, []);

  if (!initialized) {
    return <div>Loading authentication...</div>;
  }

  return <>{children}</>;
}