import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // نحاول تسجيل الدخول أولاً
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // إذا نجح تسجيل الدخول، انتقل إلى الصفحة الرئيسية
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // إذا لم يكن المستخدم موجودًا، نقوم بإنشائه
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/home"); // بعد إنشاء الحساب، انتقل إلى الصفحة الرئيسية
        } catch (createError) {
          console.error("Error creating account:", createError);
        }
      } else if (error.code === "auth/wrong-password") {
        alert("كلمة المرور غير صحيحة! يرجى المحاولة مرة أخرى.");
      } else {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Sign Up / Login</h2>
      <form className="flex flex-col" onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up / Login</button>
      </form>
    </div>
  );
};

export default Login;
