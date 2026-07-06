import { CheckCircle2 } from "lucide-react";

type SummaryBoxProps = {
  items: string[];
};

function SummaryBox({ items }: SummaryBoxProps) {
  return (
    <section className="summary-box">
      <div className="box-heading">
        <span className="box-icon summary" aria-hidden="true">
          <CheckCircle2 size={18} />
        </span>
        <h3>สรุปท้ายบท</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default SummaryBox;
