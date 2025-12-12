function Stepper({ step, total = 4 }) {
  const dots = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="stepper" aria-label="Kayıt adımları">
      {dots.map((n, idx) => {
        const active = n <= step;
        const isCurrent = n === step;

        return (
          <div className="stepperItem" key={n}>
            <div
              className={
                "stepDot" +
                (active ? " active" : "") +
                (isCurrent ? " current" : "")
              }
            >
              {n}
            </div>

            {idx !== dots.length - 1 && <div className="stepLine" />}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
