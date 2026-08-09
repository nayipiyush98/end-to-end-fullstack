import { AlertProvider } from "./components/common/alert-provider";
import { ThemeProvider } from "./components/theme-provider";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./components/auth/AuthProvider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <TooltipProvider>
            <AppRouter />
          </TooltipProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
