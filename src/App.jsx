// src/App.jsx
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import Snow from "./components/Snow/Snow.jsx";
import Register from "./components/Register/Register.jsx";

function App() {
  const [theme, setTheme] = useState("dark");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const openRegisterPage = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="app-root">
      <Snow />

      <div className="buttonGroups">
        <button className="registerButton" onClick={() => openRegisterPage()}>
          Register
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Gece Modu" : "☀ Gündüz Modu"}
        </button>
      </div>
      {/* Arka planlı ana kart */}
      <Home />
      {/* {showRegister && <Register />} */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default App;
