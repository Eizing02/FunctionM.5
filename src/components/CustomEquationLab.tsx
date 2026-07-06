import { useMemo, useState } from "react";
import { ArrowLeft, Eraser, LineChart } from "lucide-react";
import DesmosGraph from "./DesmosGraph";
import ExplanationBox from "./ExplanationBox";
import SummaryBox from "./SummaryBox";
import {
  isProbablyEquation,
  normalizeCustomExpression,
} from "../utils/mathHelpers";

type CustomEquationLabProps = {
  onBack: () => void;
};

const examples = [
  { label: "y=2x+1", value: "y=2x+1" },
  { label: "y=x²", value: "y=x^2" },
  { label: "y=-x²+4", value: "y=-x^2+4" },
  { label: "y=2^x", value: "y=2^x" },
  { label: "y=0.5^x", value: "y=0.5^x" },
  {
    label: "ขั้นบันได",
    value: "y={0<x≤1:20,1<x≤2:40,2<x≤3:60,x>3:80}",
  },
];

function CustomEquationLab({ onBack }: CustomEquationLabProps) {
  const [input, setInput] = useState("y=x^2-4x+3");
  const [submitted, setSubmitted] = useState("y=x^2-4x+3");
  const [warning, setWarning] = useState("");

  const normalizedExpression = useMemo(
    () => normalizeCustomExpression(submitted),
    [submitted],
  );

  const showGraph = () => {
    if (!isProbablyEquation(input)) {
      setWarning("สมการนี้อาจไม่ถูกต้อง กรุณาตรวจสอบรูปแบบอีกครั้ง");
      return;
    }

    setWarning("");
    setSubmitted(input);
  };

  const clearGraph = () => {
    setInput("");
    setSubmitted("");
    setWarning("ล้างกราฟแล้ว ลองพิมพ์สมการใหม่ได้เลย");
  };

  const selectExample = (value: string) => {
    setInput(value);
    setSubmitted(value);
    setWarning("");
  };

  return (
    <article className="lesson-view custom-lab-page">
      <div className="lesson-hero">
        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          กลับหน้าแรก
        </button>
        <div>
          <span className="lesson-number">บทที่ 11</span>
          <h1>ห้องทดลองเขียนสมการเอง</h1>
          <p>พิมพ์สมการเองแล้วดูกราฟด้วย Desmos</p>
        </div>
        <div className="lesson-formula-banner">y = ...</div>
      </div>

      <div className="lesson-workspace">
        <div className="lesson-panel">
          <section className="custom-input-card">
            <p className="card-label">สมการของฉัน</p>
            <label className="equation-input-label">
              <span>พิมพ์สมการ</span>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="y=x^2-4x+3"
                aria-label="พิมพ์สมการ"
              />
            </label>

            <div className="custom-actions">
              <button className="primary-button" type="button" onClick={showGraph}>
                <LineChart size={18} />
                แสดงกราฟ
              </button>
              <button className="secondary-button compact" type="button" onClick={clearGraph}>
                <Eraser size={18} />
                ล้างกราฟ
              </button>
            </div>
          </section>

          <section className="example-card">
            <p className="card-label">ตัวอย่างสมการ</p>
            <div className="example-grid">
              {examples.map((example) => (
                <button
                  key={example.value}
                  className="example-button"
                  type="button"
                  onClick={() => selectExample(example.value)}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </section>

          <ExplanationBox
            title="คำแนะนำการพิมพ์"
            items={[
              "ใช้ ^ แทนยกกำลัง เช่น x^2",
              "ใช้ {เงื่อนไข:ค่า} สำหรับฟังก์ชันเป็นช่วงใน Desmos",
              "ใช้ x เป็นตัวแปรหลัก",
              "ถ้าสมการไม่ถูกต้อง เว็บจะแจ้งเตือนโดยไม่หยุดทำงาน",
            ]}
          />
        </div>

        <div className="lesson-panel graph-column">
          <DesmosGraph
            customExpression={normalizedExpression}
            customWarning={warning}
          />
          <SummaryBox
            items={[
              "ลองเปลี่ยนสมการทีละส่วน แล้วสังเกตรูปกราฟ",
              "ห้องทดลองนี้ไม่ใช่บทหลักเพื่อสอบ แต่เป็นพื้นที่ให้ลองดูกราฟเพิ่มเติม",
              "ใช้ตัวอย่างสมการเพื่อเปรียบเทียบรูปกราฟหลายแบบ",
            ]}
          />
        </div>
      </div>
    </article>
  );
}

export default CustomEquationLab;
