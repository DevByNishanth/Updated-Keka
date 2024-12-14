import React, { useContext, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/store";
import forgotBg from "../assets/forgot-bg.svg";
import axios from "axios";
const ForgotPassword = () => {
  const { globalEmail, setGlobalEmail } = useContext(Data);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  function handleGetOtpAndRedirect(e) {
    e.preventDefault();
    //Post endpoint comes here
    axios
      .post("http://127.0.0.1:8000/api/forgot/", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error during passoword reset : ", error);
      });
    setGlobalEmail(email);
    //redirecting to next page
    setTimeout(() => {
      navigate("/enterOtp");
    }, [1000]);
  }

  return (
    <>
      <div className=" lato  flex  justify-center ">
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 items-center bg-white  ">
          {/* Left Side - Form */}
          <div className="p-8 h-fit ">
            <div className="mb-8 logo">
              <img src={logo} className="w-[140px]" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-2">
                Forgot Password
              </h2>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-700"
                >
                  E-mail Id
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="block outline-none w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your Email-Id"
                    required
                  />
                </div>
              </div>
              <button
                onClick={handleGetOtpAndRedirect}
                className="w-full bg-[#2986CE] text-white py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-semibold text-lg"
              >
                Get OTP
              </button>
            </form>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block h-[123.4%]  bg-[#2986CE]     ">
            <div className="h-full flex items-center justify-center">
              <img
                src={forgotBg}
                alt="Login illustration"
                className="w-[70%] h-[80%] "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
