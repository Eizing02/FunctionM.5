export type LessonType =
  | "concept"
  | "domainRange"
  | "mappingAB"
  | "realFunction"
  | "verticalTest"
  | "linear"
  | "linearApplication"
  | "quadratic"
  | "step"
  | "exponential"
  | "custom";

export type LessonVisual =
  | "mapping"
  | "domainRange"
  | "mappingAB"
  | "realFunction"
  | "verticalTest"
  | "stepRanges";

export type ParameterName = "a" | "b" | "c" | "k" | "m" | "x";

export type ParamValues = Partial<Record<ParameterName, number>>;

export type ParameterConfig = {
  key: ParameterName;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
};

export type Lesson = {
  id: string;
  order: number;
  type: LessonType;
  title: string;
  shortTitle: string;
  subtitle: string;
  cardDescription: string;
  badge: string;
  icon: string;
  formula: string;
  desmosLatex?: string;
  visual?: LessonVisual;
  parameters: ParameterConfig[];
  defaultParams: ParamValues;
  symbolNotes: string[];
  summary: string[];
};

export const lessons: Lesson[] = [
  {
    id: "function-meaning",
    order: 1,
    type: "concept",
    title: "ความหมายของฟังก์ชัน",
    shortTitle: "ความหมาย",
    subtitle: "เข้าใจว่าความสัมพันธ์แบบใดเป็นฟังก์ชัน และแบบใดไม่เป็นฟังก์ชัน",
    cardDescription: "เข้าใจว่าความสัมพันธ์แบบใดเป็นฟังก์ชัน",
    badge: "พื้นฐาน",
    icon: "x↦y",
    formula: "x หนึ่งค่า → y เพียงค่าเดียว",
    visual: "mapping",
    parameters: [],
    defaultParams: {},
    symbolNotes: [
      "ฟังก์ชันคือความสัมพันธ์ที่สมาชิกแต่ละตัวในโดเมนจับคู่กับสมาชิกในเรนจ์ได้เพียงค่าเดียว",
      "ถ้า x หนึ่งค่าให้ y เพียงค่าเดียว ถือว่าเป็นฟังก์ชัน",
      "ถ้า x หนึ่งค่าให้ y มากกว่าหนึ่งค่า ไม่เป็นฟังก์ชัน",
    ],
    summary: [
      "ฟังก์ชันต้องให้ผลลัพธ์เพียงค่าเดียวต่อ input หนึ่งค่า",
      "ดูจากการจับคู่ได้",
      "ดูจากเซตของคู่อันดับได้",
      "ดูจากกราฟได้ในบางกรณี",
    ],
  },
  {
    id: "domain-range",
    order: 2,
    type: "domainRange",
    title: "โดเมนและเรนจ์",
    shortTitle: "โดเมน/เรนจ์",
    subtitle: "ระบุค่าขาเข้าและค่าผลลัพธ์ของฟังก์ชันจากคู่อันดับ ตาราง และกราฟ",
    cardDescription: "ระบุค่าขาเข้าและค่าผลลัพธ์ของฟังก์ชัน",
    badge: "พื้นฐาน",
    icon: "D/R",
    formula: "(x,y): x คือโดเมน, y คือเรนจ์",
    desmosLatex: "y=x^2",
    visual: "domainRange",
    parameters: [],
    defaultParams: {},
    symbolNotes: [
      "โดเมน คือ เซตของค่า input หรือค่า x ที่ใช้ได้",
      "เรนจ์ คือ เซตของค่า output หรือค่า y ที่เกิดขึ้น",
      "ในคู่อันดับ (x,y) ค่า x อยู่ในโดเมน และค่า y อยู่ในเรนจ์",
    ],
    summary: [
      "โดเมนดูจากค่า x",
      "เรนจ์ดูจากค่า y",
      "ถ้ามีข้อจำกัด เช่น ตัวส่วนเป็นศูนย์ไม่ได้ หรือในรากต้องไม่ติดลบ ต้องระวังเป็นพิเศษ",
      "ในระดับนี้ให้เริ่มจากตาราง คู่อันดับ และกราฟก่อน",
    ],
  },
  {
    id: "function-a-to-b",
    order: 3,
    type: "mappingAB",
    title: "ฟังก์ชันจาก A ไป B",
    shortTitle: "A ไป B",
    subtitle: "พิจารณาการจับคู่สมาชิกทุกตัวของเซต A ไปยังเซต B",
    cardDescription: "เข้าใจการจับคู่สมาชิกจากเซตหนึ่งไปยังอีกเซตหนึ่ง",
    badge: "เซต",
    icon: "A→B",
    formula: "f: A → B",
    visual: "mappingAB",
    parameters: [],
    defaultParams: {},
    symbolNotes: [
      "สมาชิกทุกตัวของ A ต้องมีคู่ใน B เพียงหนึ่งค่า",
      "สมาชิกใน B อาจไม่ถูกจับคู่ครบทุกตัวก็ได้",
      "สมาชิกใน A ห้ามไม่มีคู่ และห้ามมีคู่มากกว่าหนึ่งค่า",
    ],
    summary: [
      "สนใจสมาชิกในเซต A เป็นหลัก",
      "ทุกตัวใน A ต้องมีลูกศรออกหนึ่งเส้น",
      "มีหลายตัวใน A ไปลงที่สมาชิกเดียวกันใน B ได้",
      "แต่หนึ่งตัวใน A ห้ามไปหลายค่า",
    ],
  },
  {
    id: "real-subset-function",
    order: 4,
    type: "realFunction",
    title: "ฟังก์ชันจากสับเซตของจำนวนจริงไปยังจำนวนจริง",
    shortTitle: "f(x)",
    subtitle: "เชื่อมโยงสูตร ตาราง และกราฟของฟังก์ชันที่ใช้จำนวนจริง",
    cardDescription: "เชื่อมโยงฟังก์ชันกับสมการ ตาราง และกราฟ",
    badge: "สูตรและกราฟ",
    icon: "f(x)",
    formula: "f(x)=2x+1",
    desmosLatex: "y=2x+1",
    visual: "realFunction",
    parameters: [
      {
        key: "x",
        label: "x",
        description: "ค่าที่เลือกแทนใน f(x)=2x+1",
        min: -5,
        max: 5,
        step: 1,
        defaultValue: 3,
      },
    ],
    defaultParams: { x: 3 },
    symbolNotes: [
      "x เป็นค่าจากโดเมน",
      "f(x) เป็นค่าผลลัพธ์ในเรนจ์",
      "ฟังก์ชันหนึ่งตัวแสดงได้ทั้งสูตร ตาราง และกราฟ",
    ],
    summary: [
      "f(x) หมายถึงค่าของฟังก์ชันเมื่อแทน x",
      "ฟังก์ชันหนึ่งตัวแสดงได้ทั้งสูตร ตาราง และกราฟ",
      "การเข้าใจ f(x) ช่วยให้แปลโจทย์ได้ง่ายขึ้น",
    ],
  },
  {
    id: "vertical-line-test",
    order: 5,
    type: "verticalTest",
    title: "การตรวจสอบฟังก์ชันจากกราฟ",
    shortTitle: "ตรวจกราฟ",
    subtitle: "ใช้เส้นตรงแนวดิ่งตรวจสอบว่ากราฟแทนฟังก์ชันหรือไม่",
    cardDescription: "ใช้เส้นตรงแนวดิ่งตรวจสอบกราฟ",
    badge: "กราฟ",
    icon: "│",
    formula: "vertical line test",
    visual: "verticalTest",
    parameters: [
      {
        key: "k",
        label: "k",
        description: "ตำแหน่งของเส้นตรงแนวดิ่ง x = k",
        min: -3,
        max: 4,
        step: 0.1,
        defaultValue: 1,
      },
    ],
    defaultParams: { k: 1 },
    symbolNotes: [
      "ถ้าเส้นตรงแนวดิ่งตัดกราฟไม่เกิน 1 จุดทุกตำแหน่ง กราฟนั้นเป็นฟังก์ชัน",
      "ถ้ามีตำแหน่งใดที่เส้นตรงแนวดิ่งตัดกราฟมากกว่า 1 จุด กราฟนั้นไม่เป็นฟังก์ชัน",
      "ตัวอย่าง y=x² เป็นฟังก์ชัน ส่วน x=y² ไม่เป็นฟังก์ชัน",
    ],
    summary: [
      "เส้นตรงแนวดิ่งช่วยตรวจสอบจากกราฟ",
      "ตัดหนึ่งจุดหรือน้อยกว่า ถือว่าเป็นฟังก์ชัน",
      "ตัดมากกว่าหนึ่งจุด ไม่เป็นฟังก์ชัน",
    ],
  },
  {
    id: "linear-function",
    order: 6,
    type: "linear",
    title: "ฟังก์ชันเชิงเส้น",
    shortTitle: "เชิงเส้น",
    subtitle: "เข้าใจความชัน จุดตัดแกน และกราฟเส้นตรง",
    cardDescription: "เข้าใจความชัน จุดตัดแกน และกราฟเส้นตรง",
    badge: "กราฟ",
    icon: "ax+b",
    formula: "f(x)=ax+b",
    desmosLatex: "y=ax+b",
    parameters: [
      {
        key: "a",
        label: "a",
        description: "ความชันของเส้นตรง",
        min: -5,
        max: 5,
        step: 0.1,
        defaultValue: 1,
      },
      {
        key: "b",
        label: "b",
        description: "จุดตัดแกน y",
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
    ],
    defaultParams: { a: 1, b: 0 },
    symbolNotes: [
      "a คือความชัน",
      "ถ้า a > 0 กราฟเพิ่มขึ้นจากซ้ายไปขวา",
      "ถ้า a < 0 กราฟลดลงจากซ้ายไปขวา",
      "b คือจุดตัดแกน y ที่ (0,b)",
    ],
    summary: [
      "กราฟเป็นเส้นตรง",
      "a ควบคุมความชัน",
      "b คือจุดตัดแกน y",
      "ฟังก์ชันเชิงเส้นมักใช้กับสถานการณ์ที่มีอัตราการเปลี่ยนแปลงคงที่",
    ],
  },
  {
    id: "linear-application",
    order: 7,
    type: "linearApplication",
    title: "การใช้ฟังก์ชันเชิงเส้นแก้ปัญหา",
    shortTitle: "ใช้เชิงเส้น",
    subtitle: "ใช้สมการเส้นตรงอธิบายสถานการณ์จริงที่มีค่าเริ่มต้นและอัตราคงที่",
    cardDescription: "ใช้สมการเส้นตรงอธิบายสถานการณ์จริง",
    badge: "สถานการณ์จริง",
    icon: "mx+b",
    formula: "f(x)=mx+b",
    desmosLatex: "y=mx+b",
    parameters: [
      {
        key: "m",
        label: "อัตราต่อหน่วย",
        description: "เงินที่เพิ่มขึ้นเมื่อ x เพิ่ม 1 หน่วย",
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 2,
      },
      {
        key: "b",
        label: "ค่าเริ่มต้น",
        description: "ค่าใช้จ่ายเมื่อ x = 0",
        min: 0,
        max: 100,
        step: 5,
        defaultValue: 10,
      },
    ],
    defaultParams: { m: 2, b: 10 },
    symbolNotes: [
      "ร้านถ่ายเอกสารคิดค่าเปิดงาน 10 บาท และคิดเพิ่มแผ่นละ 2 บาท",
      "ให้ x = จำนวนแผ่น และ f(x) = ค่าใช้จ่ายทั้งหมด",
      "ดังนั้น f(x)=2x+10",
    ],
    summary: [
      "ฟังก์ชันเชิงเส้นใช้แทนสถานการณ์ที่เพิ่มหรือลดแบบคงที่",
      "ความชันคืออัตราการเปลี่ยนแปลง",
      "จุดตัดแกน y คือค่าเริ่มต้น",
    ],
  },
  {
    id: "quadratic-function",
    order: 8,
    type: "quadratic",
    title: "ฟังก์ชันกำลังสอง",
    shortTitle: "กำลังสอง",
    subtitle: "เข้าใจพาราโบลา จุดยอด และลักษณะกราฟ",
    cardDescription: "เข้าใจพาราโบลา จุดยอด และลักษณะกราฟ",
    badge: "กราฟ",
    icon: "x²",
    formula: "f(x)=ax²+bx+c",
    desmosLatex: "y=ax^2+bx+c",
    parameters: [
      {
        key: "a",
        label: "a",
        description: "ทิศทางและความกว้างของพาราโบลา",
        min: -5,
        max: 5,
        step: 0.1,
        defaultValue: 1,
      },
      {
        key: "b",
        label: "b",
        description: "มีผลต่อแกนสมมาตรและจุดยอด",
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
      {
        key: "c",
        label: "c",
        description: "จุดตัดแกน y",
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
    ],
    defaultParams: { a: 1, b: 0, c: 0 },
    symbolNotes: [
      "กราฟของฟังก์ชันกำลังสองเป็นพาราโบลา",
      "ถ้า a > 0 กราฟหงาย และถ้า a < 0 กราฟคว่ำ",
      "จุดยอดคำนวณได้จาก x = -b/(2a)",
    ],
    summary: [
      "กราฟเป็นพาราโบลา",
      "a บอกทิศทางและความกว้างของกราฟ",
      "c คือจุดตัดแกน y",
      "จุดยอดเป็นจุดสำคัญของกราฟ",
    ],
  },
  {
    id: "step-function",
    order: 9,
    type: "step",
    title: "ฟังก์ชันขั้นบันได",
    shortTitle: "ขั้นบันได",
    subtitle: "เข้าใจกราฟแบบเป็นช่วงและการใช้งานจริง เช่น ค่าจอดรถ",
    cardDescription: "เข้าใจกราฟแบบเป็นช่วงและการใช้งานจริง",
    badge: "เป็นช่วง",
    icon: "▁▃▅",
    formula: "f(x)=ค่าคงที่เป็นช่วง",
    desmosLatex:
      "y=\\left\\{0<x\\le1:20,\\ 1<x\\le2:40,\\ 2<x\\le3:60,\\ x>3:80\\right\\}",
    visual: "stepRanges",
    parameters: [],
    defaultParams: {},
    symbolNotes: [
      "ฟังก์ชันขั้นบันไดเป็นฟังก์ชันที่มีค่าคงที่เป็นช่วง ๆ",
      "กราฟมีลักษณะเป็นขั้น",
      "ใช้กับสถานการณ์ที่คิดราคาเป็นช่วง เช่น ค่าจอดรถ ค่าส่งของ หรือค่าไฟบางรูปแบบ",
    ],
    summary: [
      "ค่าของฟังก์ชันคงที่ในแต่ละช่วง",
      "เมื่อข้ามช่วง ค่าจะกระโดดเป็นขั้น",
      "ต้องระวังสัญลักษณ์ <, ≤, >, ≥",
    ],
  },
  {
    id: "exponential-function",
    order: 10,
    type: "exponential",
    title: "ฟังก์ชันเอกซ์โพเนนเชียล",
    shortTitle: "เอกซ์โพฯ",
    subtitle: "เข้าใจการเพิ่มและลดแบบทวีคูณจากฐานของเลขยกกำลัง",
    cardDescription: "เข้าใจการเพิ่ม/ลดแบบทวีคูณ",
    badge: "กราฟ",
    icon: "ab^x",
    formula: "f(x)=ab^x",
    desmosLatex: "y=a\\cdot b^x",
    parameters: [
      {
        key: "a",
        label: "a",
        description: "ตัวคูณที่มีผลต่อขนาดและทิศทาง",
        min: -5,
        max: 5,
        step: 0.1,
        defaultValue: 1,
      },
      {
        key: "b",
        label: "b",
        description: "ฐานของเลขยกกำลัง ต้องมากกว่า 0",
        min: 0.1,
        max: 5,
        step: 0.1,
        defaultValue: 2,
      },
    ],
    defaultParams: { a: 1, b: 2 },
    symbolNotes: [
      "เงื่อนไขสำคัญคือ a ≠ 0, b > 0 และ b ≠ 1 เมื่อต้องการลักษณะเพิ่มหรือลดจริง ๆ",
      "ถ้า b > 1 กราฟแสดงการเพิ่มแบบทวีคูณ",
      "ถ้า 0 < b < 1 กราฟแสดงการลดแบบทวีคูณ",
    ],
    summary: [
      "ฟังก์ชันเอกซ์โพเนนเชียลเกี่ยวกับการเพิ่มหรือลดแบบทวีคูณ",
      "b เป็นฐานที่กำหนดลักษณะการเพิ่มหรือลด",
      "b > 1 เพิ่มขึ้น และ 0 < b < 1 ลดลง",
      "ใช้กับสถานการณ์ เช่น จำนวนประชากร ดอกเบี้ย การสลายตัว หรือการเติบโต",
    ],
  },
  {
    id: "custom-lab",
    order: 11,
    type: "custom",
    title: "ห้องทดลองเขียนสมการเอง",
    shortTitle: "ทดลองเอง",
    subtitle: "พิมพ์สมการเองแล้วดูกราฟด้วย Desmos",
    cardDescription: "พิมพ์สมการเองแล้วดูกราฟด้วย Desmos",
    badge: "ทดลอง",
    icon: "fx",
    formula: "y = ...",
    parameters: [],
    defaultParams: {},
    symbolNotes: [],
    summary: [
      "ใช้ ^ แทนยกกำลัง",
      "ใช้ {เงื่อนไข:ค่า} สำหรับฟังก์ชันเป็นช่วงใน Desmos",
      "ใช้ x เป็นตัวแปรหลัก",
    ],
  },
];
