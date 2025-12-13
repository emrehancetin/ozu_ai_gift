import { useMemo, useState } from "react";
import "./MyPage.css";

function MyPage({ handleGoBack }) {
  // ✅ DEMO DATA (sonra backend’den fetch ile doldurursun)
  const me = useMemo(
    () => ({
      name: "Emrehan",
      surname: "Çetin",
      email: "emrehan.cetin@ozu.edu.tr",
      phone: "+90 5xx xxx xx xx",
      gender: "MALE",
      interests: ["Kahve", "Kitap", "Yürüyüş"],
      createdAt: "2025-12-13",
    }),
    []
  );

  // ✅ Şimdilik eşleşme yok
  const match = null; // ⏳ eşleşme bekleniyor

  // ✅ Kullanıcının seçtiği slotlar (backend’den gelecek)
  const mySelectedSlots = useMemo(
    () => [
      "2025-12-23T10:30",
      "2025-12-23T11:00",
      "2025-12-24T14:30",
      "2025-12-26T16:00",
    ],
    []
  );

  // ✅ Match detail modal (ileride)
  const [selectedMatch, setSelectedMatch] = useState(null);

  // ✅ Slot modal
  const [showSlotsModal, setShowSlotsModal] = useState(false);

  const closeMatchModal = () => setSelectedMatch(null);

  const overlayClick = (e) => {
    if (e.target.classList.contains("mpOverlay")) {
      closeMatchModal();
      setShowSlotsModal(false);
    }
  };

  const groupedSlots = useMemo(
    () => groupSlotsByDay(mySelectedSlots),
    [mySelectedSlots]
  );

  return (
    <div className="myPageRoot">
      {/* HEADER */}
      {/* HEADER */}
      <div className="myPageHeader">
        <div className="myPageBrand">
          <div className="myPageBrandTitle">ÖzÜ AI</div>
          <div className="myPageBrandSub">Ağacın Özü • Bilinçli Eşleşme</div>
        </div>

        <button className="myPageBack" onClick={() => handleGoBack()}>
          Ana Sayfa
        </button>
      </div>

      {/* <div className="myPageHeader">
        <div className="myPageTitle">Bilgilerim</div>
        <div className="myPageSubtitle">Rastgele değil, bilinçli eşleşme.</div>
      </div> */}

      {/* CONTENT GRID */}
      <div className="myPageGrid">
        {/* PROFILE CARD */}
        <section className="mpCard mpProfile">
          <div className="mpCardTitle">Profil</div>

          <div className="mpRow">
            <div className="mpLabel">Ad Soyad</div>
            <div className="mpValue">
              {me.name} {me.surname}
            </div>
          </div>

          <div className="mpRow">
            <div className="mpLabel">Email</div>
            <div className="mpValue">{me.email}</div>
          </div>

          <div className="mpRow">
            <div className="mpLabel">Telefon</div>
            <div className="mpValue">{me.phone}</div>
          </div>

          <div className="mpRow">
            <div className="mpLabel">İlgi Alanları</div>
            <div className="mpValue mpChips">
              {me.interests.map((x) => (
                <span key={x} className="mpChip">
                  {x}
                </span>
              ))}
            </div>
          </div>

          {/* ✅ Seçtiğim slotları gör (İlgi alanlarının hemen altında) */}
          <div
            className="mpRow mpClickable"
            onClick={() => setShowSlotsModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowSlotsModal(true)}
          >
            <div className="mpLabel">Slotlarım</div>
            <div className="mpValue">
              <span className="mpMiniLink">Gör</span>
            </div>
          </div>

          <div className="mpDivider" />

          <div className="mpHint">
            Bilgilerin yalnızca eşleşme ve organizasyon amacıyla kullanılır.
          </div>
        </section>

        {/* MATCHES */}
        <section className="mpCard mpMatches">
          <div className="mpCardTitle">Eşleşmem</div>

          {!match ? (
            <div className="mpWaiting">
              🎄 Eşleşmeler henüz açıklanmadı.
              <br />
              Müsait zamanlar toplanıyor…
            </div>
          ) : (
            <>
              {/* Eşleşme gelince burada kart gösterip tıklayınca setSelectedMatch(match) yapacağız */}
            </>
          )}
        </section>
      </div>

      {/* ✅ SLOT MODAL */}
      {showSlotsModal && (
        <div className="mpOverlay" onClick={overlayClick}>
          <div className="mpModal">
            <button
              className="mpClose"
              onClick={() => setShowSlotsModal(false)}
            >
              ✕
            </button>

            <div className="mpModalTitle">Buluşma saati seçtiklerim</div>
            <div className="mpModalSub">
              {mySelectedSlots.length} slot seçtin
            </div>

            <div className="mpModalSection">
              {groupedSlots.length === 0 ? (
                <div className="mpWaiting">Henüz slot seçmemişsin.</div>
              ) : (
                groupedSlots.map((g) => (
                  <div key={g.dayLabel} className="mpDayBlock">
                    <div className="mpDayTitle">{g.dayLabel}</div>

                    <div className="mpChips">
                      {g.times.map((t) => (
                        <span key={t} className="mpChip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              className="mpPrimary"
              onClick={() => setShowSlotsModal(false)}
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* MATCH DETAIL MODAL (ileride) */}
      {selectedMatch && (
        <div className="mpOverlay" onClick={overlayClick}>
          <div className="mpModal">
            <button className="mpClose" onClick={closeMatchModal}>
              ✕
            </button>

            <div className="mpModalTitle">
              {selectedMatch.name} {selectedMatch.surname}
            </div>
            <div className="mpModalSub">
              {selectedMatch.department} • {selectedMatch.grade}
            </div>

            <div className="mpModalSection">
              <div className="mpModalRow">
                <div className="mpLabel">Lokasyon</div>
                <div className="mpValue">{selectedMatch.location}</div>
              </div>

              <div className="mpModalRow">
                <div className="mpLabel">Email</div>
                <div className="mpValue">{selectedMatch.email}</div>
              </div>

              <div className="mpModalRow">
                <div className="mpLabel">Telefon</div>
                <div className="mpValue">{selectedMatch.phone}</div>
              </div>

              <div className="mpModalRow">
                <div className="mpLabel">İlgi Alanları</div>
                <div className="mpValue mpChips">
                  {selectedMatch.interests.map((x) => (
                    <span key={x} className="mpChip">
                      {x}
                    </span>
                  ))}
                </div>
              </div>

              {selectedMatch.note && (
                <div className="mpNoteBox">{selectedMatch.note}</div>
              )}
            </div>

            <button className="mpPrimary" onClick={closeMatchModal}>
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- helpers ---------------- */

function groupSlotsByDay(slotKeys) {
  // slotKeys: ["2025-12-23T10:30", ...]
  const map = new Map();

  for (const key of slotKeys) {
    const [date, time] = key.split("T");
    if (!map.has(date)) map.set(date, []);
    map.get(date).push(time);
  }

  // sıralı
  const dates = Array.from(map.keys()).sort();
  return dates.map((date) => ({
    dayLabel: formatDateTR(date),
    times: map.get(date).sort(),
  }));
}

function formatDateTR(dateStr) {
  // "2025-12-23" -> "23 Aralık"
  const [, m, d] = dateStr.split("-").map(Number);
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return `${d} ${months[m - 1]}`;
}

export default MyPage;
