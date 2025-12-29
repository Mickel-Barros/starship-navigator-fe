import { Link, useLocation } from "react-router-dom";
import { Rocket, Heart } from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/starships"
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            location.pathname === "/starships"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Rocket className="h-5 w-5" />
          <span className="text-xs">Starship List</span>
        </Link>

        <Link
          to="/favorites"
          className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
            location.pathname === "/favorites"
              ? "text-[#FF6871]"
              : "text-muted-foreground"
          }`}
        >
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.125 14.7917H2.29167C1.84964 14.7917 1.42572 14.6161 1.11316 14.3035C0.800595 13.991 0.625 13.567 0.625 13.125V2.29167C0.625 1.375 1.375 0.625 2.29167 0.625H5.56667C5.84118 0.62642 6.11109 0.695625 6.35242 0.826466C6.59375 0.957307 6.79902 1.14573 6.95 1.375L7.63333 2.375C7.78431 2.60427 7.98959 2.79269 8.23091 2.92353C8.47224 3.05437 8.74215 3.12358 9.01667 3.125H15.625C16.067 3.125 16.4909 3.30059 16.8035 3.61316C17.1161 3.92572 17.2917 4.34964 17.2917 4.79167V6.04167M16.7 9.54167C16.416 9.25911 16.0547 9.06712 15.6616 8.98998C15.2685 8.91285 14.8613 8.95404 14.4917 9.10833C14.2417 9.20833 14.0167 9.35833 13.825 9.55L13.5417 9.83333L13.25 9.55C12.967 9.26604 12.606 9.07249 12.2129 8.99386C11.8198 8.91523 11.4121 8.95508 11.0417 9.10833C10.7917 9.20833 10.575 9.35833 10.3833 9.55C9.59167 10.3333 9.55 11.6583 10.55 12.6667L13.5417 15.625L16.5417 12.6667C17.5417 11.6583 17.4917 10.3333 16.7 9.55V9.54167Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs">Favorites</span>
</Link>

      </div>
    </nav>
  );
}
