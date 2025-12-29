import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import FavoritesPage from '@/pages/FavoritesPage';
import { useFavorites } from '@/context/FavoritesContext';

vi.mock('@/components/Header', () => ({
  Header: () => <div data-testid="header" />,
  PageTitle: ({ children }: { children: React.ReactNode }) => (
    <h1>{children}</h1>
  ),
}));

vi.mock('@/components/SearchBar', () => ({
  SearchBar: ({ value = '', onChange }: any) => (
    <input
      placeholder="Search"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

vi.mock('@/components/FavoriteCard', () => ({
  FavoriteCard: ({ starship }: any) => (
    <div data-testid="favorite-card">{starship.name}</div>
  ),
}));

vi.mock('@/context/FavoritesContext', async () => {
  const actual = await vi.importActual<any>('@/context/FavoritesContext');
  return {
    ...actual,
    useFavorites: vi.fn(),
  };
});

const mockUseFavorites = (favorites: any[]) => {
  vi.mocked(useFavorites).mockReturnValue({
    favorites,
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: vi.fn(),
    updateNotes: vi.fn(),
    getFavorite: vi.fn(),
  });
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <FavoritesPage />
    </MemoryRouter>
  );

describe('FavoritesPage', () => {
  const mockFavorites = [
    {
      url: 'https://swapi.dev/api/starships/9/',
      name: 'Death Star',
      manufacturer: 'Imperial Department of Military Research',
    },
    {
      url: 'https://swapi.dev/api/starships/10/',
      name: 'Millennium Falcon',
      manufacturer: 'Corellian Engineering Corporation',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title and search bar', () => {
    mockUseFavorites(mockFavorites);

    renderPage();

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders all favorite starships when there is no search', () => {
    mockUseFavorites(mockFavorites);

    renderPage();

    expect(screen.getByText('Death Star')).toBeInTheDocument();
    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
  });

  it('filters favorites based on search query (case insensitive)', async () => {
    mockUseFavorites(mockFavorites);
    const user = userEvent.setup();

    renderPage();

    const searchInput = screen.getByPlaceholderText('Search');
    await user.type(searchInput, 'falcon');

    await waitFor(() => {
      expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
      expect(screen.queryByText('Death Star')).not.toBeInTheDocument();
    });
  });

  it('shows empty state when there are no favorites', () => {
    mockUseFavorites([]);

    renderPage();

    expect(screen.getByText(/no favorites/i)).toBeInTheDocument();
  });

  it('shows no-results empty state when search returns no matches', async () => {
    mockUseFavorites(mockFavorites);
    const user = userEvent.setup();

    renderPage();

    const searchInput = screen.getByPlaceholderText('Search');
    await user.type(searchInput, 'batata');

    await waitFor(() => {
      expect(
        screen.getByText(/no favorites found matching your search/i)
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Death Star')).not.toBeInTheDocument();
    expect(screen.queryByText('Millennium Falcon')).not.toBeInTheDocument();
  });

  it('renders correct number of FavoriteCard components', () => {
    mockUseFavorites(mockFavorites);

    renderPage();

    const cards = screen.getAllByTestId('favorite-card');
    expect(cards).toHaveLength(mockFavorites.length);
  });
});
