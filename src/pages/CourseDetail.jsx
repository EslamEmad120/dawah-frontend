import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase.js";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      setCourse(courseData);
      setLessons(lessonsData || []);
      setLoading(false);
    };

    fetchData();
  }, [courseId]);

  if (loading)
    return (
      <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        ⏳ جاري التحميل...
      </div>
    );

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center mb-3">{course.title}</h1>
        <p className="text-center text-secondary mb-4">
          {course.description}
        </p>

        <img
          src={course.image}
          alt={course.title}
          className="img-fluid rounded mb-5 w-100"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />

        <h2 className="text-center mb-4">📚 الدروس</h2>

        <div className="row">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-light h-100 shadow border-secondary">
                <img
                  src={lesson.image_url || "/images/default.png"}
                  className="card-img-top"
                  alt={lesson.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column text-center">
                  <h5>{lesson.title}</h5>
                  <p className="text-secondary small">
                    {lesson.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/lesson/${lesson.id}`}
                      state={{ lesson }}
                      className="btn btn-outline-light w-100"
                    >
                      🎬 تفاصيل الدرس
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="btn btn-outline-secondary">
            🔙 العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
