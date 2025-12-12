import { useState } from "react";

function Step3Hobbies({ hobbies, setHobbies, onNext, onBack }) {
  const [hobbyInput, setHobbyInput] = useState("");

  const addHobby = () => {
    const value = hobbyInput.trim();
    if (!value) return;

    const exists = hobbies.some((h) => h.toLowerCase() === value.toLowerCase());
    if (!exists) setHobbies((prev) => [...prev, value]);

    setHobbyInput("");
  };

  const removeHobby = (idx) => {
    setHobbies((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
      <div className="formGroup">
        <span className="groupLabel">Hobilerin (sınırsız)</span>

        <div className="hobbyRow">
          <input
            className="hobbyInput"
            type="text"
            placeholder="Örn: K-pop, satranç, kahve, koşu..."
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addHobby();
              }
            }}
          />
          <button type="button" className="hobbyAdd" onClick={addHobby}>
            Ekle
          </button>
        </div>

        <div className="hobbyChips">
          {hobbies.map((h, idx) => (
            <button
              key={`${h}-${idx}`}
              type="button"
              className="hobbyChip"
              onClick={() => removeHobby(idx)}
              title="Sil"
            >
              {h} <span className="chipX">✕</span>
            </button>
          ))}
        </div>

        <div className="tipBox">
          🎁 Hediye bütçesi <b>600–800 TL</b> aralığında olacağı için, ilgi
          alanlarını buna uygun seçebilirsin.
        </div>
      </div>

      <div className="wizardActions">
        <button type="button" className="wizardBack" onClick={onBack}>
          ← Geri
        </button>
        <button type="button" className="wizardNext" onClick={onNext}>
          Devam →
        </button>
      </div>
    </form>
  );
}

export default Step3Hobbies;
