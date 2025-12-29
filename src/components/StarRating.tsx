import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
}

export function StarRating({ rating = 4, maxRating = 5 }: StarRatingProps) {
  const fullStars = Math.min(Math.max(Math.round(rating), 1), maxRating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < fullStars
              ? "fill-star text-star"
              : "fill-muted-foreground/30 text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}
