import HeroBanner from "../components/HeroBanner";
import ParagraphBlock from "../components/ParagraphBlock";
import { TiltCard } from "../components/TiltCard";
import { playPrograms } from "../services/playPrograms";
import CountryList from "../components/Countrylist";
import GodHeader from "../components/GodHeader";
import OurCourses from "../assets/ourcourses.png";

const moreAboutWork = [
  {
    title: "Raj M",
    text: "",
    image: "",
    route: "",
    buttonText: "",
  },
  {
    title: "Amit Pandey",
    text: "",
    image: "",
    route: "",
    buttonText: "",
  },
];

const OurWork = () => {
  return (
    <>
      <HeroBanner title="" subtitle="" image={OurCourses} />
      <ParagraphBlock
        textBefore="Corporate Bhaiya in supporting children’s learning and well-being through play. We harness the power of play to transform children’s lives both inside and outside the classroom."
        heading="Why Us?"
        textAfter="It’s how they articulate their hopes and dreams, learn to communicate and interact with others, express their emotions, and grow into adulthood.

We believe play should be fun and enjoyable, socially interactive, actively engaging, meaningful, and imaginative.Through play, children learn:"
      />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-[1000px]">
        {playPrograms &&
          playPrograms.map((data, index) => (
            <TiltCard key={index} card={data} />
          ))}
      </div>
      <CountryList />
      <GodHeader title="Our Students Say !" />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 perspective-[1000px]">
        {moreAboutWork && moreAboutWork.map((data) => <TiltCard card={data} />)}
      </div>
    </>
  );
};

export default OurWork;
