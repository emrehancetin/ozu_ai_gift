function Step1Profile({ form, setForm, onNext }) {
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const isValid =
    true || //burası silinecek
    (form.name.trim() &&
      form.surname.trim() &&
      form.email.trim() &&
      form.phone.trim());

  return (
    <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
      <div className="formGrid2">
        <div className="formGroup">
          <label>Ad</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Emrehan"
            required
          />
        </div>

        <div className="formGroup">
          <label>Soyad</label>
          <input
            value={form.surname}
            onChange={(e) => update("surname", e.target.value)}
            placeholder="Çetin"
            required
          />
        </div>
      </div>

      <div className="formGroup">
        <label>ÖzÜ Mail</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="ornek.ad@ozu.edu.tr"
          required
        />
        <div className="hintText">(Doğrulama kodu bu adrese gönderilecek.)</div>
      </div>

      <div className="formGroup">
        <label>Telefon</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+90 5xx xxx xx xx"
          required
        />
      </div>

      <div className="formGroup">
        <span className="groupLabel">Cinsiyet</span>
        <div className="inlineOptions">
          <label className="radioOption">
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={form.gender === "MALE"}
              onChange={(e) => update("gender", e.target.value)}
            />
            <span>Erkek</span>
          </label>

          <label className="radioOption">
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={form.gender === "FEMALE"}
              onChange={(e) => update("gender", e.target.value)}
            />
            <span>Kadın</span>
          </label>
        </div>
      </div>

      <div className="wizardActions">
        <button
          type="button"
          className="wizardNext"
          onClick={onNext}
          disabled={!isValid}
        >
          Devam →
        </button>
      </div>
    </form>
  );
}

export default Step1Profile;
