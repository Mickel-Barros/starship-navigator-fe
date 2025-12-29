import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NotFound from '@/pages/NotFound';
import React from 'react';


describe('NotFound page', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders 404 page content correctly', () => {
    render(
      <MemoryRouter initialEntries={['/rota-inexistente']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('logs an error with the attempted route', () => {
    const path = '/alguma-rota-errada';

    render(
      <MemoryRouter initialEntries={[path]}>
        <NotFound />
      </MemoryRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      path
    );
  });
});
