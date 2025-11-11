import { useNavigate } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export interface CardData {
  title?: string;
  text?: string;
  image?: string;
  route?: string;
  url?: string; 
  buttonText?: string;
}

interface TiltCardProps {
  card: CardData;
}

export const TiltCard = ({ card }: TiltCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  const glow = useTransform(x, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative glow-card bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg dark:shadow-2xl transition-shadow duration-300 group"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glow.get()}, 30%, rgba(255,165,0,0.2), transparent)`,
        }}
      ></div>
      <img
        src={card?.image}
        alt={card?.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {card.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{card.text}</p>
        {/* {card.route !== "" && (
          <button
            onClick={() => navigate(card.route || "")}
            className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:underline group-hover:translate-x-1 transition-transform duration-300 cursor-pointer"
          >
            {card.buttonText} <ArrowRight size={20} />
          </button>
        )} */}
        {card.url ? (
  // External link
  <a
    href={card.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:underline group-hover:translate-x-1 transition-transform duration-300 cursor-pointer"
  >
    {card.buttonText} <ArrowRight size={20} />
  </a>
) : card.route ? (
  // Internal route
  <button
    onClick={() => navigate(card.route!)} // <-- "!" tells TS it's definitely defined here
    className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:underline group-hover:translate-x-1 transition-transform duration-300 cursor-pointer"
  >
    {card.buttonText} <ArrowRight size={20} />
  </button>
) : null}

      </div>
    </motion.div>
  );
};

interface FeatureCardsProps {
  cards: CardData[];
}

export const FeatureCards = ({ cards }: FeatureCardsProps) => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 perspective-[1000px]">
      {cards.map((card, index) => (
        <TiltCard key={index} card={card} />
      ))}
    </div>
  );
};

// Adding mentor card

export interface MentorData {
  id?: number;
  name: string;
  image: string;
  role: string;
  experience: string;
  company: string;
  linkedin: string;
  route?: string;
  buttonText?: string;
  skills?: [];
  courses?: [];
  bio?: string;
}
interface MentorCardProps {
  mentor: MentorData;
}

// Slugify helper
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const MentorCard = ({ mentor }: MentorCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  const glow = useTransform(x, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const handleKnowMore = () => {
    // Navigate using slug instead of ID
    navigate(`/mentor/${slugify(mentor.name)}`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative glow-card bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden group"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glow.get()}, 30%, rgba(255,165,0,0.2), transparent)`,
        }}
      ></div>
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {mentor.name}
        </h3>
        <p className="text-orange-600 font-medium">{mentor.role}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {mentor.experience} experience at {mentor.company}
        </p>
        <div className="flex items-center justify-between pt-4">
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Linkedin size={20} /> <span className="text-sm">LinkedIn</span>
          </a>
          {mentor.route && (
            <button
              // onClick={() => navigate(mentor.route!)}
              onClick={handleKnowMore}
              className="text-sm text-orange-500 font-semibold hover:underline"
            >
              {mentor.buttonText || "Know More"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const MentorGrid = ({ mentors }: { mentors: MentorData[] }) => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-[1000px]">
      {mentors.map((mentor, index) => (
        <MentorCard key={index} mentor={mentor} />
      ))}
    </div>
  );
};
