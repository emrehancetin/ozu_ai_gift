import { useState } from "react";
import "./Login.css";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("loginOverlay")) onClose?.();
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);

    try {
      // TODO: backend endpoint (email + password)
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) { ... }

      // Demo:
      await new Promise((r) => setTimeout(r, 500));
      alert("Giriş başarılı ✅ (demo)");
      onLoginSuccess?.();

      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Giriş sırasında hata oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="loginOverlay" onClick={handleOverlayClick}>
      <div className="loginModal">
        <button className="loginClose" onClick={onClose}>
          ✕
        </button>

        <h2 className="loginTitle">Login</h2>
        <p className="loginSubtitle">ÖzÜ mail ve şifre ile giriş yap.</p>

        <div className="loginForm">
          <div className="loginGroup">
            <label>ÖzÜ Mail</label>
            <input
              type="email"
              placeholder="ornek.ad@ozu.edu.tr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="loginGroup">
            <label>Şifre</label>

            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="passwordToggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            className="loginSubmit"
            type="button"
            onClick={handleLogin}
            disabled={!email.trim() || !password.trim() || isSubmitting}
          >
            {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          {/* İstersen sonra bağlarız */}
          <button
            type="button"
            className="forgotLink"
            onClick={() => alert("Forgot Password (sonra ekleriz)")}
          >
            Şifremi unuttum
          </button>
        </div>

        <p className="loginInfo">
          Bilgiler yalnızca eşleşme ve organizasyon amacıyla kullanılır.
        </p>
      </div>
    </div>
  );
}

export default Login;
