
import { Calendar, MapPin, Users, CreditCard } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Smart Destination Matching",
    description: "Our AI analyzes your preferences to suggest perfect destinations that match your interests.",
  },
  {
    icon: Calendar,
    title: "Personalized Itineraries",
    description: "Get custom travel plans tailored to your schedule, preferences, and travel style.",
  },
  {
    icon: Users,
    title: "Group Planning",
    description: "Easily coordinate travel plans for groups of any size with smart scheduling.",
  },
  {
    icon: CreditCard,
    title: "Budget Optimization",
    description: "Make the most of your budget with AI-powered price tracking and suggestions.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="px-3 py-1 text-sm font-semibold text-desert bg-desert/10 rounded-full">
            Features
          </span>
          <h2 className="mt-6 text-3xl font-bold text-navy">
            Everything You Need for Perfect Travel Planning
          </h2>
          <p className="mt-4 text-lg text-navy/70 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to plan your next adventure with ease.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative p-8 bg-sand rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 -translate-y-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-desert text-white">
                  <feature.icon size={24} />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-navy">{feature.title}</h3>
              <p className="mt-2 text-navy/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
