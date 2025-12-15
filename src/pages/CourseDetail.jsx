import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase.js";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // جلب بيانات الكورس
    supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setCourse(data);
      });

    // جلب الدروس
    supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setLessons(data);
      });
  }, [courseId]);

  if (!course) return <h2>جاري التحميل...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <img
        src={course.image || "/images/default.png"}
        alt={course.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      />

      <h2 style={{ marginTop: "30px" }}>الدروس</h2>

<div className="row">
  {lessons.map((lesson) => (
    <div key={lesson.id} className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={lesson.image_url || "/images/default.png"}
          className="card-img-top"
          alt={lesson.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{lesson.title}</h5>
          <p className="card-text">{lesson.description}</p>
          <div className="mt-auto">
            <a
              href={lesson.pdf_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-info me-2"
            >
              مشاهدة الفيديو
            </a>
            <Link to={`/lesson/${lesson.id}`} className="btn btn-success">
              بدء الاختبار
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
