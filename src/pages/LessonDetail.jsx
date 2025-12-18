import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function LessonDetail() {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      const { data: lessonData, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setLesson(lessonData);

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("lesson_id", lessonId);

      setQuestions(questionsData || []);
      setLoading(false);
    };

    fetchLesson();
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
        ❌ الدرس غير موجود
      </div>
    );

  // 🎥 استخراج ID فيديو يوتيوب
  const videoId =
    lesson.youtube_url?.includes("youtube")
      ? lesson.youtube_url.split("v=")[1]?.split("&")[0]
      : null;

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">

        {/* عنوان الدرس */}
        <h1 className="text-center mb-3">{lesson.title}</h1>

        <p className="text-center text-secondary mb-4">
          {lesson.description}
        </p>

        {/* صورة أو فيديو */}
        {videoId ? (
          <iframe
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={lesson.title}
            className="rounded shadow mb-4"
            allowFullScreen
          />
        ) : (
          <img
            src={lesson.image_url || "/images/default.png"}
            alt={lesson.title}
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: "420px", objectFit: "cover" }}
          />
        )}

        {/* الأزرار */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">

          {lesson.pdf_url && (
            <a
              href={lesson.pdf_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-danger px-4"
            >
              🎬 مشاهدة على يوتيوب
            </a>
          )}

          {lesson.pdf_url && (
            <a
              href={lesson.pdf_link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-success px-4"
            >
              📄 تحميل PDF
            </a>
          )}

          <Link
            to={`/lesson/${lesson.id}/questions`}
            className="btn btn-outline-info"
          >
            📝 الأسئلة
          </Link>


          <Link
            to={`/course/${lesson.course_id}`}
            className="btn btn-outline-secondary px-4"
          >
            🔙 الرجوع للكورس
          </Link>

        </div>

        {/* عدد الأسئلة */}
        {questions.length > 0 && (
          <p className="text-center text-secondary">
            عدد الأسئلة: {questions.length}
          </p>
        )}

      </div>
    </div>
  );
}
