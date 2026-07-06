type MappingDiagramProps = {
  variant?: "meaning" | "mappingAB";
};

function SetColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="set-column">
      <span>{title}</span>
      {items.map((item) => (
        <b key={item}>{item}</b>
      ))}
    </div>
  );
}

function ArrowColumn({ arrows }: { arrows: string[] }) {
  return (
    <div className="mapping-arrows" aria-hidden="true">
      {arrows.map((arrow, index) => (
        <span key={`${arrow}-${index}`}>{arrow}</span>
      ))}
    </div>
  );
}

function FunctionMeaningDiagram() {
  return (
    <section className="mapping-card">
      <div className="mapping-example good">
        <h3>ตัวอย่างที่เป็นฟังก์ชัน</h3>
        <p className="mapping-set-text">A = {"{1, 2, 3}"} และ B = {"{2, 4, 6}"}</p>
        <div className="mapping-columns">
          <SetColumn title="โดเมน" items={["1", "2", "3"]} />
          <ArrowColumn arrows={["→", "→", "→"]} />
          <SetColumn title="เรนจ์" items={["2", "4", "6"]} />
        </div>
        <p>เพราะสมาชิกแต่ละตัวในโดเมนมีผลลัพธ์เพียงค่าเดียว</p>
      </div>

      <div className="mapping-example bad">
        <h3>ตัวอย่างที่ไม่เป็นฟังก์ชัน</h3>
        <p className="mapping-set-text">A = {"{1, 2}"} และ B = {"{2, 3, 4}"}</p>
        <div className="split-mapping">
          <b>1</b>
          <div aria-hidden="true">
            <span>→ 2</span>
            <span>→ 3</span>
          </div>
        </div>
        <p>เพราะ input 1 จับคู่กับผลลัพธ์มากกว่าหนึ่งค่า</p>
      </div>
    </section>
  );
}

function MappingABDiagram() {
  return (
    <section className="mapping-card mapping-card-wide">
      <div className="mapping-example good">
        <h3>เป็นฟังก์ชันจาก A ไป B</h3>
        <p className="mapping-set-text">A = {"{1,2,3}"} และ B = {"{a,b,c,d}"}</p>
        <div className="mapping-columns">
          <SetColumn title="A" items={["1", "2", "3"]} />
          <ArrowColumn arrows={["→ a", "→ b", "→ b"]} />
          <SetColumn title="B" items={["a", "b", "c", "d"]} />
        </div>
        <p>แม้ 2 และ 3 ไปที่ b เหมือนกัน ก็ยังเป็นฟังก์ชัน</p>
      </div>

      <div className="mapping-example bad">
        <h3>ไม่เป็นฟังก์ชัน: มีคู่มากกว่าหนึ่งค่า</h3>
        <div className="split-mapping">
          <b>1</b>
          <div aria-hidden="true">
            <span>→ a</span>
            <span>→ c</span>
          </div>
        </div>
        <p>สมาชิกหนึ่งตัวของ A มีลูกศรมากกว่าหนึ่งเส้น</p>
      </div>

      <div className="mapping-example bad">
        <h3>ไม่เป็นฟังก์ชัน: มีสมาชิกไม่มีคู่</h3>
        <div className="mapping-columns">
          <SetColumn title="A" items={["1", "2", "3"]} />
          <ArrowColumn arrows={["→ a", "→ b", ""]} />
          <SetColumn title="B" items={["a", "b", "c"]} />
        </div>
        <p>สมาชิก 3 ใน A ไม่มีภาพใน B</p>
      </div>
    </section>
  );
}

function MappingDiagram({ variant = "meaning" }: MappingDiagramProps) {
  return variant === "mappingAB" ? <MappingABDiagram /> : <FunctionMeaningDiagram />;
}

export default MappingDiagram;
