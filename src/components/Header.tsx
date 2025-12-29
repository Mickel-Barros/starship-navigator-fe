import { Link, useLocation } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/button";
import starshipLogo from "@/assets/starship-logo.png";

export function Header() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const isFavoritesPage = location.pathname === "/favorites";

  return (
    <header className="w-full py-4">
      <div className="container flex items-center justify-between">
        <Link to="/starships" className="flex items-center gap-2">
          <img
            src={starshipLogo}
            alt="Starship Logo"
            className="w-10 h-10 object-contain"
          />
        </Link>

        {!isFavoritesPage && (
          <Button
            asChild
            variant="outline"
            className="gap-2 border-transparent text-primary hover:bg-primary/10 rounded-full px-5"
          >
            <Link to="/favorites">
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.125 14.7917H2.29167C1.84964 14.7917 1.42572 14.6161 1.11316 14.3035C0.800595 13.991 0.625 13.567 0.625 13.125V2.29167C0.625 1.375 1.375 0.625 2.29167 0.625H5.56667C5.84118 0.62642 6.11109 0.695625 6.35242 0.826466C6.59375 0.957307 6.79902 1.14573 6.95 1.375L7.63333 2.375C7.78431 2.60427 7.98959 2.79269 8.23091 2.92353C8.47224 3.05437 8.74215 3.12358 9.01667 3.125H15.625C16.067 3.125 16.4909 3.30059 16.8035 3.61316C17.1161 3.92572 17.2917 4.34964 17.2917 4.79167V6.04167M16.7 9.54167C16.416 9.25911 16.0547 9.06712 15.6616 8.98998C15.2685 8.91285 14.8613 8.95404 14.4917 9.10833C14.2417 9.20833 14.0167 9.35833 13.825 9.55L13.5417 9.83333L13.25 9.55C12.967 9.26604 12.606 9.07249 12.2129 8.99386C11.8198 8.91523 11.4121 8.95508 11.0417 9.10833C10.7917 9.20833 10.575 9.35833 10.3833 9.55C9.59167 10.3333 9.55 11.6583 10.55 12.6667L13.5417 15.625L16.5417 12.6667C17.5417 11.6583 17.4917 10.3333 16.7 9.55V9.54167Z" stroke="#FF6871" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              View Favorites
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export function PageTitle({
  title,
  showBack = false,
}: {
  title: string;
  showBack?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {showBack && (
      <Link
        to="/starships"
        className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          border border-muted-foreground
          bg-transparent
          hover:bg-secondary/80
          transition-colors
        "
      >
        <ArrowLeft className="h-5 w-5 text-[#FF6871]" />
      </Link>

      )}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">
        {title}
      </h1>
    </div>
  );
}
