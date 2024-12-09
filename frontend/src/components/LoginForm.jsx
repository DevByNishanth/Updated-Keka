import React from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="form font-lato w-[50%] mt-[100px] m-auto rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl font-semibold w-fit m-auto">Welcome Back 👋</h1>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
        />
        <div
          className="login-btn"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <button className="w-[100%] bg-blue-400 text-white text-lg font-semibold mt-3 py-2 px-3 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
