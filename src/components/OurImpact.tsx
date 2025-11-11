import StorySection from "./StorySection";
import SaferSpace from "../assets/husniati-salma-3gXsTtLFlfA-unsplash.jpg";
import EmpowerGirl from "../assets/children-876543_1920.jpg";
export const OurImpact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <StorySection
        image={SaferSpace}
        title="Creating Safer Spaces"
        description="Right To Play is committed to ending violence against children..."
        buttonText="Read More"
        link="/stories/creating-safer-spaces"
      />
      <StorySection
        image={EmpowerGirl}
        title="Empowering Girls Through Play"
        description="Girls in Lebanon are gaining confidence and leadership through sport and storytelling."
        buttonText="Read More"
        link="/stories/empowering-girls"
        reverse
      />
    </div>
  );
};
