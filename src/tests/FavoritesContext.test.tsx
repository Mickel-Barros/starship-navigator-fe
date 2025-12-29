import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '@/context/FavoritesContext';
import { Starship } from '@/types/starship';
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

const starship: any = {
  name: 'X-Wing',
  model: 'T-65',
  manufacturer: 'Incom Corporation',
  cost_in_credits: '149999',
  length: '12.5',
  crew: '1',
  passengers: '0',
  max_atmosphering_speed: '1050',
  hyperdrive_rating: '1.0',
  starship_class: 'Starfighter',
  url: 'https://swapi.dev/api/starships/12/',
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a favorite starship', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].name).toBe('X-Wing');
    expect(result.current.favorites[0].notes).toBe('');
  });

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
      result.current.addFavorite(starship);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    act(() => {
      result.current.removeFavorite(starship.url);
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it('checks if a starship is favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    expect(result.current.isFavorite(starship.url)).toBe(true);
    expect(result.current.isFavorite('invalid-url')).toBe(false);
  });

  it('updates notes of a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    act(() => {
      result.current.updateNotes(starship.url, 'My favorite ship');
    });

    expect(result.current.favorites[0].notes).toBe('My favorite ship');
  });

  it('gets a favorite by url', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    const favorite = result.current.getFavorite(starship.url);
    expect(favorite).toBeDefined();
    expect(favorite?.name).toBe('X-Wing');
  });

  it('returns undefined when getting a non-existing favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    const favorite = result.current.getFavorite('invalid-url');
    expect(favorite).toBeUndefined();
  });

  it('persists favorites in localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(starship);
    });

    const stored = JSON.parse(
      localStorage.getItem('starwars-favorites') || '[]'
    );

    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('X-Wing');
  });

  it('throws error if useFavorites is used outside provider', () => {
    const { result } = renderHook(() => {
      try {
        return useFavorites();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toMatch(
      /useFavorites must be used within a FavoritesProvider/
    );
  });
});
