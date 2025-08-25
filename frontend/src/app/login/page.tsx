"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      const userRes = await fetch("http://localhost:5000/api/v1/user", {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      const userData = await userRes.json();

      if (userRes.ok) {
        localStorage.setItem("userName", userData.name);
        window.dispatchEvent(new Event("storage"));
        toast.success(`Welcome back, ${userData.name}! 🎉`);
        router.push("/");
      } else {
        throw new Error(userData.message || "Failed to get user data");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <section className="bg-gradient-to-r from-[#8d9c57] via-[#f5c3e4] to-[#e4fdfa]">
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#5d6f3e]">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c83f8d] focus:border-[#c83f8d] sm:text-sm text-[#5d6f3e]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c83f8d] focus:border-[#c83f8d] sm:text-sm text-[#5d6f3e]"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5d6f3e] hover:bg-[#8d9c57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c83f8d] disabled:opacity-50"
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#c83f8d] hover:text-[#966d7e]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </section>
  );
};

export default LoginPage;
