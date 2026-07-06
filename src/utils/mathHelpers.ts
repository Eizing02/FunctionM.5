import type { LessonType, ParamValues } from "../data/lessons";

export type TableRow = {
  x: number;
  y: number | null;
};

const defaultXValues = [-3, -2, -1, 0, 1, 2, 3];
const linearApplicationXValues = [0, 1, 2, 3, 4, 5, 10];
const stepXValues = [0.5, 1, 1.5, 2, 2.5, 3, 4];

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "ไม่กำหนด";
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

function param(params: ParamValues, key: keyof ParamValues, fallback = 0) {
  return params[key] ?? fallback;
}

export function getQuadraticVertex(a: number, b: number, c: number) {
  if (a === 0) return null;
  const x = -b / (2 * a);
  return { x, y: a * x * x + b * x + c };
}

function evaluateStepFunction(x: number): number | null {
  if (x > 0 && x <= 1) return 20;
  if (x > 1 && x <= 2) return 40;
  if (x > 2 && x <= 3) return 60;
  if (x > 3) return 80;
  return null;
}

export function evaluateFunction(
  lessonType: LessonType,
  x: number,
  params: ParamValues,
): number | null {
  const a = param(params, "a", 1);
  const b = param(params, "b", 0);
  const c = param(params, "c", 0);
  const m = param(params, "m", 2);

  switch (lessonType) {
    case "domainRange":
      return x * x;
    case "realFunction":
      return 2 * x + 1;
    case "linear":
      return a * x + b;
    case "linearApplication":
      return m * x + b;
    case "quadratic":
      return a * x * x + b * x + c;
    case "step":
      return evaluateStepFunction(x);
    case "exponential":
      return b <= 0 ? null : a * b ** x;
    default:
      return null;
  }
}

function getSampleXValues(lessonType: LessonType) {
  if (lessonType === "linearApplication") return linearApplicationXValues;
  if (lessonType === "step") return stepXValues;
  if (
    lessonType === "domainRange" ||
    lessonType === "realFunction" ||
    lessonType === "linear" ||
    lessonType === "quadratic" ||
    lessonType === "exponential"
  ) {
    return defaultXValues;
  }

  return [];
}

export function generateTable(
  lessonType: LessonType,
  params: ParamValues,
): TableRow[] {
  return getSampleXValues(lessonType).map((x) => ({
    x,
    y: evaluateFunction(lessonType, x, params),
  }));
}

export function getDomainRangeText(lessonType: LessonType, params: ParamValues): string {
  const a = param(params, "a", 1);
  const b = param(params, "b", 0);

  switch (lessonType) {
    case "linear":
      return a === 0
        ? "โดเมนเป็นจำนวนจริง และเรนจ์มีค่าเดียวคือ y = b"
        : "โดเมนเป็นจำนวนจริง และเรนจ์เป็นจำนวนจริง";
    case "quadratic":
      return a > 0
        ? "โดเมนเป็นจำนวนจริง และเรนจ์เริ่มตั้งแต่ค่าต่ำสุดที่จุดยอดขึ้นไป"
        : a < 0
          ? "โดเมนเป็นจำนวนจริง และเรนจ์ไม่เกินค่าสูงสุดที่จุดยอด"
          : "เมื่อ a = 0 จะไม่เป็นฟังก์ชันกำลังสอง แต่เป็นฟังก์ชันเชิงเส้น";
    case "exponential":
      if (b === 1) return "โดเมนเป็นจำนวนจริง แต่กราฟเป็นค่าคงที่เพราะ b = 1";
      return "โดเมนเป็นจำนวนจริง และค่าของกราฟขึ้นกับ a และ b";
    case "step":
      return "โดเมนขึ้นกับช่วงเวลาที่กำหนด และเรนจ์เป็นราคาคงที่แต่ละช่วง";
    default:
      return "ดูโดเมนจากค่า x และดูเรนจ์จากค่า y";
  }
}

export function getConceptExplanation(): string[] {
  return [
    "ถ้า input หนึ่งค่าให้ output เพียงค่าเดียว ความสัมพันธ์นั้นเป็นฟังก์ชัน",
    "ถ้า input เดิมชี้ไปหา output หลายค่า จะไม่เป็นฟังก์ชัน",
    "ตรวจได้จากแผนภาพ คู่อันดับ ตาราง หรือกราฟ",
  ];
}

