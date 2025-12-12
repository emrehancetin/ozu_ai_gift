import { useState } from "react";

function Step2Email({
  email,
  otpSent,
  setOtpSent,
  otpVerified,
  setOtpVerified,
  onNext,
  onBack,
}) {
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!email.trim()) return;

    setOtpSent(true);
    setOtpVerified(false);
    setOtp("");

    // TODO: backend: /api/auth/send-otp
    alert(`Kod gönderildi (demo). Email: ${email}`);
  };

  const verifyOtp = async () => {
    if (otp.trim().length !== 6) return;

    // TODO: backend: /api/auth/verify-otp
    if (otp.trim() === "123456") {
      setOtpVerified(true);
      alert("Email doğrulandı ✅ (demo: 123456)");
    } else {
      setOtpVerified(false);
      alert("Kod yanlış. Demo kod: 123456");
    }
  };

  return (
    <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
      <div className="formGroup">
        <span className="groupLabel">Email Doğrulama</span>
        <div className="hintText">{email} adresine 6 haneli kod gönder.</div>

        <div className="otpRow">
          <button type="button" className="otpSend" onClick={sendOtp}>
            {otpSent ? "Tekrar Gönder" : "Kod Gönder"}
          </button>

          <input
            className="otpInput"
            inputMode="numeric"
            placeholder="123456"
            value={otp}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 6);
              setOtp(v);
              setOtpVerified(false);
            }}
          />

          <button
            type="button"
            className="otpVerify"
            onClick={verifyOtp}
            disabled={otp.length !== 6}
          >
            Doğrula
          </button>
        </div>

        <div className={"otpStatus " + (otpVerified ? "ok" : "warn")}>
          {otpVerified
            ? "Email doğrulandı ✅"
            : "Demo: kod 123456 (backend gelince gerçek olacak)"}
        </div>
      </div>

      <div className="wizardActions">
        <button type="button" className="wizardBack" onClick={onBack}>
          ← Geri
        </button>
        <button
          type="button"
          className="wizardNext"
          onClick={onNext}
          disabled={!otpVerified}
        >
          Devam →
        </button>
      </div>
    </form>
  );
}

export default Step2Email;
