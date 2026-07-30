import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

type AlertVariant = "default" | "destructive" | "success" | "warning";

interface AlertState {
  open: boolean;
  title: string;
  description: string;
  variant: AlertVariant;
}

interface AlertContextType {
  showAlert: (alert: Omit<AlertState, "open">) => void;
  hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

const icons = {
  default: <Info className="h-5 w-5" />,
  destructive: <AlertCircle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <TriangleAlert className="h-5 w-5" />,
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    title: "",
    description: "",
    variant: "default",
  });

  const showAlert = useCallback((data: Omit<AlertState, "open">) => {
    setAlert({
      ...data,
      open: true,
    });

    setTimeout(() => {
      setAlert((prev) => ({
        ...prev,
        open: false,
      }));
    }, 3000);
  }, []);

  const hideAlert = () => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const value = useMemo(
    () => ({
      showAlert,
      hideAlert,
    }),
    [showAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}

      {alert.open && (
        <div className="fixed top-5 right-5 z-50 w-105">
          <Alert
            className={
              alert.variant === "success"
                ? "border-green-500 text-green-700"
                : alert.variant === "warning"
                  ? "border-yellow-500 text-yellow-700"
                  : ""
            }
            variant={
              alert.variant === "destructive" ? "destructive" : "default"
            }
          >
            {icons[alert.variant]}

            <div className="flex-1">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription
                className={
                  alert.variant === "destructive"
                    ? "text-destructive"
                    : alert.variant === "success"
                      ? "text-green-700"
                      : alert.variant === "warning"
                        ? "text-yellow-700"
                        : ""
                }
              >
                {alert.description}
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }

  return context;
};
