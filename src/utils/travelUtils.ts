
import { TravelPlanFormData } from "@/types/travel";

export const API_KEY = 'AIzaSyDG1Ab4bOk2CdxHMCwWTyyLJudtqwYMXfA';
export const SERP_API_KEY = '2ccc800f765f678fb19986dd95aa63c8de58f264a25707a79b9f4e54b96096bb';

export const generatePrompt = (data: TravelPlanFormData) => {
  return `Create a detailed travel plan for a trip. Format your response using the following structure and add relevant emojis (sparingly):

# 🌟 Travel Plan Overview

## 📍 Route
- From: ${data.source}
- To: ${data.destination}
- Dates: ${data.startDate} to ${data.endDate}

## 💰 Budget Details
${data.budget}

## 👥 Group Size
${data.travelers} traveler(s)

## ✨ Interests
${data.interests}

Please provide a detailed itinerary including:

1. 🏨 Recommended Accommodations
2. 🚗 Transportation Options
3. 📅 Day-by-Day Activities
4. 🍽️ Notable Restaurant Recommendations
5. 💡 Travel Tips & Cultural Insights

Format the response with clear sections, bullet points, and make it easy to read.`;
};

export const constructFlightSearchUrl = (formData: TravelPlanFormData) => {
  // Convert source and destination to uppercase as the API expects
  const source = formData.source.toUpperCase();
  const destination = formData.destination.toUpperCase();
  
  // Ensure the dates are properly formatted (YYYY-MM-DD)
  const outboundDate = formData.startDate.split('T')[0];
  const returnDate = formData.endDate.split('T')[0];
  
  const serpApiUrl = `https://serpapi.com/search.json?` + new URLSearchParams({
    engine: 'google_flights',
    departure_id: source,
    arrival_id: destination,
    outbound_date: outboundDate,
    return_date: returnDate,
    currency: 'USD',
    hl: 'en',
    api_key: SERP_API_KEY,
  }).toString();
  
  // Use a CORS proxy
  return `https://corsproxy.io/?${encodeURIComponent(serpApiUrl)}`;
};
