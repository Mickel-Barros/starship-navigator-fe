import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header, PageTitle } from '@/components/Header';
import React from 'react';


vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: vi.fn(),
    updateNotes: vi.fn(),
    getFavorite: vi.fn(),
  }),
}));

vi.mock('@/assets/starship-logo.png', () => ({
  default: 'logo.png',
}));

function renderHeader(pathname = '/starships') {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header component', () => {
  it('renders the logo', () => {
    renderHeader();

    expect(
      screen.getByAltText('Starship Logo')
    ).toBeInTheDocument();
  });

  it('shows "View Favorites" button when not on favorites page', () => {
    renderHeader('/starships');

    expect(
      screen.getByRole('link', { name: /view favorites/i })
    ).toBeInTheDocument();
  });

  it('hides "View Favorites" button on favorites page', () => {
    renderHeader('/favorites');

    expect(
      screen.queryByRole('link', { name: /view favorites/i })
    ).not.toBeInTheDocument();
  });
});

describe('PageTitle component', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <PageTitle title="Starships" />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Starships' })
    ).toBeInTheDocument();
  });

  it('renders back button when showBack is true', () => {
    render(
      <MemoryRouter>
        <PageTitle title="Favorites" showBack />
      </MemoryRouter>
    );

    const backLink = screen.getByRole('link');
    expect(backLink).toHaveAttribute('href', '/starships');
  });

  it('does not render back button when showBack is false', () => {
    render(
      <MemoryRouter>
        <PageTitle title="Favorites" />
      </MemoryRouter>
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
