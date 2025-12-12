// import { useMemo, useState } from "react";
// import "./Register.css";
// import Stepper from "./Stepper.jsx";

// function Register({ onClose }) {
//   // 1 | 2 | 3
//   const [step, setStep] = useState(1);

//   // ---- form state ----
//   const [form, setForm] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     gender: "MALE",
//     phone: "",
//   });

//   // step2 email verification
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ---- options (sonra backend'den çekersin) ----
//   const interestOptions = useMemo(
//     () => [
//       { id: 1, label: "Kahve / Çay sohbeti" },
//       { id: 2, label: "Kitap / edebiyat" },
//       { id: 3, label: "Film / dizi" },
//       { id: 4, label: "Oyun / board game" },
//       { id: 5, label: "Spor / yürüyüş" },
//     ],
//     []
//   );

//   const slotOptions = useMemo(
//     () => [
//       { id: 1, label: "24 Aralık Akşam (18.00 - 20.00)" },
//       { id: 2, label: "25 Aralık Gündüz (12.00 - 14.00)" },
//       { id: 3, label: "26 Aralık Akşam (18.00 - 20.00)" },
//     ],
//     []
//   );

//   // ---- helpers ----
//   const updateField = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleFromArray = (id, setter) => {
//     setter((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.classList.contains("registerOverlay")) {
//       onClose?.();
//     }
//   };

//   // ---- validation ----
//   const isStep1Valid =
//     true ||
//     (form.name.trim() &&
//       form.surname.trim() &&
//       form.email.trim() &&
//       form.phone.trim());

//   const isStep2Valid = otpVerified || true; // doğrulanmış olmalı

//   const goNext = async () => {
//     if (step === 1) {
//       if (!isStep1Valid) return;
//       setStep(2);
//       return;
//     }

//     if (step === 2) {
//       if (!isStep2Valid) return;
//       setStep(3);
//       return;
//     }
//   };

//   const goBack = () => {
//     setStep((s) => Math.max(1, s - 1));
//   };

//   // ---- Step 2: OTP (UI; backend bağlanınca fetch'ler değişecek) ----
//   const sendOtp = async () => {
//     if (!form.email.trim()) return;

//     setOtpSent(true);
//     setOtpVerified(false);
//     setOtp("");

//     // TODO: backend endpoint
//     // await fetch("/api/auth/send-otp", {method:"POST", body: JSON.stringify({email: form.email})})
//     alert(`Kod gönderildi (demo). Email: ${form.email}`);
//   };

//   const verifyOtp = async () => {
//     if (otp.trim().length !== 6) return;

//     // TODO: backend endpoint
//     // const res = await fetch("/api/auth/verify-otp", {method:"POST", body: JSON.stringify({email: form.email, code: otp})})
//     // if(res.ok) setOtpVerified(true)

//     // Demo doğrulama: 123456 kabul edelim
//     if (otp.trim() === "123456") {
//       setOtpVerified(true);
//       alert("Email doğrulandı ✅ (demo: 123456)");
//     } else {
//       setOtpVerified(false);
//       alert("Kod yanlış. Demo kod: 123456");
//     }
//   };

//   // ---- final submit ----
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (step !== 3) return;

//     setIsSubmitting(true);

//     const payload = {
//       name: form.name,
//       surname: form.surname,
//       email: form.email,
//       gender: form.gender,
//       phone: form.phone,

//       // ✅ INTEGRATION: free-text hobbies (backend Interest tablosuna maplenecek)
//       hobbies, // string[]

//       // ✅ INTEGRATION: slot seçimleri (backend Slot / UserAvailability)
//       availabilitySlots: selectedSlots, // string[] example: ["2025-12-23T10:00", ...]
//     };

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         console.error("Register failed", await res.text());
//         alert("Kayıt sırasında bir hata oluştu. Lütfen tekrar dene.");
//         setIsSubmitting(false);
//         return;
//       }

//       alert("Kaydın başarıyla alındı! 🎄");
//       onClose?.();
//     } catch (err) {
//       console.error(err);
//       alert("Sunucuya bağlanırken bir sorun oluştu.");
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ INTEGRATION: Step3 - free text hobbies
//   const [hobbyInput, setHobbyInput] = useState("");
//   const [hobbies, setHobbies] = useState([]); // string[]

//   // ✅ INTEGRATION: Step3 - time slots
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   // burada artık number[] değil, string[] kullanacağız (ör: "2025-12-23T10:00")

//   // ✅ INTEGRATION: days and slot generator config
//   const DAYS = [
//     { label: "23 Aralık", date: "2025-12-23" },
//     { label: "24 Aralık", date: "2025-12-24" },
//     { label: "25 Aralık", date: "2025-12-25" },
//     { label: "26 Aralık", date: "2025-12-26" },
//   ];

//   const TIMES = useMemo(() => {
//     // 10:00 - 18:00 arası, 30 dk
//     const out = [];
//     let hour = 10;
//     let minute = 0;

//     while (hour < 18 || (hour === 18 && minute === 0)) {
//       // 18:00 dahil olsun istiyorsan kalsın.
//       // 18:00'ı istemiyorsan aşağıdaki if ile çıkarırız.
//       const hh = String(hour).padStart(2, "0");
//       const mm = String(minute).padStart(2, "0");
//       out.push(`${hh}:${mm}`);

//       minute += 30;
//       if (minute >= 60) {
//         minute = 0;
//         hour += 1;
//       }
//     }

//     // Eğer 18:00 seçilebilir olmasın dersen bunu aç:
//     // return out.filter(t => t !== "18:00");

//     return out;
//   }, []);

//   // ✅ INTEGRATION: add/remove hobby chips
//   const addHobby = () => {
//     const value = hobbyInput.trim();
//     if (!value) return;

//     // aynı hobby birden fazla eklenmesin (istersen kaldırırız)
//     const exists = hobbies.some((h) => h.toLowerCase() === value.toLowerCase());
//     if (exists) {
//       setHobbyInput("");
//       return;
//     }

//     setHobbies((prev) => [...prev, value]);
//     setHobbyInput("");
//   };

//   const removeHobby = (idx) => {
//     setHobbies((prev) => prev.filter((_, i) => i !== idx));
//   };

//   return (
//     <div className="registerOverlay" onClick={handleOverlayClick}>
//       <div className="registerModal">
//         <button className="registerClose" onClick={onClose}>
//           ✕
//         </button>

//         {/* Stepper */}
//         <Stepper step={step} />

//         <h2 className="registerTitle">ÖZÜ AĞACIN ÖZÜ</h2>
//         <p className="registerSubtitle">
//           Yeni yıl eşleşmesine katılmak için adımları tamamla. 🎄
//         </p>

//         <form className="registerForm" onSubmit={handleSubmit}>
//           {/* STEP 1 */}
//           {step === 1 && (
//             <>
//               <div className="formGrid2">
//                 <div className="formGroup">
//                   <label htmlFor="name">Ad</label>
//                   <input
//                     id="name"
//                     type="text"
//                     placeholder="Emrehan"
//                     required
//                     value={form.name}
//                     onChange={(e) => updateField("name", e.target.value)}
//                   />
//                 </div>

//                 <div className="formGroup">
//                   <label htmlFor="surname">Soyad</label>
//                   <input
//                     id="surname"
//                     type="text"
//                     placeholder="Çetin"
//                     required
//                     value={form.surname}
//                     onChange={(e) => updateField("surname", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="formGroup">
//                 <label htmlFor="email">ÖzÜ Mail</label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="ornek.ad@ozu.edu.tr"
//                   required
//                   value={form.email}
//                   onChange={(e) => updateField("email", e.target.value)}
//                 />
//                 <div className="hintText">
//                   (Doğrulama kodu bu adrese gönderilecek.)
//                 </div>
//               </div>

//               <div className="formGroup">
//                 <label htmlFor="phone">Telefon</label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   placeholder="+90 5xx xxx xx xx"
//                   required
//                   value={form.phone}
//                   onChange={(e) => updateField("phone", e.target.value)}
//                 />
//               </div>

//               <div className="formGroup">
//                 <span className="groupLabel">Cinsiyet</span>
//                 <div className="inlineOptions">
//                   <label className="radioOption">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="MALE"
//                       checked={form.gender === "MALE"}
//                       onChange={(e) => updateField("gender", e.target.value)}
//                     />
//                     <span>Erkek</span>
//                   </label>
//                   <label className="radioOption">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="FEMALE"
//                       checked={form.gender === "FEMALE"}
//                       onChange={(e) => updateField("gender", e.target.value)}
//                     />
//                     <span>Kadın</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="wizardActions">
//                 <button
//                   type="button"
//                   className="wizardNext firstValid"
//                   onClick={goNext}
//                   disabled={!isStep1Valid}
//                 >
//                   Devam →
//                 </button>
//               </div>
//             </>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <>
//               <div className="formGroup">
//                 <span className="groupLabel">Email Doğrulama</span>
//                 <div className="hintText">
//                   {form.email} adresine 6 haneli kod gönder.
//                 </div>

//                 <div className="otpRow">
//                   <button type="button" className="otpSend" onClick={sendOtp}>
//                     {otpSent ? "Tekrar Gönder" : "Kod Gönder"}
//                   </button>

//                   <input
//                     className="otpInput"
//                     inputMode="numeric"
//                     placeholder="123456"
//                     value={otp}
//                     onChange={(e) => {
//                       const v = e.target.value.replace(/\D/g, "").slice(0, 6);
//                       setOtp(v);
//                       setOtpVerified(false);
//                     }}
//                   />

//                   <button
//                     type="button"
//                     className="otpVerify"
//                     onClick={verifyOtp}
//                     disabled={otp.length !== 6}
//                   >
//                     Doğrula
//                   </button>
//                 </div>

//                 <div className={"otpStatus " + (otpVerified ? "ok" : "warn")}>
//                   {otpVerified
//                     ? "Email doğrulandı ✅"
//                     : "Demo: kod 123456 (backend gelince gerçek olacak)"}
//                 </div>
//               </div>

//               <div className="wizardActions">
//                 <button type="button" className="wizardBack" onClick={goBack}>
//                   ← Geri
//                 </button>
//                 <button
//                   type="button"
//                   className="wizardNext"
//                   onClick={goNext}
//                   disabled={!isStep2Valid}
//                 >
//                   Devam →
//                 </button>
//               </div>
//             </>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <>
//               {/* ✅ INTEGRATION: Hobby input (free text, unlimited) */}
//               <div className="formGroup">
//                 <span className="groupLabel">Hobilerin (sınırsız)</span>

//                 <div className="hobbyRow">
//                   <input
//                     className="hobbyInput"
//                     type="text"
//                     placeholder="Örn: K-pop, satranç, kahve, koşu..."
//                     value={hobbyInput}
//                     onChange={(e) => setHobbyInput(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         addHobby();
//                       }
//                     }}
//                   />
//                   <button type="button" className="hobbyAdd" onClick={addHobby}>
//                     Ekle
//                   </button>
//                 </div>

//                 <div className="hobbyChips">
//                   {hobbies.map((h, idx) => (
//                     <button
//                       key={`${h}-${idx}`}
//                       type="button"
//                       className="hobbyChip"
//                       onClick={() => removeHobby(idx)}
//                       title="Sil"
//                     >
//                       {h} <span className="chipX">✕</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="tipBox">
//                   🎁 Hediye bütçesi <b>600–800 TL</b> aralığında olacağı için,
//                   ilgi alanlarını buna uygun seçebilirsin. (Örn: kahve,
//                   çikolata, kırtasiye, kitap, aksesuar vb.)
//                 </div>
//               </div>

//               {/* ✅ INTEGRATION: Availability table 23-26 Dec, 10-18, 30 min */}
//               <div className="formGroup">
//                 <span className="groupLabel">Müsait olduğun zamanlar</span>
//                 <div className="hintText">
//                   23–26 Aralık • 10:00–18:00 • 30 dk aralıklarla istediğin kadar
//                   seç.
//                 </div>

//                 <div className="slotTable">
//                   <div className="slotHeader">
//                     <div className="slotCorner">Saat</div>
//                     {DAYS.map((d) => (
//                       <div key={d.date} className="slotDay">
//                         {d.label}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="slotBody">
//                     {TIMES.map((t) => (
//                       <div key={t} className="slotRow">
//                         <div className="slotTime">{t}</div>

//                         {DAYS.map((d) => {
//                           const key = `${d.date}T${t}`; // ✅ INTEGRATION: selection key
//                           const active = selectedSlots.includes(key);

//                           return (
//                             <button
//                               key={key}
//                               type="button"
//                               className={"slotCell " + (active ? "active" : "")}
//                               onClick={() =>
//                                 toggleFromArray(key, setSelectedSlots)
//                               }
//                               aria-pressed={active}
//                               title={active ? "Seçildi" : "Seç"}
//                             />
//                           );
//                         })}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="wizardActions">
//                 <button type="button" className="wizardBack" onClick={goBack}>
//                   ← Geri
//                 </button>

//                 <button
//                   type="submit"
//                   className="registerSubmit"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Gönderiliyor..." : "Kaydımı Tamamla"}
//                 </button>
//               </div>
//             </>
//           )}
//         </form>

//         <p className="registerInfo">
//           Bilgilerin yalnızca eşleşme ve organizasyon amacıyla kullanılacaktır.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

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
    gender: "MALE",
    phone: "",
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
