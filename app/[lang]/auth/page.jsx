"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [showDom, setShowDom] = useState("false");

  const handleSignIn = async () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        position: "top-right",
      });
      return;
    }

    const promise = axios.post(
      `${baseURL}login/`,
      {
        username: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.promise(promise, {
      loading: "Signing in...",
      success: (response) => {
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("token", data.token);
          window.location.assign("/dashboard");
          return "Signed in successfully!";
        } else {
          return "Login failed. Please check your credentials.";
        }
      },
      error: (error) => {
        console.error("Error during sign-in:", error);
        return "An error occurred during sign-in";
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  useEffect(() => {
    setShowDom(false);

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setShowDom(false);

      window.location.assign("/dashboard");
    } else {
      setShowDom(true);
    }
  }, []);

  return (
    <>
      {showDom ? (
        <div className="flex md:flex-row flex-col min-h-screen w-full">
          <div
            className="bg-cover z-10 h-screen md:w-1/2 w-full md:block hidden"
            style={{ backgroundImage: `url('/login.png')` }}
          >
            {/* Add a check to see if the image is loading */}
            <div className="flex flex-col height-full items-start p-4">
              <div className="flex flex-row items-start justify-center mt-6 gap-2">
                <Image
                  src={`/hen-logo.png`}
                  width={45}
                  height={45}
                  alt="logout"
                />
                <p className=" w-1/2 text-[#7398FC] font-[26px] mt-1 ">
                  Feed Formulation
                </p>
              </div>
              <p className="mt-6 text-[#7398FC] font-[26px] ml-6">
                Elevate Livestock Care With Our Feed Options
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full bg-[#242449] min-h-screen flex flex-col items-center justify-center">
            <div className="bg-[#161630] rounded-full flex items-center justify-center w-[80px] h-[80px] p-4 border border-[#7398FC] ">
              <Image
                src={`/hen-logo.png`}
                width={35}
                height={35}
                alt="logout"
              />
            </div>
            <div className="flex flex-col items-center gap-4 w-full mt-4">
              <div
                className="flex flex-col md:items-start items-center gap-4 md:w-1/2 w-11/12"
               >
                <p className="text-[#7398FC] text-2xl font-semibold">Login </p>
                <input
                  placeholder="username"
                  className="md:w-full w-11/12 bg-[#161630] text-[#868686] p-2 rounded-[10px]"
                  type="text"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <input
                  placeholder="password"
                  className="md:w-full w-11/12 bg-[#161630] text-[#868686] p-2 rounded-[10px]"
                  type="password"
                  value={password}
                  onChange={(e) => Setpassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="md:w-1/2 w-10/12 flex flex-row justify-end items-end">
                <p className="text-[#868686] text-[16px]">Forgot Password?</p>
              </div>
              <button
                onClick={handleSignIn}
                className="w-1/2 p-2 bg-[#39396A] text-[#F8F8F8] rounded-[10px] hover:bg-gray-800 hover:text-white"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Login;