export function getDomainRangeExplanation(): string[] {
  return [
    "จากคู่อันดับ (x,y) ค่า x คือสมาชิกของโดเมน และค่า y คือสมาชิกของเรนจ์",
    "ตัวอย่าง {(1,2),(2,4),(3,6),(4,8)} มีโดเมน {1,2,3,4} และเรนจ์ {2,4,6,8}",
    "สำหรับ y=x² เมื่อไม่จำกัดค่า x โดเมนคือจำนวนจริง และเรนจ์คือ y ≥ 0",
  ];
}

export function getMappingABExplanation(): string[] {
  return [
    "ฟังก์ชันจาก A ไป B ต้องให้สมาชิกทุกตัวของ A มีลูกศรออกหนึ่งเส้น",
    "สมาชิกหลายตัวใน A ไปลงสมาชิกเดียวกันใน B ได้",
    "แต่สมาชิกหนึ่งตัวใน A ห้ามไม่มีคู่ และห้ามมีคู่มากกว่าหนึ่งค่า",
  ];
}

export function getRealFunctionExplanation(params: ParamValues): string[] {
  const x = param(params, "x", 3);
  const y = 2 * x + 1;

  return [
    `เลือก x = ${formatNumber(x)}`,
    `แทนค่าได้ f(${formatNumber(x)}) = 2(${formatNumber(x)}) + 1 = ${formatNumber(y)}`,
    "ค่าที่ได้เป็นจุดบนกราฟและเป็นค่าในตารางของฟังก์ชันเดียวกัน",
  ];
}

export function getVerticalTestExplanation(params: ParamValues): string[] {
  const k = param(params, "k", 1);
  const nonFunctionCut =
    k > 0
      ? "สำหรับ x=y² เส้นแนวดิ่งตัดกราฟสองจุด จึงไม่เป็นฟังก์ชัน"
      : k === 0
        ? "ที่ x=0 เส้นแนวดิ่งแตะ x=y² หนึ่งจุด แต่ตำแหน่งอื่นยังตัดสองจุดได้"
        : "ที่ k เป็นลบ เส้นอาจไม่ตัด x=y² แต่การทดสอบต้องจริงทุกตำแหน่ง";

  return [
    `เลื่อนเส้นตรวจสอบไปที่ x = ${formatNumber(k)}`,
    "สำหรับ y=x² เส้นแนวดิ่งตัดกราฟเพียงหนึ่งจุด จึงเป็นฟังก์ชัน",
    nonFunctionCut,
  ];
}

export function getLinearExplanation(params: ParamValues): string[] {
  const a = param(params, "a", 1);
  const b = param(params, "b", 0);
  const direction =
    a > 0
      ? "เส้นตรงเพิ่มขึ้นจากซ้ายไปขวา เพราะ a เป็นจำนวนบวก"
      : a < 0
        ? "เส้นตรงลดลงจากซ้ายไปขวา เพราะ a เป็นจำนวนลบ"
        : "กราฟเป็นเส้นนอน เพราะ a = 0";

  return [
    `ค่า a = ${formatNumber(a)} คือความชันของเส้นตรง`,
    direction,
    `ค่า b = ${formatNumber(b)} ทำให้กราฟตัดแกน y ที่จุด (0, ${formatNumber(b)})`,
  ];
}

export function getLinearApplicationExplanation(params: ParamValues): string[] {
  const m = param(params, "m", 2);
  const b = param(params, "b", 10);

  return [
    `ค่าเริ่มต้นคือ ${formatNumber(b)} บาท เป็นจำนวนเงินที่ต้องจ่ายแม้ x = 0`,
    `อัตราต่อหน่วยคือ ${formatNumber(m)} บาท หมายถึง x เพิ่ม 1 ค่าใช้จ่ายเพิ่ม ${formatNumber(m)} บาท`,
    `จุดตัดแกน y คือค่าเริ่มต้น และความชันคืออัตราต่อหน่วย`,
  ];
}

