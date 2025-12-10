function RegisteredStars() {
  // Şimdilik sabit; sonra backend / API ile besleriz
  const registeredCount = 1168;

  return (
    <section className="registered-section">
      <div className="registered-title">KAYITLI ÖZÜ'LÜ SAYISI</div>
      <div className="registered-count">{registeredCount}</div>
    </section>
  );
}
export default RegisteredStars;
