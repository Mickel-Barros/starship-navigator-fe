import { Heart } from "lucide-react";
import { FavoriteStarship } from "@/types/starship";
import { useFavorites } from "@/context/FavoritesContext";
import { StarRating } from "@/components/StarRating";
import { Textarea } from "@/components/ui/textarea";
import starshipImage from "@/assets/starship-placeholder.png";

interface FavoriteCardProps {
  starship: FavoriteStarship;
  index?: number;
}

export function FavoriteCard({ starship, index = 0 }: FavoriteCardProps) {
  const { removeFavorite, updateNotes } = useFavorites();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(starship.url);
  };

  const getStarRating = () => {
    const hyperdrive = parseFloat(starship.hyperdrive_rating);
    if (isNaN(hyperdrive)) return 4;
    if (hyperdrive <= 1) return 5;
    if (hyperdrive <= 2) return 4;
    if (hyperdrive <= 3) return 3;
    if (hyperdrive <= 4) return 2;
    return 1;
  };

  const getPassengers = () => {
    if (starship.passengers === "n/a" || starship.passengers === "unknown") {
      return "Unknown";
    }
    return starship.passengers.replace(/,/g, "");
  };

  return (
    <div
      className="relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 order-2 md:order-1">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
            {starship.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {starship.manufacturer}
          </p>
          <div className="mb-3">
            <StarRating rating={getStarRating()} />
          </div>
          <p className="text-sm text-foreground mb-4">
            Passengers: {getPassengers()}
          </p>
          <div className="bg-muted rounded-lg p-3">
            <Textarea
              placeholder="I love the design on this one! 🚀"
              value={starship.notes}
              onChange={(e) => updateNotes(starship.url, e.target.value)}
              className="min-h-[60px] resize-none bg-transparent border-0 p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60 text-sm"
            />
          </div>
        </div>
        <div className="relative w-full md:w-36 h-32 md:h-auto order-1 md:order-2">
          <img
            src={starshipImage}
            alt={starship.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-all hover:scale-110"
          >
            <Heart className="h-5 w-5 fill-heart text-heart" />
          </button>
        </div>
      </div>
    </div>
  );
}
