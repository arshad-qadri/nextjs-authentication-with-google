"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

let client_id = process.env.NEXT_PUBLIC_CLIENT_ID;

const page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSignin = (res) => {
    if (res.credential) {
      let fData = {
        email: "eve.holt@reqres.in",
        password: "pistol",
      };

      axios
        .post("https://reqres.in/api/login", fData)
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", res.credential);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    google?.accounts.id.initialize({
      client_id: client_id,
      callback: handleSignin,
    });
    google?.accounts.id.renderButton(document.getElementById("signInBtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/login", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                value={formData.password}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register.
          </Link>
        </p>
        <div className="w-full border-t-2 border-gray-200 h-6 mt-10 relative ">
          <div className="absolute left-1/2 -top-1/2 bg-white p-2 -translate-y-1/4 -translate-x-1/2 ">
            OR
          </div>
        </div>

        <div id="signInBtn" className="w-full"></div>
      </div>
    </div>
  );
};

export default page;
