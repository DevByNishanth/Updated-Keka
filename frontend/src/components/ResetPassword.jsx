import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
// Make sure you import icons from an icon library like react-icons or your custom icons
import { User, Eye, EyeOff, Lock, Mail, Key, CodeSquare } from "lucide-react"; // Example import, replace with your icons
import ReEnterPasswordBg from "../assets/re-enter-bg.svg";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/store";
import axios from "axios";
const ResetPassword = () => {
  const { globalEmail, globalOtp, globalUserName, setGlobalUserName } =
    useContext(Data);
  const navigate = useNavigate();

  // State hooks for password and re-enter password
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "email : ",
      globalEmail,
      "OTP : ",
      globalOtp,
      "New Password : ",
      newPassword,
      "UserName who is sending request to reset password : ",
      globalUserName
    );
    // Handle form submission logic here
    if (newPassword === reEnterPassword) {
      console.log("Passwords match. Submitting...");
      // You can add form submission logic here.
    } else {
      alert("Passwords do not match");
    }
    axios
      .post("http://127.0.0.1:8000/api/reset/", {
        email: globalEmail,
        otp: globalOtp,
        new_password: newPassword,
        userName: globalUserName,
      })
      .then((response) => {
        console.log(response.data);
      });
    //redirecting to login page again
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div className="lato flex  justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center bg-white">
          {/* Left Side - Form */}
          <div className="p-8 h-fit mt-[50px]">
            <div className="mb-8 logo">
              <img src={logo} className="w-[140px]" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-2">
                Reset Password
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block text-lg font-semibold text-gray-700"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block outline-none w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter new password"
                    // required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="reEnterPassword"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Re-Enter New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="reEnterPassword"
                    type={showPassword ? "text" : "password"}
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="block outline-none w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Re-enter your new password"
                    // required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2986CE] text-white py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-semibold text-lg"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block h-[139.3%] bg-[#2986CE]">
            <div className="h-full flex items-center justify-center">
              <img
                src={ReEnterPasswordBg}
                alt="Reset Password Illustration"
                className="w-[70%] h-[80%]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
