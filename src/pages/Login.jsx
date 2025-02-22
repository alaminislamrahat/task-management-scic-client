import React, { useContext } from "react";
import { FormContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { googleLogin, user, setUser } = useContext(FormContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        setUser(res.user);
        navigate("/dashboard/add-task");
        const obj = {
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        return axios.post(`${import.meta.env.VITE_URL}/user`, obj);
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center min-h-screen px-6 py-8 border-4 border-teal-600 rounded-2xl shadow-2xl bg-white">
      <h1 className="text-5xl font-extrabold text-black text-center w-full px-6 mb-4">
        Welcome to <span className="text-teal-600">Task Master</span>
      </h1>
      <p className="text-lg text-gray-700 text-center w-full px-6 max-w-md mb-6">
        Boost your productivity, organize tasks efficiently, and manage your workflow like a pro.
      </p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 px-8 py-4 rounded-xl bg-teal-600 text-white text-lg font-semibold shadow-lg hover:bg-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-6 h-6 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
