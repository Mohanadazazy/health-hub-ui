import { useState } from "react";
import { Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SearchFiltersProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

const categories = [
  "Pain Relief",
  "Cold & Flu",
  "Vitamins",
  "First Aid",
  "Skin Care",
  "Digestive Health",
  "Allergy",
  "Diabetes Care",
];

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distance, setDistance] = useState([10]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const activeFiltersCount =
    selectedCategories.length +
    (distance[0] !== 10 ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 100 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setDistance([10]);
    setPriceRange([0, 100]);
    setInStockOnly(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <span className="font-semibold">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-primary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Filters Content */}
      <div className={`space-y-6 mt-4 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
            Categories
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Distance */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
            Distance
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 px-1">
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={50}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 km</span>
              <span className="font-medium text-foreground">{distance[0]} km</span>
              <span>50 km</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
            Price Range
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 px-1">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <span className="text-sm font-medium">In Stock Only</span>
          </label>
        </div>

        {/* Apply Button */}
        <Button className="w-full" onClick={() => onFilterChange?.({})}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
