import { FlaskConical } from "lucide-react";
import type { Lesson } from "../data/lessons";

type HeaderProps = {
  lessons: Lesson[];
  activeLessonId: string | null;
  onHome: () => void;
  onSelectLesson: (lessonId: string) => void;
};

function Header({ lessons, activeLessonId, onHome, onSelectLesson }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={onHome}>
        <span className="brand-mark" aria-hidden="true">
          <img className="brand-logo-mark" src="/naita-math-logo-transparent.png" alt="" />
        </span>
        <span className="brand-title">ง่ายๆ กับฟังก์ชัน</span>
      </button>

      <nav className="lesson-nav" aria-label="เมนูบทเรียน">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className={lesson.id === activeLessonId ? "nav-chip active" : "nav-chip"}
            type="button"
            onClick={() => onSelectLesson(lesson.id)}
          >
            {lesson.type === "custom" && <FlaskConical size={15} />}
            <span>{lesson.shortTitle}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
