import { motion } from "framer-motion";

export const Bounce = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-4xl font-bold"
  >
    Welcome to Criks' Charity 🌍
  </motion.div>
);
