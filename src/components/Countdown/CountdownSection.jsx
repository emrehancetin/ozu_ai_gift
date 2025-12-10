import { useEffect, useState } from "react";

import TimeBox from "./TimeBox.jsx";

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // hedef tarih: 1 Ocak 2026, istersen sonra değiştiririz
    const target = new Date("2026-01-01T00:00:00");

    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
      const minutes = Math.floor((totalSeconds / 60) % 60);
      const seconds = totalSeconds % 60;

      const two = (n) => String(n).padStart(2, "0");

      setTimeLeft({
        days: two(days),
        hours: two(hours),
        minutes: two(minutes),
        seconds: two(seconds),
      });
    };

    tick(); // ilk değer
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-title">KAYIT İÇİN SON</div>

      <div className="timer-row">
        <TimeBox label="GÜN" value={timeLeft.days} />
        <span className="timer-colon">:</span>
        <TimeBox label="SAAT" value={timeLeft.hours} />
        <span className="timer-colon">:</span>
        <TimeBox label="DAKİKA" value={timeLeft.minutes} />
        <span className="timer-colon">:</span>
        <TimeBox label="SANİYE" value={timeLeft.seconds} />
      </div>
    </section>
  );
}
export default CountdownSection;
