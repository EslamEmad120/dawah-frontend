import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function LessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setLesson(data);
        }
        setLoading(false);
      });
  }, [lessonId]);

  if (loading)
    return (
      <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        ⏳ جاري التحميل...
      </div>
    );

  if (!lesson)
    return (
      <div className="bg-dark text-danger min-vh-100 d-flex justify-content-center align-items-center">
        ❌ الدرس غير موجود
      </div>
    );

  // 🎥 استخراج ID فيديو يوتيوب من pdf_url
  const videoId =
    lesson.pdf_url?.includes("v=")
      ? lesson.pdf_url.split("v=")[1]?.split("&")[0]
      : null;

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">

        {/* عنوان الدرس */}
        <h1 className="text-center mb-3">{lesson.title}</h1>
        <p className="text-center text-secondary mb-4">
          {lesson.description}
        </p>

        {/* فيديو أو صورة */}
        {videoId ? (
          <iframe
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${videoId}`}
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
        <div className="d-flex flex-wrap justify-content-center gap-3">

          {/* مشاهدة على يوتيوب */}
          <a
            href={lesson.pdf_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-danger"
          >
            🎥 مشاهدة على يوتيوب
          </a>

          {/* تحميل الملخص */}
          <a
            href={lesson.pdf_link || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-success"
          >
            📄 تحميل ملخص PDF
          </a>

          {/* الأسئلة */}
          <Link
            to={`/lesson/${lesson.id}/questions`}
            className="btn btn-outline-info"
          >
            📝 الأسئلة
          </Link>

          {/* الرجوع */}
          <Link
            to={`/course/${lesson.course_id}`}
            className="btn btn-outline-secondary"
          >
            🔙 الرجوع للكورس
          </Link>
        </div>
      </div>
    </div>
  );
}
