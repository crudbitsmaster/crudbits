"use client";
import { useState } from "react";
const Signup = () => {
  const [username, setUsername] = useState(""); // Changed to username
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if the secret key is correct
    if (secret !== process.env.NEXT_PUBLIC_SECRET_KEY) {
      alert("Invalid secret key.");
      return; // Exit the function if the secret key is incorrect
    }

    // Prepare data for the API
    const adminData = {
      username, // Use username instead of email
      password,
    };

    try {
      const response = await fetch('/admin/api/signup', { // Ensure this endpoint is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'key': secret
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Admin added successfully: ${username}`);
        // Clear the form
        setUsername("");
        setPassword("");
        setSecret("");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Failed to sign up. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-slate-100">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign Up For Your Admin Account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5"
                placeholder="Your Username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="secret"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Secret Key
              </label>
              <input
                type="text"
                name="secret"
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Secret Key"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full font-bold text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
