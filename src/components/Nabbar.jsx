import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">

        {/* 🔹 اللوجو */}
        <Link className="navbar-brand fw-bold" to="/">
          🎓 منصة الشيخ علاء حامد
        </Link>

        

        <div className="collapse navbar-collapse justify-content-end">
          {user ? (
            <div className="d-flex align-items-center gap-3">


              {/* 👤 المستخدم */}
              <Link
                to="/profile"
                className="text-light text-decoration-none fw-bold"
              >
                👋 {user.email}
              </Link>


              {/* 🚪 تسجيل خروج */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn btn-outline-success btn-sm">
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
