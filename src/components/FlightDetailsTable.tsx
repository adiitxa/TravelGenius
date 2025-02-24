
import { FlightDetails } from "@/types/travel";
import { Plane } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FlightDetailsTableProps {
  flightDetails: FlightDetails;
}

export const FlightDetailsTable = ({ flightDetails }: FlightDetailsTableProps) => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-navy mb-4">✈️ Available Flights</h3>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Airline</TableHead>
              <TableHead>Flight</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <img src={flightDetails.airline_logo} alt={flightDetails.airline} className="h-6" />
                  <span>{flightDetails.airline}</span>
                </div>
              </TableCell>
              <TableCell>{flightDetails.flight_number}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{flightDetails.departure.time.split(' ')[1]}</p>
                  <p className="text-sm text-gray-500">{flightDetails.departure.airport}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{flightDetails.arrival.time.split(' ')[1]}</p>
                  <p className="text-sm text-gray-500">{flightDetails.arrival.airport}</p>
                </div>
              </TableCell>
              <TableCell>{Math.floor(flightDetails.duration / 60)}h {flightDetails.duration % 60}m</TableCell>
              <TableCell>${flightDetails.price}</TableCell>
              <TableCell>
                <button
                  className="inline-flex items-center space-x-1 text-desert hover:text-navy transition-colors"
                >
                  <span>Book</span>
                  <Plane size={16} />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {flightDetails.extensions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-medium text-gray-600 mb-2">Additional Information</p>
          <ul className="space-y-1">
            {flightDetails.extensions.map((ext, index) => (
              <li key={index} className="text-sm text-gray-600">{ext}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
