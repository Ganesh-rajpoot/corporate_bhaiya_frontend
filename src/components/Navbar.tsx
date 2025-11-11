import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import logoSide from "../assets/corporate_logo.jpg";
import SearchBox from "./Searchbox";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import defaultAvatar from "../assets/mentor4.jpg";
import { isTokenValid } from "../lib/TokenExpiry";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem("tokens");
  const loggedUser = useMemo(() => {
    return user && isTokenValid(token || "");
  }, [user, token]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchToggle = () => setShowSearch((prev) => !prev);

  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Courses", path: "/courses" },
    {
      name: "Practice with AI Bot",
      path: "/practice-bot",
    },
    {
      name: "1:1 Session",
      path: "https://superprofile.bio/bookings/corporatebhaiya-analytics",
    },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Certificate", path: "/certificate" },
  ];

  return (
    <header className="sticky top-5 z-50 bg-[var(--brand-bg)] shadow-md transition-colors duration-500">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2 glow-card">
          <img
            src={logoSide}
            alt="Side Logo"
            className="h-16 w-auto rounded-[12px] object-contain dark:invert"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="hover-fx">
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={handleSearchToggle}
              className="p-2 rounded-full hover-fx clickable glow-card-red"
            >
              <Search size={22} />
            </button>
          </li>

          {loggedUser ? (
            <li>
              <Link to="/profile" className="flex items-center gap-2 hover-fx">
                <img
                  src={user?.profilePic || defaultAvatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover border border-orange-500"
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition font-semibold"
              >
                Login
              </Link>
            </li>
          )}

          <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-full transition"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full z-[-1]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                boxShadow:
                  theme === "dark"
                    ? "0 0 15px 4px rgba(255, 200, 0, 0.5)"
                    : "0 0 15px 4px rgba(173, 216, 230, 0.3)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Sun size={22} className="text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Moon size={22} className="text-blue-500" />
              </motion.div>
            )}
          </motion.button>
        </ul>

        <SearchBox show={showSearch} onClose={() => setShowSearch(false)} />

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-full transition"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full z-[-1]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                boxShadow:
                  theme === "dark"
                    ? "0 0 15px 4px rgba(255, 200, 0, 0.5)"
                    : "0 0 15px 4px rgba(173, 216, 230, 0.3)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Sun size={22} className="text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Moon size={22} className="text-blue-500" />
              </motion.div>
            )}
          </motion.button>

          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-white text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition font-semibold inline-block"
              onClick={() => setMenuOpen(false)}
            >
              🚀 Login
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
