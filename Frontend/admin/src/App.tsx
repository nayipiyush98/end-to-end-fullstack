import { ThemeProvider } from "./components/theme-provider"
import AppRouter from "./router/AppRouter"


function App() {
  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  )
}

export default App   