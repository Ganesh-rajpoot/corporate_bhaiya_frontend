import { MentorGrid } from "../components/TiltCard"; // or wherever you keep it
import { useEffect, useState } from "react";
// const mentorData: MentorData[] = [
//   {
//     name: "Paras Jain",
//     image: Paras,
//     role: "Data Analyst",
//     experience: "5+ years",
//     company: "Ameriprise Financial Services",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/paras-jai",
//     buttonText: "Know More",
//   },
//   {
//     name: "Samyak Jain",
//     image: Samyak,
//     role: "AI Developer",
//     experience: "3+ years",
//     company: "Scalong AI",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/samyak-jain",
//     buttonText: "Know More",
//   },
//   {
//     name: "Mohd Anas",
//     image: Anas,
//     role: "Data Analyst",
//     experience: "3+ years",
//     company: "UBER , Ex Flipkart",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/mohd-anas",
//     buttonText: "Know More",
//   },
//   {
//     name: "Suraj Pandey",
//     image: Suraj,
//     role: "Data Scientist",
//     experience: "4+ years",
//     company: "Roadzen Ex Amazon",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/suraj-pandey",
//     buttonText: "Know More",
//   },
//   {
//     name: "Ganesh Rajput",
//     image: Ganesh,
//     role: "Full Stack Developer",
//     experience: "4+ years",
//     company: "Turing Ex. TradeIndia",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/paras-jain",
//     buttonText: "Know More",
//   },
//   {
//     name: "Junaid Ali",
//     image: Junaid,
//     role: "Java Developer",
//     experience: "3+ years",
//     company: "Pristyn Care Ex.Nuvia",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/junaid-ali",
//     buttonText: "Know More",
//   },
//   {
//     name: "Vaibhav Prakash",
//     image: Vaibhav,
//     role: "Cloud Technology",
//     experience: "3+ years",
//     company: "Koeing Solution Ex Deloitte",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/vaibhav",
//     buttonText: "Know More",
//   },
//   {
//     name: "Adarsh Jain",
//     image: Adarsh,
//     role: "AI DEVELOPER",
//     experience: "3+ years",
//     company: "XTEN-AV, EX. PW",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/paras-jain",
//     buttonText: "Know More",
//   },
//   {
//     name: "Manish Mishra",
//     image: Manish,
//     role: "Software Developer",
//     experience: "3+ years",
//     company: "Bailiwick Tech Ex Mobility",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/manish",
//     buttonText: "Know More",
//   },
//   {
//     name: "Shivam Singh",
//     image: Shivam,
//     role: "AI Developer",
//     experience: "6+ years",
//     company: "XTEN-AV Ex.Agrex AI",
//     linkedin: "https://www.linkedin.com/in/parasjain/",
//     route: "/mentor/shivam",
//     buttonText: "Know More",
//   },
//   // Add more mentors here
// ];

const mentorsUrl = `https://api.corporatebhaiya.in/api/mentors/public/`;
const OurMentor = () => {
  // Get all mentor from API
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMentor = async () => {
      try {
        const res = await fetch(mentorsUrl);
        if (!res.ok) throw new Error("Mentor not found");

        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Error fetching mentor:", err);
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, []);

  return (
    <section className="py-20 bg-[var(--brand-bg)] dark:bg-black">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-orange-500 mb-4">
          Meet Your Mentors
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          These legends don’t just teach. They craft warriors from bugs and
          chaos.
        </p>
      </div>
      {/* <FeatureCards cards={mentorData} /> */}
      {loading === false && <MentorGrid mentors={mentors} />}
    </section>
  );
};

export default OurMentor;
