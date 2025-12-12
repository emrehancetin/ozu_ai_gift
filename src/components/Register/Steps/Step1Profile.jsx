import { useState } from "react";

function Step1Profile({ form, setForm, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showKvkk, setShowKvkk] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const isValid =
    true || // TODO: geçici olarak hep true yapalım
    (form.name.trim() &&
      form.surname.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.password.length >= 6 &&
      form.password === form.passwordConfirm &&
      form.kvkkAccepted === true);

  const openKvkk = () => setShowKvkk(true);
  const closeKvkk = () => setShowKvkk(false);

  const handleKvkkOverlay = (e) => {
    if (e.target.classList.contains("kvkkOverlay")) closeKvkk();
  };

  return (
    <>
      <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
        <div className="formGrid2">
          <div className="formGroup">
            <label>Ad</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Adınız"
              required
            />
          </div>

          <div className="formGroup">
            <label>Soyad</label>
            <input
              value={form.surname}
              onChange={(e) => update("surname", e.target.value)}
              placeholder="Soyadınız"
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
            placeholder="ad.soyad@ozu.edu.tr"
            required
          />
          <div className="hintText">
            (İlk girişte bu adrese doğrulama kodu gönderilecek.)
          </div>
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

        <div className="formGrid2">
          <div className="formGroup">
            <label>Şifre</label>

            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="En az 6 karakter"
                required
                autoComplete="new-password"
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

          <div className="formGroup">
            <label>Şifre Tekrar</label>

            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                value={form.passwordConfirm}
                onChange={(e) => update("passwordConfirm", e.target.value)}
                placeholder="Şifreyi tekrar gir"
                required
                autoComplete="new-password"
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

            {form.passwordConfirm &&
              form.password &&
              form.password !== form.passwordConfirm && (
                <div className="fieldError">Şifreler eşleşmiyor.</div>
              )}
          </div>
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

        {/* ✅ KVKK */}
        <div className="kvkkRow">
          <label className="kvkkCheck">
            <input
              type="checkbox"
              checked={!!form.kvkkAccepted}
              onChange={() => {
                if (!form.kvkkAccepted) {
                  setShowKvkk(true); // 👈 zorunlu modal
                }
              }}
            />
            <span>KVKK Aydınlatma Metni’ni okudum ve kabul ediyorum.</span>
          </label>
        </div>

        <div className="wizardActions">
          <button
            type="button"
            className="wizardNext wizardNextFirst"
            onClick={onNext}
            disabled={!isValid}
          >
            Devam →
          </button>
        </div>
      </form>

      {/* ✅ KVKK MODAL */}
      {showKvkk && (
        <div className="kvkkOverlay" onClick={handleKvkkOverlay}>
          <div className="kvkkModal">
            <button className="kvkkClose" onClick={closeKvkk}>
              ✕
            </button>

            <h3 className="kvkkTitle">KVKK Aydınlatma Metni</h3>
            <div className="kvkkBody">
              <ol className="kvkkList">
                <li>
                  Toplanan veriler (ad, soyad, email, telefon, cinsiyet, ilgi
                  alanları, müsaitlik) yalnızca etkinlik organizasyonu ve
                  eşleştirme amacıyla işlenir.
                </li>
                <li>
                  Veriler üçüncü kişilerle paylaşılmaz; yalnızca organizasyon
                  ekibi tarafından erişilir.
                </li>
                <li>
                  Veriler, etkinlik süreci tamamlandıktan sonra makul süre
                  içinde silinir/anonimleştirilir.
                </li>
                <li>
                  KVKK kapsamında verilerinize ilişkin bilgi talep etme,
                  düzeltme ve silme hakkına sahipsiniz.
                </li>
                <li>
                  İletişim: (buraya kulüp maili / iletişim kanalı eklenecek)
                </li>
              </ol>

              <div className="kvkkNote">
                Devam ederek bu metni okuduğunuzu ve kabul ettiğinizi onaylamış
                olursunuz.
              </div>
            </div>

            <div className="kvkkActions">
              <button
                type="button"
                className="kvkkAccept"
                onClick={() => {
                  update("kvkkAccepted", true);
                  closeKvkk();
                }}
              >
                Okudum, Kabul Ediyorum
              </button>

              <button type="button" className="kvkkCancel" onClick={closeKvkk}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Step1Profile;
