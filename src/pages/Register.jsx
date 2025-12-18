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

    // المستخدم اتسجل
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center text-light">
      <form
        onSubmit={handleRegister}
        className="bg-black p-4 rounded shadow"
        style={{ width: "350px" }}
      >
        <h3 className="text-center mb-3">📝 إنشاء حساب</h3>

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
          placeholder="كلمة المرور (6+)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">تسجيل</button>
      </form>
    </div>
  );
}
