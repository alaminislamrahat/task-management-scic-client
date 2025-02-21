import React, { useContext } from "react";
import { FormContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import axios  from 'axios';
const Login = () => {
  const { googleLogin, user, setUser } = useContext(FormContext);
  const navigate = useNavigate();

  const handelGoogleLogin = () => {
    googleLogin().then((res) => {
      setUser(res.user);
        navigate("/dashboard/add-task");
        const obj = {
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL,
        }
        axios.post(`${import.meta.env.VITE_URL}/user`, obj)
            .then(res => {
            console.log(res.data)
        })
    });
  };
  return (
    <div className="max-w-3xl mx-auto lg:mt-20 md:mt-12 mt-5 grid place-items-center space-y-2">
      <h1 className="text-3xl">
        Welcome to{" "}
        <span className="font-semibold text-green-500">PlanSwift </span>
      </h1>
      <p className="w-1/2 text-center">
        Stay organized, boost productivity, and manage your tasks effortlessly.
        Lets turn your to-do list into done! 🚀
      </p>
      <button
        onClick={handelGoogleLogin}
        className="flex cursor-pointer h-10 w- items-center justify-center gap-1 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="size-6 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        SIGN IN WITH GOOGLE
      </button>
    </div>
  );
};

export default Login;
