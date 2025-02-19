import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, createUserWithEmailAndPassword, db } from "../firebase";
import { doc, setDoc } from "../firebase";
import axios from "axios";
import { setUser } from "../slices/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // حفظ بيانات المستخدم في Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
      });

      // إرسال البيانات إلى API باستخدام Axios (اختياري)
    //   await axios.post("https://your-api-endpoint.com/users", {
    //     uid: user.uid,
    //     name,
    //     email,
    //   });

      // تحديث حالة المستخدم في Redux Store
      dispatch(setUser({ uid: user.uid, name, email }));

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form className="flex flex-col" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
