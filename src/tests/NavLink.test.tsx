import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import React from 'react';


function renderWithRouter(initialPath: string, linkTo: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/"
          element={
            <NavLink
              to={linkTo}
              className="base"
              activeClassName="active"
              pendingClassName="pending"
            >
              Home
            </NavLink>
          }
        />
        <Route path="/about" element={<div>About page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('NavLink component', () => {
  it('renders link text', () => {
    renderWithRouter('/', '/about');

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies base className', () => {
    renderWithRouter('/', '/about');

    const link = screen.getByRole('link');
    expect(link).toHaveClass('base');
  });

  it('does NOT apply activeClassName when route is not active', () => {
    renderWithRouter('/', '/about');

    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('active');
  });

  it('applies activeClassName when route is active', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route
            path="/about"
            element={
              <NavLink
                to="/about"
                className="base"
                activeClassName="active"
              >
                About
              </NavLink>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('active');
  });

  it('combines base and active classes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route
            path="/about"
            element={
              <NavLink
                to="/about"
                className="base"
                activeClassName="active"
              >
                About
              </NavLink>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('base');
    expect(link).toHaveClass('active');
  });
});
