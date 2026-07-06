import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import type { Lesson, ParameterName, ParamValues } from "../data/lessons";
import {
  formatNumber,
  generateTable,
  getDomainRangeText,
  getExplanationForLesson,
} from "../utils/mathHelpers";
import DesmosGraph from "./DesmosGraph";
import ExplanationBox from "./ExplanationBox";
import FormulaCard from "./FormulaCard";
import MappingDiagram from "./MappingDiagram";
import ParameterSlider from "./ParameterSlider";
import SummaryBox from "./SummaryBox";
import ValueTable from "./ValueTable";
import VerticalLineTest from "./VerticalLineTest";

type LessonViewProps = {
  lesson: Lesson;
  onBack: () => void;
};

function DomainRangePanel() {
  const pairs = [
    [1, 2],
    [2, 4],
    [3, 6],
    [4, 8],
  ];

  return (
    <section className="concept-card">
      <p className="card-label">ตัวอย่างคู่อันดับ</p>
      <div className="ordered-pair-strip">
        {pairs.map(([x, y]) => (
          <span key={`${x}-${y}`}>
            (<b className="domain-highlight">{x}</b>, <b className="range-highlight">{y}</b>)
          </span>
        ))}
      </div>
      <div className="domain-range-grid">
        <div>
          <strong>โดเมน</strong>
          <p>{"{1, 2, 3, 4}"}</p>
        </div>
        <div>
          <strong>เรนจ์</strong>
          <p>{"{2, 4, 6, 8}"}</p>
        </div>
      </div>
      <p className="fine-print">กราฟ y=x² มีโดเมนเป็นจำนวนจริง และเรนจ์คือ y ≥ 0</p>
    </section>
  );
}

function RealFunctionPanel({ x }: { x: number }) {
  const y = 2 * x + 1;

  return (
    <section className="concept-card">
      <p className="card-label">แทนค่าใน f(x)</p>
      <div className="substitution-box">
        <span>f(x)=2x+1</span>
        <strong>
          f({formatNumber(x)}) = 2({formatNumber(x)}) + 1 = {formatNumber(y)}
        </strong>
      </div>
      <p className="fine-print">จุด ({formatNumber(x)}, {formatNumber(y)}) จะเลื่อนไปตามค่า x ที่เลือก</p>
    </section>
  );
}

function StepRangePanel() {
  const ranges = [
    ["0 < x ≤ 1", "20 บาท"],
    ["1 < x ≤ 2", "40 บาท"],
    ["2 < x ≤ 3", "60 บาท"],
    ["x > 3", "80 บาท"],
  ];

  return (
    <section className="concept-card">
      <p className="card-label">ค่าจอดรถแบบเป็นช่วง</p>
      <div className="step-range-list">
        {ranges.map(([range, price]) => (
          <div key={range}>
            <span>{range}</span>
            <strong>{price}</strong>
          </div>
        ))}
      </div>
      <p className="fine-print">ตัวอย่าง: x = 1.5 ชั่วโมง อยู่ในช่วง {"1 < x ≤ 2"} จึงได้ราคา 40 บาท</p>
    </section>
  );
}

function LessonVisual({ lesson, params }: { lesson: Lesson; params: ParamValues }) {
  if (lesson.visual === "mapping") return <MappingDiagram />;
  if (lesson.visual === "mappingAB") return <MappingDiagram variant="mappingAB" />;
  if (lesson.visual === "domainRange") return <DomainRangePanel />;
  if (lesson.visual === "realFunction") return <RealFunctionPanel x={params.x ?? 3} />;
  if (lesson.visual === "verticalTest") return <VerticalLineTest k={params.k ?? 1} />;
  if (lesson.visual === "stepRanges") return <StepRangePanel />;
  return null;
}

function lessonHasGraph(lesson: Lesson) {
  return Boolean(
    lesson.desmosLatex ||
      lesson.type === "realFunction" ||
      lesson.type === "verticalTest",
  );
}

function getTableHint(lesson: Lesson) {
  if (lesson.type === "linearApplication") return "x = 0,1,2,3,4,5,10";
  if (lesson.type === "step") return "ตัวอย่างค่าตามช่วง";
  if (lesson.type === "realFunction") return "x = -3 ถึง 3";
  return "x = -3 ถึง 3";
}

function getParameterHeading(lesson: Lesson) {
  if (lesson.type === "realFunction") return "เลือกค่า x แล้วดู f(x)";
  if (lesson.type === "verticalTest") return "เลื่อนเส้นตรงแนวดิ่ง";
  if (lesson.type === "linearApplication") return "ปรับสถานการณ์จริง";
  return "เลื่อนค่าแล้วสังเกตกราฟ";
}

function LessonView({ lesson, onBack }: LessonViewProps) {
  const [params, setParams] = useState<ParamValues>(lesson.defaultParams);

  useEffect(() => {
    setParams(lesson.defaultParams);
  }, [lesson]);

  const explanations = useMemo(
    () => getExplanationForLesson(lesson.type, params),
    [lesson.type, params],
  );

  const rows = useMemo(() => generateTable(lesson.type, params), [lesson.type, params]);

  const updateParam = (key: ParameterName, value: number) => {
    setParams((current) => ({ ...current, [key]: value }));
  };

  const resetParams = () => setParams(lesson.defaultParams);
  const hasParameters = lesson.parameters.length > 0;
  const hasGraph = lessonHasGraph(lesson);
  const visual = <LessonVisual lesson={lesson} params={params} />;

  return (
    <article className="lesson-view">
      <div className="lesson-hero">
        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          กลับหน้าแรก
        </button>
        <div>
          <span className="lesson-number">บทที่ {lesson.order}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.subtitle}</p>
        </div>
        <div className="lesson-formula-banner">{lesson.formula}</div>
      </div>

      <div className="lesson-workspace">
        <div className="lesson-panel">
          <FormulaCard formula={lesson.formula} symbolNotes={lesson.symbolNotes} />

          {hasParameters && (
            <section className="parameter-panel">
              <div className="panel-heading-row">
                <div>
                  <p className="card-label">ปรับค่า</p>
                  <h3>{getParameterHeading(lesson)}</h3>
                </div>
                <button className="reset-button" type="button" onClick={resetParams}>
                  <RefreshCcw size={16} />
                  รีเซ็ตค่า
                </button>
              </div>

              {lesson.parameters.map((parameter) => (
                <ParameterSlider
                  key={parameter.key}
                  parameter={parameter}
                  value={params[parameter.key] ?? parameter.defaultValue}
                  onChange={updateParam}
                />
              ))}
            </section>
          )}

          {hasGraph && visual}

          <ExplanationBox
            title={hasParameters ? "อ่านค่าที่เปลี่ยน" : "แนวคิดสำคัญ"}
            items={explanations}
          />

          {["linear", "quadratic", "exponential", "step"].includes(lesson.type) && (
            <ExplanationBox
              title="โดเมนและเรนจ์โดยย่อ"
              items={[getDomainRangeText(lesson.type, params)]}
            />
          )}
        </div>

        <div className="lesson-panel graph-column">
          {hasGraph ? (
            <DesmosGraph
              key={lesson.id}
              lessonType={lesson.type}
              latex={lesson.desmosLatex}
              params={params}
            />
          ) : (
            visual
          )}

          {rows.length > 0 && <ValueTable rows={rows} hint={getTableHint(lesson)} />}
          <SummaryBox items={lesson.summary} />
        </div>
      </div>
    </article>
  );
}

export default LessonView;
