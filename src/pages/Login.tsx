import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });

  const loginUrl = `${import.meta.env.VITE_SERVER_URL}/api/login/`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

     localStorage.setItem("token", data.access);

// Save refresh token separately if you plan to implement refresh later
localStorage.setItem("refresh", data.refresh);

const user = {
  id: 1,
  name: "Test User",
  email: "test@gmail.com",
  role: "student" as const,
};

dispatch(login({ user, token: data.access }));

      toast.success(`Welcome back, ${user?.name} 👋`);

      // 👇 decide where to send the user
      const from = (location.state as any)?.from || "/profile";
      const joinUrl = (location.state as any)?.join_url;
      if (joinUrl) {
        // Open the practice URL in a new tab
        window.open(joinUrl, "_blank");
      }
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password 😶");
    } finally {
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)] px-4">
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Log In 🔐
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Log In
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-orange-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
           {" "}
          <Link to="/forgot-password" className="text-orange-500 hover:underline">
            Forgot Password
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
