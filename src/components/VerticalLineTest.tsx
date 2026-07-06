import { formatNumber } from "../utils/mathHelpers";

type VerticalLineTestProps = {
  k: number;
};

function VerticalLineTest({ k }: VerticalLineTestProps) {
  const nonFunctionText =
    k > 0
      ? "เส้นแนวดิ่งตัดกราฟ x=y² สองจุด"
      : k === 0
        ? "ที่ x=0 แตะหนึ่งจุด แต่ตำแหน่งอื่นยังตัดสองจุดได้"
        : "ตำแหน่งนี้ไม่ตัด x=y² แต่ต้องตรวจทุกตำแหน่ง";

  return (
    <section className="vertical-test-card">
      <div className="panel-heading-row">
        <div>
          <p className="card-label">ตรวจจากกราฟ</p>
          <h3>เส้นตรงแนวดิ่ง x = {formatNumber(k)}</h3>
        </div>
      </div>

      <div className="vertical-test-grid">
        <div className="test-result-card good">
          <strong>y = x²</strong>
          <span>เป็นฟังก์ชัน</span>
          <p>เส้นแนวดิ่งตัดกราฟเพียงหนึ่งจุด</p>
        </div>
        <div className="test-result-card bad">
          <strong>x = y²</strong>
          <span>ไม่เป็นฟังก์ชัน</span>
          <p>{nonFunctionText}</p>
        </div>
      </div>

      <div className="mini-test-graph" aria-hidden="true">
        <span className="vertical-line" />
        <span className="curve-line" />
      </div>
    </section>
  );
}

export default VerticalLineTest;
