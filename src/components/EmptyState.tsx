import { Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "favorites" | "error" | "no-results";
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ type, message }: EmptyStateProps) {
  if (type === "favorites") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          No Favorites Yet
        </h2>
        <p className="text-muted-foreground max-w-md mb-6">
          Start exploring and add some starships to your favorites collection.
        </p>
        <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
          <Link to="/starships">
            <Rocket className="h-4 w-4" />
            Browse Starships
          </Link>
        </Button>
      </div>
    );
  }

  if (type === "no-results") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Rocket className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          No Results Found
        </h2>
        <p className="text-muted-foreground max-w-md">
          {message || "Try adjusting your search terms."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <Rocket className="h-16 w-16 text-destructive/30 mb-4" />
      <h2 className="text-xl font-bold text-foreground mb-2">
        Something Went Wrong
      </h2>
      <p className="text-muted-foreground max-w-md mb-6">
        {message || "Failed to load starships. Please try again."}
      </p>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}
