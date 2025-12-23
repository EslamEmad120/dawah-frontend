import React, { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("courses")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setCourses(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-5">جاري التحميل...</h2>;

  return (
    <div className="bg-dark text-light min-vh-100">
      {/* ===== تعريف الشيخ ===== */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4">
            <img
              src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/courses/unnamed.jpg"
              alt="الشيخ علاء حامد"
              className="rounded-circle shadow"
              style={{
                width: "220px",
                height: "220px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-8">
            <h1 className="mb-3">المهندس علاء حامد</h1>
            <p className="lead text-secondary" >
              داعية إسلامي يقدّم دروسًا تفسيرية وتربوية في سور القرآن الكريم
              بأسلوب مبسط يناسب جميع الأعمار، مع التركيز على الفهم والعمل.
            </p>

            <div className="mt-3">
              <a
                href="https://www.youtube.com/@3laaHamed"
                target="_blank"
                rel="noreferrer"
                className="btn btn-danger me-2"
              >
                ▶ قناة يوتيوب
              </a>

              <a
                href="https://www.facebook.com/3laaHamed"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                📘 فيسبوك
              </a>

              <a
                href="/about"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success mx-2"
              >
                📘 تعريف بالشيخ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الكورسات ===== */}
      <div className="container pb-5">
        <h2 className="text-center mb-4">الدورات التعليمية</h2>

        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-light h-100 shadow border-secondary">
                <img
                  src={course.image || "/images/default.png"}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>

                  <Link
                    to={`/course/${course.id}`}
                    className="btn btn-outline-light w-100"
                  >
                    عرض الدروس
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
