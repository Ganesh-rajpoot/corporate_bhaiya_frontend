// ForgotPassword.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotUrl = `${import.meta.env.VITE_SERVER_URL}/api/forgot-password/`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(forgotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      toast.success("Password reset link sent to your email 📩");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
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
          Forgot Password?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
