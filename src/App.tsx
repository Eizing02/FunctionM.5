import { useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LessonCard from "./components/LessonCard";
import LessonView from "./components/LessonView";
import CustomEquationLab from "./components/CustomEquationLab";
import { lessons } from "./data/lessons";

function App() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? null,
    [activeLessonId],
  );

  const openHome = () => {
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openFirstLesson = () => openLesson(lessons[0].id);
  const openLab = () => openLesson("custom-lab");

  return (
    <div className="app-shell">
      <Header
        lessons={lessons}
        activeLessonId={activeLessonId}
        onHome={openHome}
        onSelectLesson={openLesson}
      />

      <main>
        {!activeLesson && (
          <>
            <Hero onStart={openFirstLesson} onOpenLab={openLab} />

            <section className="lesson-grid-section" id="lessons">
              <div className="section-heading">
                <p className="section-kicker">เลือกเส้นทางการเรียนรู้</p>
                <h2>สำรวจฟังก์ชันจากความหมายไปสู่กราฟจริง</h2>
                <p>
                  แต่ละบทออกแบบให้เห็นสูตร ค่าพารามิเตอร์ กราฟ และตารางค่าในมุมมองเดียว
                </p>
              </div>

              <div className="lesson-grid">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onSelect={() => openLesson(lesson.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeLesson?.type === "custom" && (
          <CustomEquationLab onBack={openHome} />
        )}

        {activeLesson && activeLesson.type !== "custom" && (
          <LessonView lesson={activeLesson} onBack={openHome} />
        )}
      </main>
    </div>
  );
}

export default App;
