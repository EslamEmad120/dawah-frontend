import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function QuestionsList() {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [points, setPoints] = useState(0);

  // 🔹 تحميل الدرس + الأسئلة
  useEffect(() => {
    const fetchData = async () => {
      // الدرس
      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      // الأسئلة
      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("lesson_id", lessonId);

      setLesson(lessonData);
      setQuestions(questionsData || []);
      setLoading(false);
    };

    fetchData();
  }, [lessonId]);

  if (loading)
    return (
      <div className="bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
        ⏳ جاري التحميل...
      </div>
    );

  if (!lesson)
    return (
      <div className="bg-dark text-danger min-vh-100 d-flex align-items-center justify-content-center">
        ❌ لم يتم العثور على الدرس
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="bg-dark text-warning min-vh-100 d-flex align-items-center justify-content-center">
        🚫 لا توجد أسئلة لهذا الدرس
      </div>
    );

  const question = questions[currentQuestion];

  // ✅ اختيار إجابة
  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const correct = option === question.correct_option;
    setIsCorrect(correct);

    if (correct) setPoints((prev) => prev + 10);
  };

  // ▶️ السؤال التالي
  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">

        {/* عنوان */}
        <h2 className="text-center mb-2">🎯 {lesson.title}</h2>
        <p className="text-center text-secondary mb-4">
          السؤال {currentQuestion + 1} من {questions.length}
        </p>

        {/* صندوق السؤال */}
        <div className="bg-black p-4 rounded-4 shadow-lg text-center">

          <h4 className="mb-4">{question.question}</h4>

          <div className="d-grid gap-3">
            {question.options.map((opt, index) => {
              let btnClass = "btn btn-outline-light";

              if (selectedAnswer) {
                if (opt === question.correct_option)
                  btnClass = "btn btn-success";
                else if (opt === selectedAnswer)
                  btnClass = "btn btn-danger";
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  disabled={!!selectedAnswer}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* النتيجة */}
          {selectedAnswer && (
            <div className="mt-4">
              {isCorrect ? (
                <p className="text-success fw-bold">✅ إجابة صحيحة</p>
              ) : (
                <p className="text-danger fw-bold">❌ إجابة خاطئة</p>
              )}

              {currentQuestion < questions.length - 1 ? (
                <button
                  className="btn btn-outline-warning mt-3"
                  onClick={handleNext}
                >
                  ▶️ السؤال التالي
                </button>
              ) : (
                <Link
                  to={`/course/${lesson.course_id}`}
                  className="btn btn-outline-info mt-3"
                >
                  🏁 إنهاء والعودة للكورس
                </Link>
              )}
            </div>
          )}
        </div>

        {/* النقاط */}
        <div className="text-center mt-4">
          <p className="fs-5">🏅 نقاطك في هذا الدرس: {points}</p>
        </div>
      </div>
    </div>
  );
}
