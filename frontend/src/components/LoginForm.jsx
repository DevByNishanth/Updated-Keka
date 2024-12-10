import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/store";
const LoginForm = () => {
  const { userName, setUserName} = useContext(Data)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setUserName(username)
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      console.log("Name :", username)
     
      const token = response.data.token;
     // Assuming the token is in `response.data.token`
      console.log("Token from backend:", token);
      localStorage.setItem("jwtToken", token); // Save token in local storage
      
      if(token){
        navigate("/dashboard");
        window.location.reload()
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <>
      <div className="form font-lato w-[50%] mt-[100px] m-auto rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl font-semibold w-fit m-auto">Welcome Back 👋</h1>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mt-3 w-[100%] text-lg rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-btn">
          <button
            className="w-[100%] bg-blue-400 text-white text-lg font-semibold mt-3 py-2 px-3 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
