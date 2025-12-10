import "./App.css";

import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import Snow from "./components/Snow/Snow.jsx";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <Snow />
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Gece Modu" : "☀ Gündüz Modu"}
      </button>
      <Home />
    </>
  );
}

export default App;
