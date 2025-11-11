import ContentPage from "../components/Content";
import GodHeader from "../components/GodHeader";
import HeroBanner from "../components/HeroBanner";
import ParagraphBlock from "../components/ParagraphBlock";
import StorySection from "../components/StorySection";
import { TiltCard } from "../components/TiltCard";
import { keyPrograms } from "../services/keyPrograms";
import { otherPrograms } from "../services/otherPrograms";
import FeaturedStory from "./FeaturedStory";

const OurImpact = () => {
  return (
    <>
      <HeroBanner
        title="Our Impact"
        subtitle="We help children rise above adversity using the power of play."
        image={""}
        ctaText="See Stories"
        ctaLink="/stories"
      />
      <ContentPage
        bannerImage=""
        title="How We Do It"
        sub-title=""
        description-heading="OUR CORE PROGRAM AREAS"
        description="We reach millions of children and youth each year in some of the most difficult places on earth, helping them to stay in school and learn, overcome prejudice, heal from trauma, and develop the skills they need to thrive.We harness play, one of the most fundamental forces in a child's life, to teach children and youth the skills they need to dismantle barriers and embrace opportunities, in learning and in life."
      />
      <div className="max-w-7xl mx-auto px-4">
        <StorySection
          image=""
          title="Creating Safer Spaces"
          description="Right To Play is committed to ending violence against children..."
          buttonText="Read More"
          link="/stories/creating-safer-spaces"
        />
        <StorySection
          image=""
          title="Empowering Girls Through Play"
          description="Girls in Lebanon are gaining confidence and leadership through sport and storytelling."
          buttonText="Read More"
          link="/stories/empowering-girls"
          reverse
        />

        {/* More stories... */}
      </div>
      <GodHeader title="OUR CORE PROGRAM AREAS" />
      <ParagraphBlock
        textBefore="We reach millions of children and youth each year in some of the most difficult places on earth, helping them to stay in school and learn, overcome prejudice, heal from trauma, and develop the skills they need to thrive."
        heading="How We Do It"
        textAfter="We harness play, one of the most fundamental forces in a child's life, to teach children and youth the skills they need to dismantle barriers and embrace opportunities, in learning and in life."
      />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-[1000px]">
        {keyPrograms &&
          keyPrograms.map((data, index) => (
            <TiltCard key={index} card={data} />
          ))}
      </div>

      <ParagraphBlock
        textBefore="Through our programs, children develop a love of learning that lays the foundation for success in school and in life and strengthen their skills, resilience and well-being."
        heading="We play for impact"
        linkText="Learn more about how we support children’s learning and well-being."
        linkTo="/learn-more"
        textAfter="We’re supporting a generation of children to learn and develop through play, so they can have a safe and joyful childhood and grow into thriving adults."
      />

      <div className="w-full max-w-screen-xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-[1000px]">
        {otherPrograms &&
          otherPrograms.map((data, index) => (
            <TiltCard key={index} card={data} />
          ))}
      </div>

      <ParagraphBlock
        heading="A WORLD OF UPRISERS"
        textAfter="Learn how children and youth are rising above obstacles to go to school and learn, standing up to discrimination, claiming their rights, healing from the trauma of conflict and displacement, and dreaming of a brighter future."
      />
      <FeaturedStory />
    </>
  );
};

export default OurImpact;
