function HowItWorks({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("howOverlay")) {
      onClose();
    }
  };

  return (
    <div className="howOverlay" onClick={handleOverlayClick}>
      <div className="howModal">
        <button className="howClose" onClick={onClose}>
          ✕
        </button>

        <h2 className="howTitle">Nasıl Çalışır?</h2>
        <p className="howSubtitle">Rastgele Değil, Bilinçli Eşleşme ✨</p>

        <ol className="howSteps">
          <li>
            <b>Register</b> ile kayıt ol ve bilgilerini gir.
          </li>
          <li>
            <b>İlgi alanı</b> ve <b>müsait zamanlarını</b> seç.
          </li>
          <li>
            <b>Eşleşme günü</b> açıklandığında hediyeni hazırla 🎁
          </li>
        </ol>

        <div className="howTip">
          🎄 Hediye bütçesi: <b>600–800 TL</b>
        </div>

        <button className="howOk" onClick={onClose}>
          Tamam
        </button>
      </div>
    </div>
  );
}

export default HowItWorks;
