"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import GoogleAuth from "../GoogleAuth";

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.ok) {
      Swal.fire("Success", "Logged in successfully!", "success");
      setTimeout(() => router.push("/"), 800);
    } else {
      Swal.fire("Error", res.error || "Invalid credentials", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="p-6">
          {/* Header with Logo */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="text-white font-bold text-lg">NS</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-sm mt-1">
              Sign in to your NearServe account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md mt-2"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-xs">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <GoogleAuth />
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;