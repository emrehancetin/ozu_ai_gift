// src/Home.jsx
import "../App.css";
import CountdownSection from "./Countdown/CountdownSection.jsx";
import RegisteredStars from "./Countdown/RegisteredStars.jsx";

function Home() {
  return (
    <div className="home">
      <div className="fontHeaderOZU">ÖZÜ</div>
      <div className="fontTitleOZU">AĞACIN ÖZÜ</div>

      {/* Slogan (istersen sonra değiştiririz) */}
      <p className="slogan">
        2026’ya ÖzÜ ruhuyla girerken küçük bir hediye sürprizi yap!
      </p>

      {/* Geri sayım alanı */}
      <CountdownSection />

      {/* Kayıtlı yıldız sayısı */}
      <RegisteredStars />
    </div>
  );
}

export default Home;
