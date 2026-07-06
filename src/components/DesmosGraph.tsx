import { useEffect, useMemo, useRef, useState } from "react";
import { Box, TriangleAlert } from "lucide-react";
import type { LessonType, ParamValues } from "../data/lessons";

type CalculatorInstance = {
  setExpressions?: (expressions: DesmosExpression[]) => void;
  setExpression: (expression: {
    id: string;
    latex: string;
    color?: string;
    lineStyle?: string;
    lineWidth?: number;
    sliderBounds?: { min: string; max: string; step?: string };
  }) => void;
  removeExpressions?: (expressions: Array<{ id: string }>) => void;
  removeExpression?: (expression: { id: string }) => void;
  setMathBounds?: (bounds: { left: number; right: number; bottom: number; top: number }) => void;
  updateSettings?: (settings: Record<string, boolean | string | number>) => void;
  withHistoryReplacement?: (callback: () => void) => void;
  resize?: () => void;
  destroy: () => void;
};

type DesmosGlobal = {
  GraphingCalculator: (
    element: HTMLElement,
    options?: Record<string, boolean | string | number>,
  ) => CalculatorInstance;
  Calculator3D?: (
    element: HTMLElement,
    options?: Record<string, boolean | string | number>,
  ) => CalculatorInstance;
  Styles?: {
    DASHED?: string;
  };
};

declare global {
  interface Window {
    Desmos?: DesmosGlobal;
  }
}

type DesmosGraphProps = {
  lessonType?: LessonType;
  latex?: string;
  params?: ParamValues;
  customExpression?: string;
  customWarning?: string;
};

type GraphStatus = "idle" | "loading" | "ready" | "error" | "unsupported";

type DesmosExpression = {
  id: string;
  latex?: string;
  color?: string;
  lineStyle?: string;
  lineWidth?: number;
  sliderBounds?: { min: string; max: string; step?: string };
};

const scriptId = "desmos-api-script";
const expressionIds = [
  "a",
  "b",
  "c",
  "k",
  "m",
  "x",
  "main",
  "surface",
  "vertex",
  "point",
  "test-line",
  "non-function",
  "custom",
];

const sharedOptions = {
  expressions: false,
  settingsMenu: false,
  zoomButtons: true,
  lockViewport: false,
  border: false,
  keypad: false,
  projectorMode: true,
  backgroundColor: "#ffffff",
  textColor: "#0f172a",
  accentColor: "#2563eb",
  language: "th",
};

