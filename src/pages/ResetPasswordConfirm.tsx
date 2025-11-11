// ResetPasswordConfirm.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ new_password: "", confirm_password: "" });

  const resetUrl = `${import.meta.env.VITE_SERVER_URL}/api/reset-password/${uid}/${token}/`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch(resetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      toast.success("Password reset successful 🎉");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)] px-4">
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Reset Your Password 🔑
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="new_password"
            type="password"
            placeholder="New password"
            value={form.new_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            required
          />
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm password"
            value={form.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordConfirm;
