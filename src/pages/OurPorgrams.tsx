import MockImg from "../assets/mock_interview.jpg";
import MentorImg from "../assets/mentorship.jpg";
import ResumeImg from "../assets/5052521.jpg";
import CoursesImg from "../assets/online_course.jpg";
// const cards = [
//   {
//     // title: "1:1 Mock Interview In Just ₹299",
//     // text: "",
//     image: MockImg,
//     route: "/mock-interview",
//     buttonText: "1:1 Mock Interview",
//   },
//   {
//     image: MentorImg,
//     route: "/mentor-program",
//     buttonText: "1:1 Mentorship",
//   },
//   {
//     image: ResumeImg,
//     route: "/resume-building",
//     buttonText: "1:1 Resume Building",
//   },
//   {
//     image: CoursesImg,
//     route: "/courses",
//     buttonText: "Online Courses",
//   },
// ];
const cards = [
  {
    image: MockImg,
    url: "https://superprofile.bio/bookings/corporatebhaiya-analytics",
    buttonText: "1:1 Mock Interview",
    external: true,
  },
  {
    image: MentorImg,
    url: "https://superprofile.bio/bookings/corporatebhaiya-analytics",
    buttonText: "1:1 Mentorship",
    external: true,
  },
  {
    image: ResumeImg,
    url: "https://superprofile.bio/bookings/corporatebhaiya-analytics",
    buttonText: "1:1 Resume Building",
    external: true,
  },
  {
    image: CoursesImg,
    route: "/courses", // keep this one internal
    buttonText: "Online Courses",
    external: false,
  },
];

import GodHeader from "../components/GodHeader";
import { FeatureCards } from "../components/TiltCard";

const OurPorgrams = () => {
  return (
    <>
      <GodHeader title="Our Programs" />
      <FeatureCards cards={cards} />
    </>
  );
};

export default OurPorgrams;
