// src/components/HeroSlider.tsx
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/first_crousel.webp";
import GodHeader from "./GodHeader";
// import banner2 from "../assets/banner2.jpg";
// import banner3 from "../assets/banner4.jpg";

const slides = [
  {
    image: banner1,
    heading: "Best Online Learning Platform",
    subHeading: "Unlock Your Career Potential",
    paragraph:
      "Upskill your skillset with corporate bhaiya and land your dream Job",
    buttonText: "1:1 Session",
    // route: "/booking",
  },
  // {
  //   image: "",
  //   heading: "Be the Change You Want to See",
  //   buttonText: "Get Involved",
  //   route: "/get-involved",
  // },
  // {
  //   image: "",
  //   heading: "Every Donation Counts",
  //   buttonText: "Donate Now",
  //   route: "/donate",
  // },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  // const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subHeading, paragraph, buttonText } = slides[current];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={image}
          src={image}
          alt={heading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <motion.div
        key={heading}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4"
      >
        <p className="text-lg md:text-xl max-w-2xl mx-auto">{subHeading}</p>
        <GodHeader title={heading} />
        <p className="text-lg md:text-xl max-w-2xl mx-auto">{paragraph}</p>
        {/* <button
          onClick={() => navigate(route)}
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer"
        >
          {buttonText}
        </button> */}

        <button
          onClick={() =>
            window.open(
              "https://superprofile.bio/bookings/corporatebhaiya-analytics",
              "_blank"
            )
          }
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer"
        >
          {buttonText}
        </button>
      </motion.div>
    </div>
  );
};

export default Slider;
