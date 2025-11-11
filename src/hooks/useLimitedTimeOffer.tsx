import { useState } from "react";
import { motion } from "framer-motion";

// type OfferType = "marquee" | "card" | "modal";

export const useLimitedTimeOffer = () => {
  const [showOffer, setShowOffer] = useState(true);

  const hideOffer = () => setShowOffer(false);

  const OfferMarquee = () =>
    showOffer && (
      <div className="w-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 py-2 overflow-hidden fixed top-0 z-50">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          whileHover={{ x: 0 }}
          className="whitespace-nowrap text-center text-sm sm:text-base font-semibold text-black cursor-pointer"
          onClick={() =>
            window.open("https://corporatebhaiya.com/offer", "_blank")
          }
        >
          We are open for collaborations! Partner with us like Ediglobe to sell courses and services. Reach out us at <a href="mailto:contact@corporatebhaiya.com">contact@corporatebhaiya.com</a> or <a href="phone:+919289496871">+91 9289496871</a> for more details.
        </motion.div>
      </div>
    );

  const OfferCard = () =>
    showOffer && (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-xl mx-auto mt-20"
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
          onClick={() =>
            window.open("https://corporatebhaiya.com/offer", "_blank")
          }
        >
          Claim Your Spot 🚀
        </motion.button>
      </motion.div>
    );

  const OfferModal = () =>
    showOffer && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-2xl"
        >
          <h3 className="text-xl font-bold text-red-600 mb-2">
            ⏰ Limited Time Deal
          </h3>
          <p className="text-gray-700 mb-4">
            Act fast before this offer disappears forever!
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open("https://corporatebhaiya.com/offer", "_blank");
                hideOffer();
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full shadow hover:shadow-lg"
            >
              Claim Now 🎯
            </motion.button>
          </div>
          <button
            className="mt-4 text-xs text-gray-400 underline"
            onClick={hideOffer}
          >
            No thanks, I like missing out.
          </button>
        </motion.div>
      </div>
    );

  return {
    OfferMarquee,
    OfferCard,
    OfferModal,
    showOffer,
    hideOffer,
  };
};
