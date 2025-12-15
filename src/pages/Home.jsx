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
        else setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-5">جاري التحميل...</h2>;

  return (
    <div className="bg-dark text-light min-vh-100 p-4">
      <div className="text-center mb-5">
        <h1>منصة الشيخ علاء حامد</h1>
        <p className="lead">
          دروس وشرح لسور القرآن الكريم يقدمها الشيخ علاء حامد
        </p>
      </div>

      <div className="container">
        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={course.image || "/images/default.png"}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <Link
                    to={`/course/${course.id}`}
                    className="btn btn-primary mt-2"
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
