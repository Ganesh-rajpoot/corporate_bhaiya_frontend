import BotCard from "../components/BotCard";
import { useEffect, useState } from "react";
const coursesUrl = `${import.meta.env.VITE_SERVER_URL}/api/bots`;
const contentUrl = `${import.meta.env.VITE_SERVER_URL}/api/page-contents`; 
const PracticeWithBot = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [subHeadingText, setSubHeadingText] = useState("");  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [resCourses, resContent] = await Promise.all([
          fetch(coursesUrl),
          fetch(contentUrl),
        ]);
  
        if (!resCourses.ok) throw new Error("Failed to fetch bots");
        if (!resContent.ok) throw new Error("Failed to fetch content");
  
        const dataCourses = await resCourses.json();
        const dataContent = await resContent.json();
  
        setCourses(dataCourses);
        setHeadingText(dataContent[0].bot_page_heading||"");
        setSubHeadingText(dataContent[0].bot_page_subheading||"");
      } catch (err) {
        setError("⚠️ Something went wrong while fetching data.");
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
      {headingText || "🚀 Start Free Practice with AI → Pass the Quiz → Earn Certification"}
      
      </h1>
      
        <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
          {subHeadingText || "🎁 Special offer: Use coupon code CORP50!"}
        </h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* {courses.map((course: any, index) => (
          <CourseCard key={index} {...course} />
        ))} */}

        {!loading &&
          !error &&
          courses.map((course: any, index) => (
            <BotCard key={index} {...course} />
          ))}
      </div>
    </div>
  );
};

export default PracticeWithBot;
