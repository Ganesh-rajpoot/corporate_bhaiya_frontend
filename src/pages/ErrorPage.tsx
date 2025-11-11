import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden relative">
        {/* Spinning Planet */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full opacity-30"
        />

        {/* Floating Text */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold"
        >
          Something awesome is on the way!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-2xl text-center px-6"
        >
          It’s not quite ready yet—but something cool is coming soon. Check back
          later!💥...
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 120 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg rounded-full shadow-lg transition transform hover:scale-110"
          >
            Okay got it 🔙
          </Link>
        </motion.div>
      </div>
    </>
  );
};
