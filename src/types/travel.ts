
export interface TravelPlanFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  interests: string;
  includeFlights: boolean;
}

export interface FlightDetails {
  airline: string;
  airline_logo: string;
  flight_number: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: number;
  price: number;
  travel_class: string;
  extensions: string[];
}
