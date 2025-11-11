import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GodHeader from "./GodHeader";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  image,
  ctaText,
  ctaLink,
}) => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden bg-[var(--brand-bg)] text-[var(--text)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1> */}
        <GodHeader title={title} />
        <p className="text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition font-semibold"
          >
            {ctaText}
          </Link>
        )}
      </motion.div>

      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})`,
        }}
      ></div>
    </section>
  );
};

export default HeroBanner;
