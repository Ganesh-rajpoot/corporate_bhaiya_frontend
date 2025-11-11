import { motion } from "framer-motion";

const FlashCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-xl mx-auto mt-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Special Student Offer!
        </h2>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
          className="bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow"
        >
          🔥 Limited Time
        </motion.div>
      </div>

      <p className="text-sm sm:text-base mb-6">
        Get exclusive mentorship access + bonuses if you sign up before this
        deal vanishes like your will to study during exams.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-red-600 font-semibold px-5 py-2 rounded-full hover:bg-yellow-100 transition"
      >
        Claim Your Spot 🚀
      </motion.button>
    </motion.div>
  );
};

export default FlashCard;
