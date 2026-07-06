import { ArrowRight } from "lucide-react";
import type { Lesson } from "../data/lessons";

type LessonCardProps = {
  lesson: Lesson;
  onSelect: () => void;
};

const previewPaths: Record<Lesson["type"], string[]> = {
  concept: ["M44 62 L86 62", "M44 118 L86 118", "M130 62 L172 62", "M130 118 L172 118"],
  domainRange: ["M32 132 C68 48 150 48 190 132"],
  mappingAB: ["M44 58 L172 42", "M44 104 L172 104", "M44 136 L172 104"],
  realFunction: ["M28 130 L190 38"],
  verticalTest: ["M110 26 L110 138", "M36 132 C76 40 150 40 190 132"],
  linear: ["M28 132 L190 38"],
  linearApplication: ["M28 132 L190 62"],
  quadratic: ["M28 132 C68 34 150 34 190 132"],
  step: ["M30 124 L76 124 L76 98 L122 98 L122 72 L168 72 L168 48 L196 48"],
  exponential: ["M30 130 C88 128 132 108 190 38"],
  custom: ["M28 112 C54 42 78 144 106 82 C134 18 160 126 192 44"],
};

function LessonPreview({ lesson }: { lesson: Lesson }) {
  const paths = previewPaths[lesson.type];

  return (
    <span className={`lesson-preview lesson-preview-${lesson.type}`} aria-hidden="true">
      <span className="lesson-preview-canvas">
        <svg viewBox="0 0 220 160">
          <line className="preview-axis" x1="22" x2="200" y1="126" y2="126" />
          <line className="preview-axis" x1="46" x2="46" y1="24" y2="140" />
          {lesson.type === "step" && (
            <>
              <circle className="preview-node" cx="76" cy="124" r="5" />
              <circle className="preview-node accent" cx="76" cy="98" r="5" />
              <circle className="preview-node" cx="122" cy="98" r="5" />
              <circle className="preview-node accent" cx="122" cy="72" r="5" />
            </>
          )}
          {(lesson.type === "concept" || lesson.type === "mappingAB") && (
            <>
              <circle className="preview-node" cx="42" cy="62" r="8" />
              <circle className="preview-node" cx="42" cy="118" r="8" />
              <circle className="preview-node accent" cx="178" cy="62" r="8" />
              <circle className="preview-node accent" cx="178" cy="118" r="8" />
            </>
          )}
          {paths.map((path, index) => (
            <path
              className={`preview-path ${index > 0 ? "preview-path-secondary" : ""}`}
              d={path}
              key={path}
            />
          ))}
          {lesson.type !== "concept" && lesson.type !== "mappingAB" && (
            <circle className="preview-pulse" cx="110" cy="82" r="5" />
          )}
        </svg>
      </span>
      <span className="lesson-preview-formula">{lesson.formula}</span>
    </span>
  );
}

function LessonCard({ lesson, onSelect }: LessonCardProps) {
  return (
    <button className={`lesson-card lesson-card-${lesson.type}`} type="button" onClick={onSelect}>
      <span className="lesson-card-topline">
        <span className="lesson-order">บทที่ {lesson.order}</span>
        <span className="lesson-icon" aria-hidden="true">
          {lesson.icon}
        </span>
      </span>
      <LessonPreview lesson={lesson} />
      <span className="lesson-title">{lesson.title}</span>
      <span className="lesson-badge">{lesson.badge}</span>
      <span className="lesson-description">{lesson.cardDescription}</span>
      <span className="lesson-link">
        เปิดบทเรียน <ArrowRight size={16} />
      </span>
    </button>
  );
}

export default LessonCard;
