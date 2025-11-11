import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setTimeout(() => {
        setVisible(true); // slight delay before showing
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] z-50 bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-600 p-5 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
      <p className="text-sm">
        We use cookies to improve your experience. By using our site, you accept
        cookies. 🍪
      </p>
      <div className="flex gap-2 items-center">
        <button
          onClick={handleAccept}
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Accept
        </button>
        <button
          onClick={() => setVisible(false)}
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
