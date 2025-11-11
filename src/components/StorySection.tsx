// src/components/StorySection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
interface StorySectionProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  reverse?: boolean; // Optional: to alternate image/text sides
  link?: string;
}

const StorySection = ({
  image,
  title,
  description,
  buttonText,
  reverse,
  link,
}: StorySectionProps) => {
  return (
    <div
      className={`flex  flex-col-reverse ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-center py-12`}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover"
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.div
        className="w-full md:w-1/2 text-[var(--brand-text)]"
        initial={{ opacity: 0, x: reverse ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl leading-relaxed mb-6">{description}</p>
        {link && (
          <Link
            to={link}
            className="inline-block px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            {buttonText}
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default StorySection;
