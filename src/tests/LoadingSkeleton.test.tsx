import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import React from 'react';


vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: (props: { className?: string }) => (
    <div data-testid="skeleton" className={props.className} />
  ),
}));

describe('LoadingSkeleton component', () => {
  it('renders 6 skeleton cards', () => {
    render(<LoadingSkeleton />);

    const cards = document.querySelectorAll('.bg-card');
    expect(cards).toHaveLength(6);
  });

  it('renders skeleton placeholders inside each card', () => {
    render(<LoadingSkeleton />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(54);
  });

  it('applies animation delay incrementally', () => {
    render(<LoadingSkeleton />);

    const cards = document.querySelectorAll('.bg-card');

    expect(cards[0]).toHaveStyle({ animationDelay: '0ms' });
    expect(cards[1]).toHaveStyle({ animationDelay: '50ms' });
    expect(cards[2]).toHaveStyle({ animationDelay: '100ms' });
  });
});
