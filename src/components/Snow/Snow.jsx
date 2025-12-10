import "./Snow.css";

function Snow() {
  // 30 tane kar tanesi
  const flakes = Array.from({ length: 30 });

  return (
    <div className="snow-container">
      {flakes.map((_, i) => (
        <span key={i} className="snowflake">
          ❄
        </span>
      ))}
    </div>
  );
}
export default Snow;
