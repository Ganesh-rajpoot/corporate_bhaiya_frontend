import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../lib/utils"; // optional utility to merge classes

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-md transition-all duration-300",
        "bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-400 dark:hover:bg-orange-500",
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
