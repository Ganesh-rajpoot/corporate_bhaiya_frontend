import Slider from "../components/Slider";
// import FeaturedStory from "./FeaturedStory";
import SignUp from "./Signup";
import OurPorgrams from "./OurPorgrams";
import { useLimitedTimeOffer } from "../hooks/useLimitedTimeOffer";
import OurMentor from "./OurMentor";
import ContactUs from "./ContactUs";

const Home = () => {
  const { OfferMarquee, OfferCard } = useLimitedTimeOffer();

  return (
    <>
      <Slider />
      <OurPorgrams />
      {/* <WhatsNew /> */}

      {/* <OurImpact /> */}
      {/* <FlashCard /> */}
      {/* <OfferMarquee /> */}
      <OurMentor />
      <SignUp />
      <OfferMarquee />
      {/* <OfferModal /> */}
      <main className="mt-20">
        {" "}
        <OfferCard />{" "}
      </main>
      <ContactUs />
      {/* <HeroSection /> */}
      {/* <FeaturedStory /> */}
    </>
  );
};

export default Home;
