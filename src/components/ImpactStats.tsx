import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    title: "Children with Improved Socio-Emotional Skills",
    value: 46,
    suffix: "%",
    description:
      "In Uganda, caregivers reporting improved skills increased from 21% to 46%.",
  },
  {
    title: "Proficient Readers in Supported Schools",
    value: 2.5,
    suffix: "x",
    description:
      "In Tanzania, children were 2.5 times more likely to be proficient readers.",
  },
  {
    title: "Reduction in Corporal Punishment Reports",
    value: 31,
    suffix: "%",
    description: "In Pakistan, reports dropped from 67% to 36%.",
  },
  {
    title: "Decrease in Distress Levels",
    value: 70,
    suffix: "%",
    description:
      "In Lebanon, children's distress levels dropped by 70% after interventions.",
  },
];

export const ImpactStats = () => (
  <div className="py-12  ">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-6 border rounded-lg glow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.4 }}
          >
            <div className="text-4xl font-bold text-orange-500">
              <CountUp end={stat.value} suffix={stat.suffix} duration={6} />
            </div>
            <h3 className="mt-2 text-xl font-semibold">{stat.title}</h3>
            <p className="mt-2 ">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
