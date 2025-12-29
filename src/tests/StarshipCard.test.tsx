import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarshipCard } from '@/components/StarshipCard';
import { useFavorites } from '@/context/FavoritesContext';
import React from 'react';
import { FavoriteStarship } from '@/types/starship';

vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: vi.fn(),
}));

vi.mock('@/components/StarRating', () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{rating}</div>
  ),
}));

const mockStarship = {
  name: 'Millennium Falcon',
  manufacturer: 'Corellian Engineering Corporation',
  hyperdrive_rating: '0.5',
  passengers: '6',
  url: 'https://swapi.dev/api/starships/10/',
} as unknown as FavoriteStarship;

describe('StarshipCard component', () => {
  const addFavorite = vi.fn();
  const removeFavorite = vi.fn();
  const isFavorite = vi.fn();

 beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFavorites).mockReturnValue({
      addFavorite,
      removeFavorite,
      isFavorite,
      favorites: [], 
      updateNotes: vi.fn(),
      getFavorite: vi.fn(),
    });
  });

  it('renders starship name, manufacturer and passengers', () => {
    isFavorite.mockReturnValue(false);

    render(<StarshipCard starship={mockStarship} />);

    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
    expect(
      screen.getByText('Corellian Engineering Corporation')
    ).toBeInTheDocument();
    expect(screen.getByText('Passengers: 6')).toBeInTheDocument();
  });

  it('renders correct star rating based on hyperdrive rating', () => {
    isFavorite.mockReturnValue(false);

    render(<StarshipCard starship={mockStarship} />);

    expect(screen.getByTestId('star-rating')).toHaveTextContent('5');
  });

  it('defaults star rating to 4 when hyperdrive rating is invalid', () => {
    isFavorite.mockReturnValue(false);

    render(
      <StarshipCard
        starship={{ ...mockStarship, hyperdrive_rating: 'unknown' }}
      />
    );

    expect(screen.getByTestId('star-rating')).toHaveTextContent('4');
  });

  it('shows "Unknown" passengers for n/a or unknown values', () => {
    isFavorite.mockReturnValue(false);

    render(
      <StarshipCard
        starship={{ ...mockStarship, passengers: 'n/a' }}
      />
    );

    expect(screen.getByText('Passengers: Unknown')).toBeInTheDocument();
  });

  it('calls addFavorite when clicking heart and starship is not favorite', () => {
    isFavorite.mockReturnValue(false);

    render(<StarshipCard starship={mockStarship} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(addFavorite).toHaveBeenCalledWith(mockStarship);
    expect(removeFavorite).not.toHaveBeenCalled();
  });

  it('calls removeFavorite when clicking heart and starship is favorite', () => {
    isFavorite.mockReturnValue(true);

    render(<StarshipCard starship={mockStarship} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(removeFavorite).toHaveBeenCalledWith(mockStarship.url);
    expect(addFavorite).not.toHaveBeenCalled();
  });

  it('renders filled heart when starship is favorite', () => {
    isFavorite.mockReturnValue(true);

    render(<StarshipCard starship={mockStarship} />);

    const heart = screen.getByRole('button').querySelector('svg');
    expect(heart).toHaveClass('fill-white');
  });
  it.each([
  ['1.5', '4'],
  ['2.5', '3'],
  ['3.5', '2'],
  ['5', '1'],
])(
  'returns %s stars for hyperdrive rating %s',
  (hyperdrive, expectedRating) => {
    isFavorite.mockReturnValue(false);

    render(
      <StarshipCard
        starship={{
          ...mockStarship,
          hyperdrive_rating: hyperdrive,
        }}
      />
    );

    expect(screen.getByTestId('star-rating')).toHaveTextContent(expectedRating);
  }
);

});
