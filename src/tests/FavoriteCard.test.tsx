import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteCard } from '@/components/FavoriteCard';
import { useFavorites } from '@/context/FavoritesContext';
import { FavoriteStarship } from '@/types/starship';
import React from 'react';


vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: vi.fn(),
}));


vi.mock('@/components/StarRating', () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{rating}</div>
  ),
}));

const mockStarship = {
  name: 'X-Wing',
  manufacturer: 'Incom Corporation',
  hyperdrive_rating: '1.0',
  passengers: '0',
  url: 'https://swapi.dev/api/starships/12/',
  notes: 'Fast and agile',
} as unknown as FavoriteStarship;

describe('FavoriteCard component', () => {
  const removeFavorite = vi.fn();
  const updateNotes = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFavorites).mockReturnValue({
      removeFavorite,
      updateNotes,
      favorites: [],
      addFavorite: vi.fn(),
      isFavorite: vi.fn().mockReturnValue(true),
      getFavorite: vi.fn(),
    });
  });

  it('renders starship name, manufacturer and passengers', () => {
    render(<FavoriteCard starship={mockStarship} />);

    expect(screen.getByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText('Incom Corporation')).toBeInTheDocument();
    expect(screen.getByText('Passengers: 0')).toBeInTheDocument();
  });

  it('renders correct star rating based on hyperdrive rating', () => {
    render(<FavoriteCard starship={mockStarship} />);

    // hyperdrive 1.0 → 5 stars
    expect(screen.getByTestId('star-rating')).toHaveTextContent('5');
  });

  it('defaults star rating to 4 when hyperdrive rating is invalid', () => {
    render(
      <FavoriteCard
        starship={{ ...mockStarship, hyperdrive_rating: 'unknown' }}
      />
    );

    expect(screen.getByTestId('star-rating')).toHaveTextContent('4');
  });

  it.each([
    ['2', '4'],
    ['3', '3'],
    ['4', '2'],
    ['5', '1'],
  ])(
    'returns %s stars for hyperdrive rating %s',
    (hyperdrive, expectedRating) => {
      render(
        <FavoriteCard
          starship={{ ...mockStarship, hyperdrive_rating: hyperdrive }}
        />
      );

      expect(screen.getByTestId('star-rating')).toHaveTextContent(
        expectedRating
      );
    }
  );

  it('shows "Unknown" passengers for n/a or unknown values', () => {
    render(
      <FavoriteCard
        starship={{ ...mockStarship, passengers: 'n/a' }}
      />
    );

    expect(
      screen.getByText('Passengers: Unknown')
    ).toBeInTheDocument();
  });

  it('calls removeFavorite when clicking heart button', () => {
    render(<FavoriteCard starship={mockStarship} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(removeFavorite).toHaveBeenCalledWith(mockStarship.url);
  });

  it('renders textarea with notes and updates notes on change', () => {
    render(<FavoriteCard starship={mockStarship} />);

    const textarea = screen.getByPlaceholderText(
      'I love the design on this one! 🚀'
    ) as HTMLTextAreaElement;

    expect(textarea.value).toBe('Fast and agile');

    fireEvent.change(textarea, {
      target: { value: 'Updated notes' },
    });

    expect(updateNotes).toHaveBeenCalledWith(
      mockStarship.url,
      'Updated notes'
    );
  });
});
