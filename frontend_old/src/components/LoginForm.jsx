import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure this package is installed: npm install jwt-decode

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if token exists and redirect to /dashboard
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        // Decode the token to check its contents
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        navigate("/dashboard");
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("jwtToken"); // Remove invalid token
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("JWT Token:", token);

        // Decode the token
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        const userId = decoded.user_id;
        console.log("User ID:", userId);

        localStorage.setItem("jwtToken", token);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form font-lato w-[50%] mt-[100px] m-auto rounded-lg p-4 shadow-lg">
      <h1 className="text-2xl font-semibold w-fit m-auto">Welcome Back 👋</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-[100%] bg-blue-400 text-white text-lg font-semibold mt-3 py-2 px-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
