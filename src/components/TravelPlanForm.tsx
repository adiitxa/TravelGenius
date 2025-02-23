
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
      // Here you would typically make an API call to your backend
      // For now, we'll just show a toast notification
      toast({
        title: "Planning Trip",
        description: "Your travel plan is being generated...",
      });

      // Simulate API call delay
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
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h2 className="text-2xl font-bold text-navy mb-6">Plan Your Perfect Trip</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Source Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                  placeholder="Where are you starting from?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                  placeholder="Where do you want to go?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Travel Dates</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="dates"
                  value={formData.dates}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                  placeholder="When do you plan to travel?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Budget</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                  placeholder="What's your budget?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Number of Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                  placeholder="How many people?"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-navy">Interests</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-desert"
                placeholder="What are your interests? (e.g., adventure, culture, food)"
                required
                rows={3}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-lg hover:bg-desert transition-colors disabled:opacity-50"
          >
            {loading ? "Generating Plan..." : "Plan My Trip"}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-sand/50 rounded-lg">
            <h3 className="text-xl font-semibold text-navy mb-4">Your Travel Plan</h3>
            <pre className="whitespace-pre-wrap text-navy/70">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlanForm;
