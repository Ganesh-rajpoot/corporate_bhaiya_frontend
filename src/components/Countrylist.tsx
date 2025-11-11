import CustomMap from "./CustomMap";

const CountryList = () => {
  return (
    <div className="py-16 bg-background text-foreground">
      <h2 className="text-4xl font-bold text-center mb-10">Where We Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-6xl mx-auto">
        <CustomMap />
      </div>
    </div>
  );
};

export default CountryList;
