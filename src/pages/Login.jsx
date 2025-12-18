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
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center text-light">
      <form
        onSubmit={handleLogin}
        className="bg-black p-4 rounded shadow"
        style={{ width: "350px" }}
      >
        <h3 className="text-center mb-3">🔐 تسجيل الدخول</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">دخول</button>
      </form>
    </div>
  );
}
