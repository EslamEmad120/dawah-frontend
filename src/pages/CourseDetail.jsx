import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function CourseDetail() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // 🔹 بيانات الكورس
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (courseError) {
        console.error(courseError);
        setLoading(false);
        return;
      }

      // 🔹 الدروس مرتبة
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      // 🔹 نقاط الدورة (محسوبة تلقائياً من DB)
      if (user) {
        const { data: coursePoints } = await supabase
          .from("user_course_points")
          .select("total_points")
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .single();

        setPoints(coursePoints?.total_points || 0);
      }

      setCourse(courseData);
      setLessons(lessonsData || []);
      setLoading(false);
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        ⏳ جاري التحميل...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-dark text-danger min-vh-100 d-flex justify-content-center align-items-center">
        ❌ لم يتم العثور على الكورس
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">

        {/* عنوان الكورس */}
        <h1 className="text-center mb-2">{course.title}</h1>
        <p className="text-center text-secondary">{course.description}</p>

        {/* نقاط الدورة */}
        <p className="text-center text-warning fs-5 mb-4">
          🏅 نقاطك في هذه الدورة: <strong>{points}</strong>
        </p>

        {/* صورة الكورس */}
        <img
          src={course.image}
          alt={course.title}
          className="img-fluid rounded mb-5 w-100"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />

        {/* الدروس */}
        <h2 className="text-center mb-4">📚 الدروس</h2>

        <div className="row">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-light h-100 border-secondary shadow">

                <img
                  src={lesson.image_url || "/images/default.png"}
                  className="card-img-top"
                  alt={lesson.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column text-center">
                  <h5>{lesson.title}</h5>
                  <p className="text-secondary small">{lesson.description}</p>

                  <Link
                    to={`/lesson/${lesson.id}`}
                    className="btn btn-outline-light mt-auto"
                  >
                    🎬 تفاصيل الدرس
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* رجوع */}
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-outline-secondary">
            🔙 العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
