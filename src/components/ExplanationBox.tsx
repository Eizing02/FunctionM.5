import { Lightbulb } from "lucide-react";

type ExplanationBoxProps = {
  title?: string;
  items: string[];
};

function ExplanationBox({ title = "อ่านกราฟจากค่าที่ปรับ", items }: ExplanationBoxProps) {
  return (
    <section className="explanation-box">
      <div className="box-heading">
        <span className="box-icon" aria-hidden="true">
          <Lightbulb size={18} />
        </span>
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default ExplanationBox;
