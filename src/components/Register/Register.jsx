import { useMemo, useState } from "react";
import "./Register.css";

import Stepper from "./Stepper";
import Step1Profile from "./steps/Step1Profile";
import Step2Email from "./steps/Step2Email";
import Step3Hobbies from "./steps/Step3Hobbies";
import Step4Availability from "./steps/Step4Availability";

function Register({ onClose }) {
  const [step, setStep] = useState(1);

  // Prisma User alanları
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "MALE",
    password: "",
    passwordConfirm: "",
    kvkkAccepted: false,
  });

  // OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true); // şimdilik true yapalım

  // Step 3
  const [hobbies, setHobbies] = useState([]); // string[]

  // Step 4
  const [selectedSlots, setSelectedSlots] = useState([]); // string[] like "2025-12-23T10:00"

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Availability config
  const DAYS = useMemo(
    () => [
      { label: "23 Aralık", date: "2025-12-23" },
      { label: "24 Aralık", date: "2025-12-24" },
      { label: "25 Aralık", date: "2025-12-25" },
      { label: "26 Aralık", date: "2025-12-26" },
    ],
    []
  );

  const TIMES = useMemo(() => {
    const out = [];
    let hour = 10;
    let minute = 0;

    while (hour < 18 || (hour === 18 && minute === 0)) {
      const hh = String(hour).padStart(2, "0");
      const mm = String(minute).padStart(2, "0");
      out.push(`${hh}:${mm}`);

      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }
    return out;
  }, []);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("registerOverlay")) onClose?.();
  };

  const submit = async () => {
    setIsSubmitting(true);

    const payload = {
      ...form, // name surname email gender phone
      hobbies, // string[]
      availabilitySlots: selectedSlots, // string[]
    };

    try {
      // TODO: gerçek endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(await res.text());
        alert("Kayıt sırasında hata oluştu.");
        setIsSubmitting(false);
        return;
      }

      alert("Kaydın başarıyla alındı! 🎄");
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Sunucuya bağlanırken hata oluştu.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registerOverlay" onClick={handleOverlayClick}>
      <div className="registerModal">
        <button className="registerClose" onClick={onClose}>
          ✕
        </button>

        <Stepper step={step} total={4} />

        <h2 className="registerTitle">ÖZÜ AĞACIN ÖZÜ</h2>
        <p className="registerSubtitle">
          Yeni yıl eşleşmesine katılmak için adımları tamamla. 🎄
        </p>

        {step === 1 && (
          <Step1Profile form={form} setForm={setForm} onNext={next} />
        )}

        {step === 2 && (
          <Step2Email
            email={form.email}
            otpSent={otpSent}
            setOtpSent={setOtpSent}
            otpVerified={otpVerified}
            setOtpVerified={setOtpVerified}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 3 && (
          <Step3Hobbies
            hobbies={hobbies}
            setHobbies={setHobbies}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 4 && (
          <Step4Availability
            days={DAYS}
            times={TIMES}
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            onBack={back}
            onSubmit={submit}
            isSubmitting={isSubmitting}
          />
        )}

        <p className="registerInfo">
          Bilgilerin yalnızca eşleşme ve organizasyon amacıyla kullanılacaktır.
        </p>
      </div>
    </div>
  );
}

export default Register;
