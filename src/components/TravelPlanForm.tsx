
import { useState } from "react";
import { Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TravelPlanFormData {
  source: string;
  destination: string;
  dates: string;
  budget: string;
  travelers: string;
  interests: string;
}

const TravelPlanForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TravelPlanFormData>({
    source: "",
    destination: "",
    dates: "",
    budget: "",
    travelers: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: "Planning Trip",
        description: "Your travel plan is being generated...",
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      setResult(
        `Here's your travel plan from ${formData.source} to ${formData.destination}:\n\n` +
        `• Recommended duration: 5 days\n` +
        `• Budget allocation: ${formData.budget}\n` +
        `• Activities based on interests: ${formData.interests}\n` +
        `• Number of travelers: ${formData.travelers}\n\n` +
        `We recommend visiting during ${formData.dates} for the best experience.`
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 border border-white/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy">Plan Your Perfect Trip</h2>
          <p className="mt-2 text-navy/70">Fill in the details below and let our AI create your personalized travel plan</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy/80">Source Location</label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                  placeholder="Where are you starting from?"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy/80">Destination</label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                  placeholder="Where do you want to go?"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy/80">Travel Dates</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="text"
                  name="dates"
                  value={formData.dates}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                  placeholder="When do you plan to travel?"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy/80">Budget</label>
              <div className="relative group">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                  placeholder="What's your budget?"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy/80">Number of Travelers</label>
              <div className="relative group">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                  placeholder="How many people?"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-semibold text-navy/80">Interests & Preferences</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                placeholder="Tell us about your interests (e.g., adventure, culture, food, relaxation)"
                required
                rows={4}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-navy to-desert text-white py-4 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Plan...
              </span>
            ) : (
              "Create My Travel Plan"
            )}
          </button>
        </form>

        {result && (
          <div className="mt-10 p-8 bg-gradient-to-br from-sand/40 to-desert/20 rounded-2xl backdrop-blur-sm animate-fadeIn">
            <h3 className="text-2xl font-bold text-navy mb-4">Your Travel Plan</h3>
            <div className="prose prose-sand">
              <pre className="whitespace-pre-wrap text-navy/70 leading-relaxed">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlanForm;