function loadDesmos(apiKey: string): Promise<DesmosGlobal> {
  if (window.Desmos) return Promise.resolve(window.Desmos);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => {
        if (window.Desmos) resolve(window.Desmos);
      });
      existing.addEventListener("error", () => reject(new Error("โหลด Desmos ไม่สำเร็จ")));
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.desmos.com/api/v1.12/calculator.js?apiKey=${encodeURIComponent(apiKey)}&lang=th`;
    script.async = true;
    script.onload = () => {
      if (window.Desmos) resolve(window.Desmos);
      else reject(new Error("ไม่พบ Desmos หลังโหลดสคริปต์"));
    };
    script.onerror = () => reject(new Error("โหลด Desmos ไม่สำเร็จ"));
    document.head.appendChild(script);
  });
}

function parameterLatex(params: ParamValues) {
  return Object.entries(params)
    .filter(([key]) => key !== "x")
    .filter(([, value]) => typeof value === "number" && Number.isFinite(value))
    .map(([key, value]) => ({ id: key, latex: `${key}=${value}` }));
}

function runWithoutUndo(calculator: CalculatorInstance, callback: () => void) {
  if (calculator.withHistoryReplacement) {
    calculator.withHistoryReplacement(callback);
    return;
  }

  callback();
}

function scheduleResize(calculator: CalculatorInstance) {
  calculator.resize?.();
  window.requestAnimationFrame(() => {
    calculator.resize?.();
    window.requestAnimationFrame(() => calculator.resize?.());
  });
  window.setTimeout(() => calculator.resize?.(), 250);
}

function clearExpressions(calculator: CalculatorInstance) {
  const expressions = expressionIds.map((id) => ({ id }));
  if (calculator.removeExpressions) {
    calculator.removeExpressions(expressions);
    return;
  }

  expressions.forEach((expression) => calculator.removeExpression?.(expression));
}

function applyExpressions(
  calculator: CalculatorInstance,
  expressions: DesmosExpression[],
) {
  clearExpressions(calculator);
  if (calculator.setExpressions) {
    calculator.setExpressions(expressions);
    return;
  }

  expressions.forEach((expression) => {
    if (expression.latex) calculator.setExpression(expression as { id: string; latex: string });
  });
}

function getParameterBounds(key: string) {
  if (key === "x") return { min: "-5", max: "5", step: "1" };
  if (key === "m") return { min: "0", max: "20", step: "1" };
  if (key === "a") return { min: "-10", max: "10", step: "0.1" };
  if (key === "b") return { min: "-100", max: "100", step: "0.1" };
  if (key === "c" || key === "k") return { min: "-10", max: "10", step: "0.1" };
  return undefined;
}

function add2DExpressions(
  calculator: CalculatorInstance,
  lessonType: LessonType | undefined,
  latex: string | undefined,
  params: ParamValues,
) {
  const expressions: DesmosExpression[] = parameterLatex(params).map((expression) => ({
    ...expression,
    sliderBounds: getParameterBounds(expression.id),
  }));

  if (lessonType === "realFunction") {
    const x = params.x ?? 3;
    expressions.push({ id: "main", latex: "y=2x+1", color: "#2563eb", lineWidth: 4 });
    expressions.push({
      id: "point",
      latex: `\\left(${x},${2 * x + 1}\\right)`,
      color: "#f59e0b",
      lineWidth: 5,
    });
    applyExpressions(calculator, expressions);
    return;
  }

  if (lessonType === "verticalTest") {
    expressions.push({ id: "main", latex: "y=x^2", color: "#2563eb", lineWidth: 4 });
    expressions.push({ id: "non-function", latex: "x=y^2", color: "#e11d48", lineWidth: 4 });
    expressions.push({
      id: "test-line",
      latex: "x=k",
      color: "#f59e0b",
      lineStyle: window.Desmos?.Styles?.DASHED,
      lineWidth: 3,
    });
    applyExpressions(calculator, expressions);
    return;
  }

  if (latex) {
    expressions.push({ id: "main", latex, color: "#2563eb", lineWidth: 4 });
  }

  applyExpressions(calculator, expressions);
}

function get3DLatex(
  lessonType: LessonType | undefined,
  customExpression?: string,
): string | null {
  if (customExpression) {
    const trimmed = customExpression.trim();
    if (/^y\s*=/.test(trimmed)) return trimmed.replace(/^y\s*=/, "z=");
    if (/^z\s*=/.test(trimmed)) return trimmed;
    return null;
  }

  switch (lessonType) {
    case "realFunction":
      return "z=2x+1";
    case "linear":
      return "z=ax+b";
    case "linearApplication":
      return "z=mx+b";
    case "quadratic":
      return "z=a\\left(x^2+y^2\\right)+bx+c";
    case "exponential":
      return "z=a\\cdot b^x";
    default:
      return null;
  }
}

function get2DBounds(lessonType: LessonType | undefined, params: ParamValues) {
  if (lessonType === "linearApplication") {
    return { left: -1, right: 12, bottom: -10, top: 130 };
  }

  if (lessonType === "step") {
    return { left: -0.5, right: 5, bottom: 0, top: 90 };
  }

  if (lessonType === "verticalTest") {
    return { left: -4, right: 4, bottom: -5, top: 10 };
  }

  if (lessonType === "exponential") {
    return { left: -5, right: 5, bottom: -10, top: 20 };
  }

  return { left: -8, right: 8, bottom: -8, top: 8 };
}

function DesmosGraph({
  lessonType,
  latex,
  params = {},
  customExpression,
  customWarning,
}: DesmosGraphProps) {
  const apiKey = import.meta.env.VITE_DESMOS_API_KEY as string | undefined;
  const graph2DRef = useRef<HTMLDivElement | null>(null);
  const graph3DRef = useRef<HTMLDivElement | null>(null);
  const calculator2DRef = useRef<CalculatorInstance | null>(null);
  const calculator3DRef = useRef<CalculatorInstance | null>(null);
  const [activeTab, setActiveTab] = useState<"2d" | "3d">("2d");
  const [status2D, setStatus2D] = useState<GraphStatus>(apiKey ? "idle" : "error");
  const [status3D, setStatus3D] = useState<GraphStatus>(apiKey ? "idle" : "error");
  const [message2D, setMessage2D] = useState("");
  const [message3D, setMessage3D] = useState("");

  const hasApiKey = Boolean(apiKey && apiKey !== "YOUR_DESMOS_API_KEY_HERE");
  const expressionKey = useMemo(
    () => JSON.stringify({ lessonType, latex, params, customExpression }),
    [lessonType, latex, params, customExpression],
  );
  const latex3D = useMemo(
    () => get3DLatex(lessonType, customExpression),
    [lessonType, customExpression],
  );

  useEffect(() => {
    if (!hasApiKey || activeTab !== "2d" || !graph2DRef.current) return;

    let cancelled = false;
    setStatus2D("loading");
    setMessage2D("กำลังโหลด Desmos...");

    loadDesmos(apiKey!)
      .then((desmos) => {
        if (cancelled || !graph2DRef.current) return;

        if (!calculator2DRef.current) {
          calculator2DRef.current = desmos.GraphingCalculator(graph2DRef.current, {
            ...sharedOptions,
            expressions: false,
            graphDescription: "กราฟสองมิติของฟังก์ชันในบทเรียนปัจจุบัน",
          });
        }

        calculator2DRef.current.updateSettings?.({ language: "th", projectorMode: true });
        scheduleResize(calculator2DRef.current);

        setStatus2D("ready");
        setMessage2D("");
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setStatus2D("error");
        setMessage2D(error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, apiKey, hasApiKey]);

  useEffect(() => {
    if (!hasApiKey || activeTab !== "3d" || !graph3DRef.current) return;

    let cancelled = false;
    setStatus3D("loading");
    setMessage3D("กำลังโหลด Desmos 3D...");

    loadDesmos(apiKey!)
      .then((desmos) => {
        if (cancelled || !graph3DRef.current) return;

        if (!desmos.Calculator3D) {
          setStatus3D("unsupported");
          setMessage3D("Desmos.Calculator3D ยังไม่พร้อมใน script ที่โหลด");
          return;
        }

        if (!calculator3DRef.current) {
          calculator3DRef.current = desmos.Calculator3D(graph3DRef.current, {
            ...sharedOptions,
            expressions: false,
            graphDescription: "กราฟสามมิติของฟังก์ชันในบทเรียนปัจจุบัน",
          });
        }

        calculator3DRef.current.updateSettings?.({ language: "th", projectorMode: true });
        scheduleResize(calculator3DRef.current);

        setStatus3D("ready");
        setMessage3D("");
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setStatus3D("error");
        setMessage3D(error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, apiKey, hasApiKey]);

  useEffect(() => {
    if (!calculator2DRef.current || activeTab !== "2d" || status2D !== "ready") return;

    try {
      const calculator = calculator2DRef.current;

      runWithoutUndo(calculator, () => {
        if (customExpression) {
          applyExpressions(calculator, [
            { id: "custom", latex: customExpression, color: "#38bdf8", lineWidth: 4 },
          ]);
        } else {
          add2DExpressions(calculator, lessonType, latex, params);
          calculator.setMathBounds?.(get2DBounds(lessonType, params));
        }
        scheduleResize(calculator);
      });
    } catch {
      setMessage2D("สมการนี้ยังไม่สามารถแสดงผลได้ กรุณาตรวจรูปแบบอีกครั้ง");
    }
  }, [activeTab, expressionKey, customExpression, latex, lessonType, params, status2D]);

  useEffect(() => {
    if (!calculator3DRef.current || activeTab !== "3d" || status3D !== "ready" || !latex3D) return;

    try {
      const calculator = calculator3DRef.current;
      runWithoutUndo(calculator, () => {
        applyExpressions(calculator, [
          ...parameterLatex(params).map((expression) => ({
            ...expression,
            sliderBounds: getParameterBounds(expression.id),
          })),
          {
            id: "surface",
            latex: latex3D,
            color: "#38bdf8",
          },
        ]);
        scheduleResize(calculator);
      });
    } catch {
      setMessage3D("สมการ 3D นี้ยังไม่สามารถแสดงผลได้ กรุณาลองสมการรูปแบบอื่น");
    }
  }, [activeTab, expressionKey, latex3D, params, status3D]);

  useEffect(() => {
    return () => {
      calculator2DRef.current?.destroy();
      calculator3DRef.current?.destroy();
      calculator2DRef.current = null;
      calculator3DRef.current = null;
    };
  }, []);

  return (
    <section className="graph-card">
      <div className="graph-toolbar">
        <div>
          <h3>กราฟฟังก์ชัน</h3>
          <span>ปรับค่าแล้วดูรูปกราฟเปลี่ยนทันที</span>
        </div>
        <div className="tab-switch" role="tablist" aria-label="เลือกมุมมองกราฟ">
          <button
            className={activeTab === "2d" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("2d")}
          >
            2D
          </button>
          <button
            className={activeTab === "3d" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("3d")}
          >
            3D
          </button>
        </div>
      </div>

      <div className={activeTab === "2d" ? "graph-panel" : "graph-panel graph-panel-hidden"}>
          {!hasApiKey && (
            <div className="graph-state">
              <TriangleAlert size={28} />
              <strong>ยังไม่ได้ตั้งค่า Desmos API Key</strong>
              <p>กรุณาเพิ่ม VITE_DESMOS_API_KEY ในไฟล์ .env.local</p>
            </div>
          )}

          {hasApiKey && status2D === "loading" && (
            <div className="graph-state">
              <div className="loading-dot" />
              <strong>{message2D}</strong>
              <p>กราฟจะปรากฏในอีกสักครู่</p>
            </div>
          )}

          {hasApiKey && status2D === "error" && (
            <div className="graph-state">
              <TriangleAlert size={28} />
              <strong>ไม่สามารถโหลด Desmos ได้</strong>
              <p>{message2D || "กรุณาตรวจ API Key หรือการเชื่อมต่ออินเทอร์เน็ต"}</p>
            </div>
          )}

          <div
            ref={graph2DRef}
            className={
              hasApiKey && status2D !== "error" ? "desmos-canvas" : "desmos-canvas hidden"
            }
          />

          {customWarning && <p className="custom-warning">{customWarning}</p>}
      </div>

      <div className={activeTab === "3d" ? "graph-panel" : "graph-panel graph-panel-hidden"}>
          {!hasApiKey && (
            <div className="graph-state graph-state-3d">
              <TriangleAlert size={28} />
              <strong>ยังไม่ได้ตั้งค่า Desmos API Key</strong>
              <p>กรุณาเพิ่ม VITE_DESMOS_API_KEY ในไฟล์ .env.local เพื่อใช้มุมมอง 3D</p>
            </div>
          )}

          {hasApiKey && !latex3D && (
            <div className="graph-state graph-state-3d">
              <Box size={32} />
              <strong>มุมมอง 3D</strong>
              <p>มุมมอง 3D ใช้เพื่อจินตนาการกราฟเป็นพื้นผิวหรือเส้นทางในอวกาศ</p>
            </div>
          )}

          {hasApiKey && latex3D && status3D === "loading" && (
            <div className="graph-state graph-state-3d">
              <div className="loading-dot" />
              <strong>{message3D}</strong>
              <p>กำลังเตรียมเครื่องคิดเลข 3D</p>
            </div>
          )}

          {hasApiKey && latex3D && (status3D === "error" || status3D === "unsupported") && (
            <div className="graph-state graph-state-3d">
              <TriangleAlert size={28} />
              <strong>ยังไม่สามารถเปิด Desmos 3D ได้</strong>
              <p>
                {message3D ||
                  "มุมมอง 3D ใช้เพื่อจินตนาการกราฟเป็นพื้นผิวหรือเส้นทางในอวกาศ"}
              </p>
            </div>
          )}

          <div
            ref={graph3DRef}
            className={
              hasApiKey && latex3D && status3D !== "error" && status3D !== "unsupported"
                ? "desmos-canvas"
                : "desmos-canvas hidden"
            }
          />
      </div>
    </section>
  );
}

export default DesmosGraph;
