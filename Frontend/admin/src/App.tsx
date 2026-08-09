import { AlertProvider } from "./components/common/alert-provider";
import { ThemeProvider } from "./components/theme-provider";
import AppRouter from "./router/AppRouter";
import {AuthProvider} from "./components/auth/AuthProvider";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
