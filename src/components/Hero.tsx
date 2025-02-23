
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-sand pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <span className="inline-block animate-fadeIn opacity-0 [animation-delay:200ms]">
          <span className="px-3 py-1 text-sm font-semibold text-desert bg-desert/10 rounded-full">
            AI-Powered Travel Planning
          </span>
        </span>
        
        <h1 className="mt-6 text-4xl md:text-6xl font-bold text-navy tracking-tight animate-fadeIn opacity-0 [animation-delay:400ms]">
          Your Personal AI Travel Companion
        </h1>
        
        <p className="mt-6 text-xl text-navy/70 max-w-3xl mx-auto animate-fadeIn opacity-0 [animation-delay:600ms]">
          Experience seamless travel planning with our AI agent. From personalized itineraries to budget optimization, we make your dream vacation a reality.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0 [animation-delay:800ms]">
          <button className="inline-flex items-center px-8 py-3 bg-navy text-white rounded-full hover:bg-desert transition-colors">
            Plan Your Trip
            <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="inline-flex items-center px-8 py-3 border-2 border-navy text-navy rounded-full hover:bg-navy hover:text-white transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;