export function getQuadraticExplanation(params: ParamValues): string[] {
  const a = param(params, "a", 1);
  const b = param(params, "b", 0);
  const c = param(params, "c", 0);
  const width =
    Math.abs(a) > 1
      ? "ค่า |a| มากกว่า 1 กราฟจะแคบลง"
      : Math.abs(a) < 1 && a !== 0
        ? "ค่า |a| น้อยกว่า 1 กราฟจะกว้างขึ้น"
        : "ค่า |a| เท่ากับ 1 กราฟมีความกว้างมาตรฐาน";

  const opening =
    a > 0
      ? "ค่า a เป็นจำนวนบวก กราฟพาราโบลาหงาย"
      : a < 0
        ? "ค่า a เป็นจำนวนลบ กราฟพาราโบลาคว่ำ"
        : "เมื่อ a = 0 ฟังก์ชันนี้จะไม่เป็นฟังก์ชันกำลังสอง แต่จะกลายเป็นฟังก์ชันเชิงเส้น";

  const vertex = getQuadraticVertex(a, b, c);

  return [
    opening,
    width,
    `ค่า c = ${formatNumber(c)} ทำให้กราฟตัดแกน y ที่จุด (0, ${formatNumber(c)})`,
    vertex
      ? `จุดยอดของกราฟประมาณ (${formatNumber(vertex.x)}, ${formatNumber(vertex.y)})`
      : "ยังคำนวณจุดยอดแบบพาราโบลาไม่ได้ เพราะ a = 0",
  ];
}

export function getStepExplanation(): string[] {
  return [
    "ช่วง 0 < x ≤ 1 ชั่วโมง ราคา 20 บาท",
    "ช่วง 1 < x ≤ 2 ชั่วโมง ราคา 40 บาท และช่วง 2 < x ≤ 3 ชั่วโมง ราคา 60 บาท",
    "ถ้า x > 3 ชั่วโมง ราคา 80 บาท เช่น x = 1.5 ชั่วโมง ได้ 40 บาท",
  ];
}

export function getExponentialExplanation(params: ParamValues): string[] {
  const a = param(params, "a", 1);
  const b = param(params, "b", 2);
  const growth =
    b > 1
      ? "เพราะ b > 1 กราฟแสดงการเพิ่มแบบทวีคูณ"
      : b > 0 && b < 1
        ? "เพราะ 0 < b < 1 กราฟแสดงการลดแบบทวีคูณ"
        : "เมื่อ b = 1 กราฟเป็นค่าคงที่ ไม่ใช่ลักษณะเพิ่มหรือลดแบบเอกซ์โพเนนเชียล";

  return [
    growth,
    `ค่า a = ${formatNumber(a)} เป็นตัวคูณที่มีผลต่อขนาดและทิศทางของกราฟ`,
    "เมื่อ a เป็นบวกและไม่มีการเลื่อนกราฟ กราฟมักเข้าใกล้แกน x แต่ไม่ตัดแกน x",
  ];
}

export function getExplanationForLesson(
  lessonType: LessonType,
  params: ParamValues,
): string[] {
  switch (lessonType) {
    case "concept":
      return getConceptExplanation();
    case "domainRange":
      return getDomainRangeExplanation();
    case "mappingAB":
      return getMappingABExplanation();
    case "realFunction":
      return getRealFunctionExplanation(params);
    case "verticalTest":
      return getVerticalTestExplanation(params);
    case "linear":
      return getLinearExplanation(params);
    case "linearApplication":
      return getLinearApplicationExplanation(params);
    case "quadratic":
      return getQuadraticExplanation(params);
    case "step":
      return getStepExplanation();
    case "exponential":
      return getExponentialExplanation(params);
    default:
      return [];
  }
}

function replaceFunctionCall(
  source: string,
  name: string,
  formatter: (inner: string) => string,
): string {
  let output = "";
  let index = 0;
  const needle = `${name}(`;

  while (index < source.length) {
    const start = source.indexOf(needle, index);
    if (start === -1) {
      output += source.slice(index);
      break;
    }

    output += source.slice(index, start);
    let depth = 1;
    let cursor = start + needle.length;

    while (cursor < source.length && depth > 0) {
      const char = source[cursor];
      if (char === "(") depth += 1;
      if (char === ")") depth -= 1;
      cursor += 1;
    }

    if (depth !== 0) {
      output += source.slice(start);
      break;
    }

    const inner = source.slice(start + needle.length, cursor - 1);
    output += formatter(inner);
    index = cursor;
  }

  return output;
}

export function normalizeCustomExpression(input: string): string {
  const compact = input.trim().replace(/\s+/g, "");
  const normalizedInequality = compact.replace(/≤/g, "\\le").replace(/≥/g, "\\ge");
  const withSqrt = replaceFunctionCall(normalizedInequality, "sqrt", (inner) => `\\sqrt{${inner}}`);
  return replaceFunctionCall(withSqrt, "abs", (inner) => `\\left|${inner}\\right|`);
}

export function isProbablyEquation(input: string): boolean {
  const compact = input.trim();
  if (!compact.includes("=")) return false;
  return /^[a-zA-Z0-9xyf().=+\-*/^_|\\{}\[\]\s:<>≤≥,]+$/.test(compact);
}
