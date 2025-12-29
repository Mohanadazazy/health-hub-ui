import { Link } from "react-router-dom";
import { MapPin, Star, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PharmacyCardProps {
  id: string;
  name: string;
  image: string;
  distance: string;
  rating: number;
  reviewCount: number;
  address: string;
  isOpen: boolean;
  categories: string[];
}

const PharmacyCard = ({
  id,
  name,
  image,
  distance,
  rating,
  reviewCount,
  address,
  isOpen,
  categories,
}: PharmacyCardProps) => {
  return (
    <div className="group bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden border border-border">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={isOpen ? "bg-success" : "bg-muted text-muted-foreground"}>
            {isOpen ? "Open" : "Closed"}
          </Badge>
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            <MapPin className="h-3 w-3 mr-1" />
            {distance}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5" />
            {address}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs font-normal">
              {category}
            </Badge>
          ))}
        </div>

        {/* Action */}
        <Link to={`/pharmacy/${id}`}>
          <Button variant="outline" className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground">
            View Pharmacy
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PharmacyCard;
