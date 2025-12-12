function Step4Availability({
  days,
  times,
  selectedSlots,
  setSelectedSlots,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const toggle = (key) => {
    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const selectedCount = selectedSlots.length;
  const canSubmit = selectedCount >= 1; // istersen >=3 yaparız

  return (
    <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
      <div className="formGroup">
        <span className="groupLabel">Müsait olduğun zamanlar</span>
        <div className="hintText">
          23–26 Aralık • 10:00–18:00 • 30 dk aralıklarla istediğin kadar seç.
        </div>

        <div className="slotSummary">
          Seçili slot: <b>{selectedCount}</b>
        </div>

        <div className="slotTable">
          <div className="slotHeader">
            <div className="slotCorner">Saat</div>
            {days.map((d) => (
              <div key={d.date} className="slotDay">
                {d.label}
              </div>
            ))}
          </div>

          <div className="slotBody">
            {times.map((t) => (
              <div key={t} className="slotRow">
                <div className="slotTime">{t}</div>

                {days.map((d) => {
                  const key = `${d.date}T${t}`; // string[]
                  const active = selectedSlots.includes(key);

                  return (
                    <button
                      key={key}
                      type="button"
                      className={"slotCell " + (active ? "active" : "")}
                      onClick={() => toggle(key)}
                      aria-pressed={active}
                      title={active ? "Seçildi" : "Seç"}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wizardActions">
        <button type="button" className="wizardBack" onClick={onBack}>
          ← Geri
        </button>

        <button
          type="button"
          className="registerSubmit"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "Gönderiliyor..." : "Kaydımı Tamamla"}
        </button>
      </div>
    </form>
  );
}

export default Step4Availability;
