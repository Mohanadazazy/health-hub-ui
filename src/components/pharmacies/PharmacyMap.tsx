import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  openUntil: string;
  deliveryTime: string;
  lat: number;
  lng: number;
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
  center?: [number, number];
}

const PharmacyMap = ({ pharmacies, center = [40.7128, -74.006] }: PharmacyMapProps) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-card h-[400px]">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pharmacies.map((pharmacy) => (
          <Marker key={pharmacy.id} position={[pharmacy.lat, pharmacy.lng]}>
            <Popup>
              <div className="min-w-[200px] space-y-2 p-1">
                <h3 className="font-bold text-base">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {pharmacy.address}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{pharmacy.rating}</span>
                  <span className="text-gray-500">({pharmacy.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span className={pharmacy.isOpen ? "text-green-600" : "text-gray-500"}>
                    {pharmacy.isOpen ? `Open until ${pharmacy.openUntil}` : pharmacy.openUntil}
                  </span>
                </div>
                <Link to={`/pharmacy/${pharmacy.id}`}>
                  <Button size="sm" className="w-full mt-1">View Pharmacy</Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PharmacyMap;
