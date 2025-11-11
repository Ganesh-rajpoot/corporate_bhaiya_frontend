import { ImpactStats } from "../components/ImpactStats";
import Hero from "../assets/pexels-yogendras31-3231358.jpg";
import HeroBanner from "../components/HeroBanner";

export const HeroSection = () => (
  <>
    <HeroBanner
      image={Hero}
      title="Protect. Educate. Empower."
      subtitle="So children can rise above adversity and thrive."
    />

    <ImpactStats />
  </>
);
