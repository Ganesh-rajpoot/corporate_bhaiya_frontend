import React from "react";
import { motion } from "framer-motion";

interface GodHeaderProps {
  title: string;
}
const GodHeader: React.FC<GodHeaderProps> = ({ title }) => {
  return (
    <>
      {" "}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-orange-600 dark:text-orange-400"
      >
        {title}
      </motion.h2>
    </>
  );
};

export default GodHeader;
