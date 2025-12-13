import "./App.css";
import { useState } from "react";
import Home from "./components/Home.jsx";
import Snow from "./components/Snow/Snow.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import MyPage from "./components/MyPage/MyPage.jsx";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageMode, setPageMode] = useState(true);

  const openRegisterPage = () => setShowRegister((p) => !p);
  const openLoginPage = () => setShowLogin((p) => !p);

  return (
    <div className="app-root">
      <Snow />

      {!isLoggedIn ? (
        <>
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
          <button
            className="howItWorksButton"
            onClick={() => setShowHowItWorks(true)}
          >
            Nasıl Çalışır?
          </button>

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
          {/* {showLogin && <Login onClose={() => setShowLogin(false)} />} */}
          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setShowLogin(false);
              }}
            />
          )}
          {showHowItWorks && (
            <HowItWorks onClose={() => setShowHowItWorks(false)} />
          )}
        </>
      ) : pageMode ? (
        <MyPage handleGoBack={() => setPageMode(false)} />
      ) : (
        <>
          <div className="buttonGroups">
            <button
              className="goMyProfileButton"
              onClick={() => setPageMode(true)}
            >
              Profilime Git
            </button>
          </div>
          <Home />
          <button
            className="howItWorksButton"
            onClick={() => setShowHowItWorks(true)}
          >
            Nasıl Çalışır?
          </button>

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
          {/* {showLogin && <Login onClose={() => setShowLogin(false)} />} */}
          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setShowLogin(false);
              }}
            />
          )}
          {showHowItWorks && (
            <HowItWorks onClose={() => setShowHowItWorks(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
