// import HeroBanner from "../components/HeroBanner";
// import OurMission from "../assets/5052521.jpg";
// import ParagraphBlock from "../components/ParagraphBlock";
// import ResponsiveVideo from "../components/Video";
// const AboutUs = () => {
//   return (
//     <>
//       <HeroBanner
//         title="Our Mission"
//         subtitle="To protect, educate, and empower children to rise above adversity using the power of play."
//         image={OurMission}
//       />
//       <ParagraphBlock
//         heading="Our Story"
//         textAfter="For 25 years, Right To Play has worked in some of the most difficult and dangerous places on earth to help children to stay in school and graduate, resist exploitation and overcome prejudice, keep themselves safe from disease, and heal from the harsh realities of war and abuse."
//       />
//       <ResponsiveVideo
//         src="https://apppack-app-righttoplay-publics3bucket-veclfraq9ykl.s3.amazonaws.com/media/Right_To_Play_20th_Anniversary_Feb_2022.mp4"
//         title="20 years of Why To Play"
//       />
//       <ParagraphBlock
//         heading=""
//         textAfter="It all began with a boy in a long sleeve t-shirt...

// In 1994, Norwegian speed skater Johann Olav Koss led a humanitarian trip to Eritrea. There, he came face-to-face with the realities of life in a country emerging from decades of war – and with the power of play. Amid burned-out tanks, children played together, kicking a shirtball back and forth. The children’s incredible resilience in the face of hopelessness inspired Koss to found Right To Play.

// Twenty years on, Right To Play has grown to reach millions of children in 14 countries in Africa, Asia, the Middle East, and Indigenous communities in Canada. We create positive and safe environments where children can learn and succeed, and use play in all its forms to provide rich and engaged learning experiences both inside and outside the classroom.

// Our vision is to support a generation of children to learn and develop through play so they can have a safe and joyful childhood and grow into thriving adults."
//       />
//       <ParagraphBlock
//         heading="2001 - 2004"
//         textAfter="Our early years are focused on humanitarian needs in Africa, and Asia and the Middle East. Programs launch in Uganda, Tanzania, Mozambique, Mali, Thailand, Rwanda, and the Palestinian Territories, helping 500,000 children to rise each week."
//       />
//     </>
//   );
// };

// export default AboutUs;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const features = [
  {
    title: "Skilled Instructors",
    desc: "Learn from professionals who've been there, broken prod, and fixed it too.",
  },
  {
    title: "Online Classes",
    desc: "Flexible, remote-friendly, and chaos-free. Learn anytime, anywhere.",
  },
  {
    title: "Career Guidance",
    desc: "Direction matters. We help you pick the right tech, role, and roadmap.",
  },
  {
    title: "1:1 Mentorship",
    desc: "Talk directly with mentors who actually give a damn about your growth.",
  },
  {
    title: "Mock Interviews",
    desc: "Face your fears. We simulate real interviews, minus the HR ghosting.",
  },
  {
    title: "Resume Building",
    desc: "Craft resumes that recruiters can’t ignore. No more ‘CV rejected’ pain.",
  },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    feedback:
      "Corporate Bhaiya turned my confusion into clarity. Got my first offer at Amazon within 2 months!",
    role: "SDE Intern @ Amazon",
  },
  {
    name: "Rohit Verma",
    feedback:
      "Bhaiya’s mock interviews were a game-changer. Felt like the real deal, minus the trauma.",
    role: "Frontend Dev @ Startup Unicorn",
  },
  {
    name: "Neha Singh",
    feedback:
      "From zero to Git hero. Their resume building tips got me shortlisted faster than Zomato delivery.",
    role: "Software Engineer @ TCS",
  },
];

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className="">
      <section className="bg-[var(--brand-bg)]  py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-orange-400">Corporate Bhaiya</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Your partner in building a <strong>career that pays</strong>,{" "}
          <strong>skills that stay</strong>, and{" "}
          <strong>confidence that slays</strong>.
        </p>
      </section>

      <section className="bg-white dark:bg-zinc-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-orange-500">
            Why Choose Corporate Bhaiya?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            In today's cutthroat job market, skills are currency. Whether you're
            a fresh grad or someone stuck in "2 years exp, need 5" hell—Bhaiya’s
            got your back.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            With real-world projects, elite mentorship, and full-stack career
            support, we turn <em>aspiring students into hired professionals</em>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)]  py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-zinc-900 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
          What Our Students Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-orange-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl p-6 shadow-lg"
            >
              <p className="italic mb-4">“{t.feedback}”</p>
              <h4 className="font-bold text-orange-600">{t.name}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16 px-6 text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Upskill with Corporate Bhaiya?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Whether you're a student aiming for your first offer or a parent
          looking for real career support—your journey starts here.
        </p>
        <button 
        onClick={() => navigate("/courses")}
        className="bg-black hover:bg-zinc-900 text-white font-semibold px-6 py-3 rounded-full transition">
          Explore Courses
        </button>
      </section>
    </div>
  );
}
