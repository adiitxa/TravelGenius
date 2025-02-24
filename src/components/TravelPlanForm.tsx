import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TravelPlanFormData, FlightDetails } from "@/types/travel";
import { API_KEY, constructFlightSearchUrl, generatePrompt } from "@/utils/travelUtils";
import { FlightDetailsTable } from "./FlightDetailsTable";
import { TravelFormInputs } from "./TravelFormInputs";

const TravelPlanForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TravelPlanFormData>({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    interests: "",
    includeFlights: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [flightDetails, setFlightDetails] = useState<FlightDetails[]>([]);

  const fetchFlightDetails = async () => {
    try {
      if (!formData.source || !formData.destination || !formData.startDate) {
        throw new Error('Please fill in all flight search fields');
      }

      const url = constructFlightSearchUrl(formData);
      console.log('Fetching flights from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('SerpAPI Response:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.best_flights || data.best_flights.length === 0) {
        throw new Error('No flights found for the specified route and dates');
      }

      // Transform all best flights into FlightDetails array
      const flightDetailsArray = data.best_flights.map((bestFlight: any) => {
        const flight = bestFlight.flights[0]; // Get the first flight segment
        return {
          airline: flight.airline,
          airline_logo: flight.airline_logo,
          flight_number: flight.flight_number,
          departure: {
            airport: flight.departure_airport.name,
            time: flight.departure_airport.time,
          },
          arrival: {
            airport: flight.arrival_airport.name,
            time: flight.arrival_airport.time,
          },
          duration: flight.duration,
          price: bestFlight.price,
          travel_class: flight.travel_class,
          extensions: flight.extensions || [],
        };
      });

      setFlightDetails(flightDetailsArray);

      toast({
        title: "Flights Found",
        description: `Found ${flightDetailsArray.length} flights for your journey!`,
      });
    } catch (error) {
      console.error('Error fetching flights:', error);
      
      let errorMessage = "Failed to fetch flight information. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      setFlightDetails([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFlightDetails([]);

    try {
      toast({
        title: "Planning Trip",
        description: "Generating your travel plan...",
      });

      if (formData.includeFlights) {
        await fetchFlightDetails();
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: generatePrompt(formData)
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Failed to generate travel plan');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
      console.error('Error:', error);
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
          <TravelFormInputs 
            formData={formData}
            onChange={handleInputChange}
            onCheckboxChange={(checked) => setFormData(prev => ({ ...prev, includeFlights: checked }))}
          />

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

        {flightDetails.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-navy mb-4">Available Flights</h3>
            {flightDetails.map((flight, index) => (
              <FlightDetailsTable key={index} flightDetails={flight} />
            ))}
          </div>
        )}

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
