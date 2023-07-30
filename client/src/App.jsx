import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThemeProviderContext from "./context/theme/ThemeProvider";

const App = () => {
  return (
    <ThemeProviderContext>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProviderContext>
  );
};

export default App;
