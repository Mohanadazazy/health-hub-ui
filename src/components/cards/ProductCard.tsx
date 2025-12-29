import { ShoppingCart, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  category: string;
  pharmacyName?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  inStock,
  category,
  pharmacyName,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden border border-border">
      {/* Image */}
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-accent">
            -{discount}%
          </Badge>
        )}
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        
        {!inStock && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Badge variant="secondary" className="text-xs font-normal">
          {category}
        </Badge>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-card-foreground line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {pharmacyName && (
          <p className="text-xs text-muted-foreground">{pharmacyName}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            size="icon"
            variant={inStock ? "default" : "secondary"}
            disabled={!inStock}
            className="h-9 w-9 rounded-full"
          >
            {inStock ? <Plus className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
