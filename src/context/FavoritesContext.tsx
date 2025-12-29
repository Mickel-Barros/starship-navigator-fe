import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Starship, FavoriteStarship } from "@/types/starship";

interface FavoritesContextType {
  favorites: FavoriteStarship[];
  addFavorite: (starship: Starship) => void;
  removeFavorite: (starshipUrl: string) => void;
  isFavorite: (starshipUrl: string) => boolean;
  updateNotes: (starshipUrl: string, notes: string) => void;
  getFavorite: (starshipUrl: string) => FavoriteStarship | undefined;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "starwars-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteStarship[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (starship: Starship) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.url === starship.url)) return prev;
      return [...prev, { ...starship, notes: "" }];
    });
  };

  const removeFavorite = (starshipUrl: string) => {
    setFavorites((prev) => prev.filter((f) => f.url !== starshipUrl));
  };

  const isFavorite = (starshipUrl: string) => {
    return favorites.some((f) => f.url === starshipUrl);
  };

  const updateNotes = (starshipUrl: string, notes: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.url === starshipUrl ? { ...f, notes } : f))
    );
  };

  const getFavorite = (starshipUrl: string) => {
    return favorites.find((f) => f.url === starshipUrl);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        updateNotes,
        getFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
