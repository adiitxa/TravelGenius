
import { Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TravelPlanFormData } from "@/types/travel";

interface TravelFormInputsProps {
  formData: TravelPlanFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
}

export const TravelFormInputs = ({ formData, onChange, onCheckboxChange }: TravelFormInputsProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-navy/80">Source Location</label>
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
              placeholder="Where do you want to go?"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-navy/80">Start Date</label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-navy/80">End Date</label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
              required
              min={formData.startDate || new Date().toISOString().split('T')[0]}
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
              onChange={onChange}
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
              onChange={onChange}
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
            onChange={onChange}
            className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
            placeholder="Tell us about your interests (e.g., adventure, culture, food, relaxation)"
            required
            rows={4}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="includeFlights"
          checked={formData.includeFlights}
          onCheckedChange={(checked) => onCheckboxChange(checked as boolean)}
        />
        <label
          htmlFor="includeFlights"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include flight information in my travel plan
        </label>
      </div>
    </div>
  );
};
