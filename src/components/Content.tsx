// src/components/ContentPage.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { splitTextIntoParagraphs } from "../helper/splitParagraph";

interface ContentPageProps {
  bannerImage: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const ContentPage = ({
  bannerImage,
  title,
  description,
  buttonText,
  buttonLink = "/",
}: ContentPageProps) => {
  const navigate = useNavigate();
  const paragraphs = splitTextIntoParagraphs(description);

  return (
    <div>
      {/* Banner Image Section */}
      {bannerImage && (
        <div className="relative h-[50vh] w-full overflow-hidden">
          <img
            src={bannerImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
            <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Content Section */}
      <motion.div
        className="max-w-5xl mx-auto px-4 py-12 text-[var(--brand-text)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animate each paragraph */}
        {paragraphs.map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-lg sm:text-xl leading-relaxed mb-6"
          >
            {para}
          </motion.p>
        ))}

        {/* Optional CTA Button */}
        {buttonText && (
          <motion.button
            onClick={() => navigate(buttonLink)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300"
          >
            {buttonText}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ContentPage;
