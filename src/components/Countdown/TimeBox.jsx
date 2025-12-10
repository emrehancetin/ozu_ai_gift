function TimeBox({ label, value }) {
  return (
    <div className="time-box">
      <div className="time-value">{value}</div>
      <div className="time-label">{label}</div>
    </div>
  );
}
export default TimeBox;
