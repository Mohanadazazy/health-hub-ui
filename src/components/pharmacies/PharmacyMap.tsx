import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    pharmacies.forEach((pharmacy) => {
      const marker = L.marker([pharmacy.lat, pharmacy.lng]).addTo(map);
      const statusColor = pharmacy.isOpen ? "#16a34a" : "#9ca3af";
      const statusText = pharmacy.isOpen ? `Open until ${pharmacy.openUntil}` : pharmacy.openUntil;

      marker.bindPopup(`
        <div style="min-width:200px;font-family:system-ui,sans-serif;">
          <h3 style="font-weight:700;font-size:15px;margin:0 0 6px;">${pharmacy.name}</h3>
          <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">📍 ${pharmacy.address}</p>
          <p style="font-size:13px;margin:0 0 4px;">⭐ ${pharmacy.rating} (${pharmacy.reviews} reviews)</p>
          <p style="font-size:13px;color:${statusColor};margin:0 0 8px;">🕐 ${statusText}</p>
          <a href="/pharmacy/${pharmacy.id}" style="display:block;text-align:center;padding:6px 12px;background:hsl(174,62%,40%);color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">View Pharmacy</a>
        </div>
      `);
    });
  }, [pharmacies]);

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-card h-[400px]">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

export default PharmacyMap;
