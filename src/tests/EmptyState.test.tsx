import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { EmptyState } from '@/components/EmptyState';
import React from 'react';

describe('EmptyState component', () => {
  it('renders favorites empty state correctly', () => {
    render(
      <MemoryRouter>
        <EmptyState type="favorites" />
      </MemoryRouter>
    );

    expect(screen.getByText('No Favorites Yet')).toBeInTheDocument();
    expect(
      screen.getByText(/add some starships to your favorites/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /browse starships/i });
    expect(link).toHaveAttribute('href', '/starships');
  });

  it('renders no-results empty state with default message', () => {
    render(<EmptyState type="no-results" />);

    expect(screen.getByText('No Results Found')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your search terms.')
    ).toBeInTheDocument();
  });

  it('renders no-results empty state with custom message', () => {
    const message = 'Nothing matched your search';

    render(<EmptyState type="no-results" message={message} />);

    expect(screen.getByText('No Results Found')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders error empty state with default message', () => {
    render(<EmptyState type="error" />);

    expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/failed to load starships/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

it('renders error empty state with custom message and reloads page', () => {
  const reloadMock = vi.fn();

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      reload: reloadMock,
    },
  });

  const message = 'Custom error message';

  render(<EmptyState type="error" message={message} />);

  expect(screen.getByText(message)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /try again/i }));

  expect(reloadMock).toHaveBeenCalled();
});

});
