import { useState, useMemo } from "react";
import { Header, PageTitle } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FavoriteCard } from "@/components/FavoriteCard";
import { EmptyState } from "@/components/EmptyState";
import { MobileNav } from "@/components/MobileNav";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    
    return favorites.filter(
      (starship) =>
        starship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        starship.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [favorites, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1 container py-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <PageTitle title="Favorites" showBack />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search"
          />
        </div>

        {favorites.length === 0 ? (
          <EmptyState type="favorites" />
        ) : filteredFavorites.length === 0 ? (
          <EmptyState
            type="no-results"
            message="No favorites found matching your search."
          />
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filteredFavorites.map((starship, index) => (
              <FavoriteCard
                key={starship.url}
                starship={starship}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
