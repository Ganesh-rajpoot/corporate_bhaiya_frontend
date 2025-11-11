const cards = [
  {
    title: "Help Children in the Middle East",
    text: "Hundreds of thousands of children in the Middle East are living through crisis. Many have witnessed family members and friends injured or killed. Children need our help. Your donation can help us respond.",
    image: "",
    route: "",
    buttonText: "",
  },
  {
    title: "Celebrating the International Day of Play",
    text: "Celebrating the International Day of PlayThere are so many reasons to celebrate play. But too many children don’t experience the joy and opportunity it brings. The International Day of Play creates a unifying moment at the global, national, and local level to elevate the importance of play as central to children’s learning and well-being.",
    image: "",
    route: "",
    buttonText: "",
  },
  {
    title: "Recovering from Conflict: What Children in Lebanon Need",
    text: "Recovering from Conflict: What Children in Lebanon NeedThe multiple protracted crises in Lebanon compounded by the recent conflict limits children’s access to meaningful learning opportunities and support, deprives them from their social networks and negatively affects their psychosocial well-being, and resilience.",
    image: "",
    route: "",
    buttonText: "",
  },
];

import GodHeader from "../components/GodHeader";
import { FeatureCards } from "../components/TiltCard";

const WhatsNew = () => {
  return (
    <>
      <GodHeader title="Whats New" /> <FeatureCards cards={cards} />
    </>
  );
};

export default WhatsNew;
