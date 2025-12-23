import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("❌ بيانات غير صحيحة");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <div
  className="min-vh-100 d-flex align-items-center justify-content-center"
  style={{ backgroundColor: "#0b0f1a" }}


    >
      <form
        onSubmit={handleLogin}
        className="p-4 rounded-4 shadow-lg text-light"
        style={{
          width: "380px",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center mb-4">
          <div
            className="mb-2 mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "60px",
              height: "60px",
              background: "#0d6efd",
              fontSize: "28px",
            }}
          >
            🔐
          </div>
          <h4 className="fw-bold">تسجيل الدخول</h4>
          <p className="text-secondary small mb-0">
            أدخل بياناتك للمتابعة
          </p>
        </div>

        <div className="mb-3">
          <label className="form-label small text-secondary">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            className="form-control bg-dark text-light border-0"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label small text-secondary">
            كلمة المرور
          </label>
          <input
            type="password"
            className="form-control bg-dark text-light border-0"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2 fw-bold"
          style={{ letterSpacing: "1px" }}
        >
          دخول
        </button>

        <div className="text-center mt-3">
          <small className="text-secondary">
            جميع الحقوق محفوظة ©
          </small>
        </div>
      </form>
    </div>
  );
}
