import { motion } from "framer-motion";

const OfferMarquee = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 py-2 overflow-hidden fixed top-0 z-50">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="whitespace-nowrap text-center text-sm sm:text-base font-semibold text-black"
      >
         We are open for collaborations! Partner with us like Ediglobe to sell courses and services. Reach out us at <a href="mailto:contact@corporatebhaiya.com">contact@corporatebhaiya.com</a> or <a href="phone:+919289496871">+91 9289496871</a> for more details.
      </motion.div>
    </div>
  );
};

export default OfferMarquee;
