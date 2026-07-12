import { ArrowRight, FlaskConical } from "lucide-react";

type HeroProps = {
  onStart: () => void;
  onOpenLab: () => void;
};

function Hero({ onStart, onOpenLab }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="soft-badge">ห้องทดลองฟังก์ชัน ม.5</span>
        <h1>ง่ายๆ กับฟังก์ชัน</h1>
        <p className="hero-credit">สร้างโดย ครูปิยะวัตร ผิวศิริ</p>
        <p className="hero-description">เรียนรู้ฟังก์ชันผ่านภาพ สูตร กราฟ และคำอธิบายแบบโต้ตอบ</p>

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

      <div className="hero-visual" aria-label="โลโก้ง่ายๆ กับฟังก์ชัน">
        <img
          className="hero-brand-image"
          src="/naita-math-logo-transparent.png"
          alt="ง่ายๆ กับฟังก์ชัน สร้างโดย ครูปิยะวัตร ผิวศิริ"
        />
      </div>
    </section>
  );
}

export default Hero;
