import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StarRating } from '@/components/StarRating';
import React from 'react';


describe('StarRating component', () => {
  it('renders default rating (4) with 5 stars', () => {
    const { container } = render(<StarRating />);

    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(4);
  });

  it('renders correct number of filled stars based on rating', () => {
    const { container } = render(<StarRating rating={3} />);

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(3);
  });

  it('rounds rating to nearest integer', () => {
    const { container } = render(<StarRating rating={2.6} />);

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(3);
  });

  it('ensures at least 1 star is filled', () => {
    const { container } = render(<StarRating rating={0} />);

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(1);
  });

  it('does not exceed maxRating', () => {
    const { container } = render(
      <StarRating rating={10} maxRating={5} />
    );

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(5);
  });

  it('renders custom maxRating', () => {
    const { container } = render(
      <StarRating rating={2} maxRating={3} />
    );

    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(3);

    const filledStars = container.querySelectorAll('.fill-star');
    expect(filledStars).toHaveLength(2);
  });
});
