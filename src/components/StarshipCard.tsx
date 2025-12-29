import { Heart } from "lucide-react";
import { Starship } from "@/types/starship";
import { useFavorites } from "@/context/FavoritesContext";
import { StarRating } from "@/components/StarRating";
import starshipImage from "@/assets/starship-placeholder.png";

interface StarshipCardProps {
  starship: Starship;
  index?: number;
}

export function StarshipCard({ starship, index = 0 }: StarshipCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(starship.url);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(starship.url);
    } else {
      addFavorite(starship);
    }
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
          <p className="text-sm text-foreground">
            Passengers: {getPassengers()}
          </p>
        </div>

        <div className="relative w-full md:w-40 lg:w-44 order-1 md:order-2">
          <div className="relative rounded-lg overflow-hidden bg-zinc-900/50 border border-zinc-700/50">
            <img
              src={starshipImage}
              alt={starship.name}
              className="w-full h-40 md:h-44 object-cover"
            />
            {/* Botão de favorito */}
            <button
              onClick={handleToggleFavorite}
              className={`
                absolute top-2 right-2
                w-10 h-10
                flex items-center justify-center
                rounded-full
                transition-all duration-300
                ${
                  isFav
                    ? "bg-[#FF6871] shadow-[0_0_15px_rgba(255,104,113,0.6)]"
                    : "bg-black/70 backdrop-blur-md border border-zinc-600"
                }
                hover:scale-110 active:scale-95
              `}
            >
              <Heart
                className={`
                  h-5 w-5
                  transition-all
                  ${
                    isFav
                      ? "fill-white text-white"
                      : "fill-none text-[#FF6871]"
                  }
                `}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
