import "./HeroCircle.css";
import campus from "../../assets/ozu_campus.webp";
import campus2 from "../../assets/i.jpg";

function HeroCircle() {
  return (
    <div className="hero-circle">
      <img className="hero-circle-inside" src={campus2} alt="ÖzÜm Campus" />
    </div>
  );
}

export default HeroCircle;
