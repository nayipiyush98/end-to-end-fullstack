import { AlertProvider } from "./components/common/alert-provider";
import { ThemeProvider } from "./components/theme-provider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AppRouter />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
