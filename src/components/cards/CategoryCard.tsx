import { LucideIcon, Pill, Heart, Thermometer, Bandage, Sparkles, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  productCount: number;
  icon?: string;
  onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  "Pain Relief": Pill,
  "Cold & Flu": Thermometer,
  "Vitamins": Apple,
  "First Aid": Bandage,
  "Skin Care": Sparkles,
  "Digestive": Heart,
};

const CategoryCard = ({
  id,
  name,
  productCount,
  onClick,
}: CategoryCardProps) => {
  const Icon = iconMap[name] || Pill;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full bg-card rounded-2xl shadow-card hover:shadow-elevated",
        "transition-all duration-300 overflow-hidden border border-border",
        "p-6 text-left hover:border-primary/50"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {productCount} products
          </p>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
