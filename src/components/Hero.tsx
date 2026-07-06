import { ArrowRight, FlaskConical } from "lucide-react";

type HeroProps = {
  onStart: () => void;
  onOpenLab: () => void;
};

function Hero({ onStart, onOpenLab }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="soft-badge">บทที่ 2 ฟังก์ชัน</span>
        <h1>Function Visual Lab ม.5</h1>
        <p>เรียนรู้ฟังก์ชันผ่านภาพ สูตร กราฟ และคำอธิบายแบบโต้ตอบ</p>

        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={onStart}>
            เริ่มเรียนรู้
            <ArrowRight size={18} />
          </button>
          <button className="secondary-button" type="button" onClick={onOpenLab}>
            <FlaskConical size={18} />
            ห้องทดลองเขียนสมการเอง
          </button>
        </div>
      </div>

      <div className="hero-visual" aria-label="ภาพประกอบกราฟฟังก์ชัน">
        <div className="graph-orbit graph-orbit-one" />
        <div className="graph-orbit graph-orbit-two" />
        <svg viewBox="0 0 520 360" role="img" aria-label="กราฟฟังก์ชันหลายรูปแบบ">
          <defs>
            <linearGradient id="curveGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="58%" stopColor="#f5c542" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <g className="grid-lines">
            {Array.from({ length: 11 }).map((_, index) => (
              <line key={`v-${index}`} x1={index * 52} x2={index * 52} y1="0" y2="360" />
            ))}
            {Array.from({ length: 8 }).map((_, index) => (
              <line key={`h-${index}`} x1="0" x2="520" y1={index * 52} y2={index * 52} />
            ))}
          </g>
          <line className="axis-line" x1="260" x2="260" y1="24" y2="334" />
          <line className="axis-line" x1="28" x2="492" y1="180" y2="180" />
          <path
            className="function-path"
            d="M44 300 C128 232 170 164 236 160 C312 154 366 218 476 72"
          />
          <path
            className="function-path thin"
            d="M86 70 C154 296 350 296 432 72"
          />
          <path className="function-path cyan" d="M78 272 L252 98 L438 272" />
        </svg>
        <div className="hero-note">
          <strong>สำรวจแบบเห็นภาพ</strong>
          <span>เปิดบทเรียน เลือกค่า แล้วดูกราฟ ตาราง และคำอธิบายเปลี่ยนพร้อมกัน</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
