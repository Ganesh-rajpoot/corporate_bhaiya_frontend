import React from "react";
import { CalendarDays, Users, Clock } from "lucide-react";

type CourseCardProps = {
  image: string;
  price: string;
  title: string;
  start_date: string;
  duration: string;
  students: number;
  join_url: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  price,
  title,
  start_date,
  duration,
  students,
  join_url,
}) => {
  const imgSrc = image.startsWith("http")
    ? image
    : new URL(image, import.meta.env.VITE_SERVER_URL).href;

  const handleJoin = () => {
    window.open(join_url, "_blank"); // open in new tab
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
          <p className="text-primary font-semibold text-sm mb-2">{price}</p>

          <div className="border-t border-gray-300 dark:border-gray-700 pt-3 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Starts: {start_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Duration: {duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{students} Students</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleJoin}
          className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
        >
          🚀 Join Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
