import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import StarshipsPage from '@/pages/StarshipsPage';

vi.mock('@/hooks/useStarships', () => ({
  useStarships: vi.fn(),
}));

vi.mock('@/components/Header', () => ({
  Header: () => <div data-testid="header" />,
  PageTitle: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock('@/components/SearchBar', () => ({
  SearchBar: ({ value, onChange }: any) => (
    <input
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock('@/components/StarshipCard', () => ({
  StarshipCard: ({ starship }: any) => (
    <div data-testid="starship-card">{starship.name}</div>
  ),
}));

vi.mock('@/components/LoadingSkeleton', () => ({
  LoadingSkeleton: () => <div>Loading...</div>,
}));

vi.mock('@/components/EmptyState', () => ({
  EmptyState: ({ type, message }: any) => (
    <div data-testid={`empty-${type}`}>{message}</div>
  ),
}));

vi.mock('@/components/MobileNav', () => ({
  MobileNav: () => <div data-testid="mobile-nav" />,
}));

vi.mock('@/components/Pagination', () => ({
  Pagination: ({ onPageChange }: any) => (
    <button onClick={() => onPageChange(2)}>Next Page</button>
  ),
}));

import { useStarships } from '@/hooks/useStarships';

const mockStarships = Array.from({ length: 15 }).map((_, i) => ({
  url: `url-${i}`,
  name: `Starship ${i}`,
  manufacturer: 'Corellian Engineering Corporation',
}));

describe('StarshipsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('renders loading state', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Network error' },
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-error')).toHaveTextContent('Network error');
  });

  it('renders starship list', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: mockStarships,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Starship List')).toBeInTheDocument();
    expect(screen.getAllByTestId('starship-card')).toHaveLength(10);
  });

  it('filters starships by search', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: mockStarships,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Starship 1' },
    });

    expect(screen.getAllByTestId('starship-card').length).toBeGreaterThan(0);
    expect(screen.queryByText('Starship 5')).not.toBeInTheDocument();
  });

  it('shows no-results empty state when search matches nothing', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: mockStarships,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'batata' },
    });

    expect(screen.getByTestId('empty-no-results')).toHaveTextContent(
      'No starships found matching your search.'
    );
  });

  it('changes page and scrolls to top', () => {
    vi.mocked(useStarships).mockReturnValue({
      data: mockStarships,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StarshipsPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next Page'));

    expect(window.scrollTo).toHaveBeenCalled();
  });
});
