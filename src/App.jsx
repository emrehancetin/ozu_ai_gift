import "./App.css";
import { useState } from "react";
import Home from "./components/Home.jsx";
import Snow from "./components/Snow/Snow.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openRegisterPage = () => setShowRegister((p) => !p);
  const openLoginPage = () => setShowLogin((p) => !p);

  return (
    <div className="app-root">
      <Snow />

      <div className="buttonGroups">
        <button className="registerButton" onClick={openRegisterPage}>
          Register
        </button>

        <button className="loginButton" onClick={openLoginPage}>
          Login
        </button>
        <button className="menuButton" onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>
      </div>

      <Home />
      {isMenuOpen && (
        <div
          className="mobileMenuOverlay"
          onClick={(e) => {
            if (e.target.classList.contains("mobileMenuOverlay"))
              setIsMenuOpen(false);
          }}
        >
          <div className="mobileMenuDrawer">
            <button
              className="mobileMenuClose"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>

            <button
              className="mobileMenuItem primary"
              onClick={() => {
                setIsMenuOpen(false);
                setShowRegister(true);
              }}
            >
              Register
            </button>

            <button
              className="mobileMenuItem secondary"
              onClick={() => {
                setIsMenuOpen(false);
                setShowLogin(true);
              }}
            >
              Login
            </button>
            <div className="mobileMenuTitle">OzU AI</div>
          </div>
        </div>
      )}

      {showRegister && <Register onClose={() => setShowRegister(false)} />}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;
