import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #111827, #1f2933)",
      }}
    >
      <form
        onSubmit={handleRegister}
        className="p-4 rounded-4 shadow-lg text-light"
        style={{
          width: "380px",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "60px",
              height: "60px",
              background: "#198754",
              fontSize: "26px",
            }}
          >
            📝
          </div>
          <h4 className="fw-bold">إنشاء حساب جديد</h4>
          <p className="text-secondary small mb-0">
            أنشئ حسابك وابدأ رحلتك
          </p>
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="mb-4">
          <label className="form-label small text-secondary">
            كلمة المرور
          </label>
          <input
            type="password"
            className="form-control bg-dark text-light border-0"
            placeholder="على الأقل 6 أحرف"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          className="btn btn-success w-100 py-2 fw-bold"
          style={{ letterSpacing: "1px" }}
        >
          تسجيل
        </button>

        <div className="text-center mt-3">
          <small className="text-secondary">
            لديك حساب بالفعل؟ سجل الدخول
          </small>
        </div>
      </form>
    </div>
  );
}
