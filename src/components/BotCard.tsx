import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { isTokenValid } from "../lib/TokenExpiry";
import { useNavigate , useLocation } from "react-router-dom";



type BotCardProps = {
  image: string;
  title: string;
  join_url?: string;
  button_text?: string;
};

const BotCard: React.FC<BotCardProps> = ({ image, title, join_url, button_text }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loggedUser, setLoggedUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  

  const imgSrc = image.startsWith("http")
    ? image
    : new URL(image, import.meta.env.VITE_SERVER_URL).href;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token && isTokenValid(token)) {
      setLoggedUser(true);
    } else {
      setLoggedUser(false);
    }
  }, [user]);


  const handleJoin = () => {
  if (loggedUser) {
    window.open(join_url || "https://sql.corporatebhaiya.in/", "_blank");
  } else {
    navigate("/login", { state: { from: location.pathname } }); 
  }
};


  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl duration-300 flex flex-col">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>

        <button
          onClick={handleJoin}
          className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
        >
          {button_text || "Practice Now"}
        </button>
      </div>
    </div>
  );
};

export default BotCard;
