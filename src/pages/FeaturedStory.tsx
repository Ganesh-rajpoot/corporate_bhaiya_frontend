import StorySection from "../components/StorySection";
// import Hero from "../assets/pexels-ritesh-arya-1423700-3079978.jpg";
import GodHeader from "../components/GodHeader";
const FeaturedStory = () => {
  return (
    <div className="py-16">
      {/* God-tier Title */}
      <GodHeader title="Featured Story" />

      <StorySection
        image={""}
        title="How Asha Went Back to Learning"
        description=" When schools shut down, Asha feared his dream of becoming a teacher
        was over. But with the help of community-led programs and your
        support, Asha found his way back to learning — and hope."
        buttonText="Read Asha's Full Story →"
        link="/stories/asha-story"
      />
    </div>
  );
};

export default FeaturedStory;
