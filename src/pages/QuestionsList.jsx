import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function QuestionsList() {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lessonPoints, setLessonPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("lesson_id", lessonId);

      const { data: lessonPointsData } = await supabase
        .from("user_lesson_points")
        .select("points")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .single();

      setLesson(lessonData);
      setQuestions(questionsData || []);
      setLessonPoints(lessonPointsData?.points || 0);
      setLoading(false);
    };

    fetchData();
  }, [lessonId]);

  if (loading) return <div className="text-center text-light">⏳ جاري التحميل...</div>;

  const question = questions[currentQuestion];

  const handleAnswer = async (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const correct = option === question.correct_option;
    setIsCorrect(correct);

    if (!correct) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newPoints = lessonPoints + 10;
    setLessonPoints(newPoints);

    await supabase.from("user_lesson_points").upsert(
      {
        user_id: user.id,
        lesson_id: lesson.id,
        course_id: lesson.course_id,
        points: newPoints,
      },
      { onConflict: ["user_id", "lesson_id"] }
    );
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container text-center">
        <h2>🎯 {lesson.title}</h2>

        <div className="bg-black p-4 rounded shadow mt-4">
          <h4>{question.question}</h4>

          <div className="d-grid gap-3 mt-4">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`btn ${
                  selectedAnswer
                    ? opt === question.correct_option
                      ? "btn-success"
                      : opt === selectedAnswer
                      ? "btn-danger"
                      : "btn-outline-light"
                    : "btn-outline-light"
                }`}
                disabled={!!selectedAnswer}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div className="mt-4">
              {currentQuestion < questions.length - 1 ? (
                <button className="btn btn-warning" onClick={handleNext}>
                  ▶️ السؤال التالي
                </button>
              ) : (
                <Link to={`/course/${lesson.course_id}`} className="btn btn-info">
                  🏁 إنهاء والعودة للكورس
                </Link>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 fs-5">
          🏅 نقاطك في هذا الدرس: <span className="text-warning">{lessonPoints}</span>
        </p>
      </div>
    </div>
  );
}
