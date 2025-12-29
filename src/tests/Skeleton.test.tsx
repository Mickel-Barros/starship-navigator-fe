import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';


describe('Skeleton component', () => {
  it('renders a div element', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.tagName).toBe('DIV');
  });

  it('applies default skeleton classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('rounded-md');
    expect(skeleton).toHaveClass('bg-muted');
  });

  it('merges custom className with default classes', () => {
    render(
      <Skeleton
        data-testid="skeleton"
        className="h-6 w-full custom-class"
      />
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
    expect(skeleton).toHaveClass('h-6');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('passes other div props correctly', () => {
    render(
      <Skeleton
        data-testid="skeleton"
        role="status"
        aria-label="loading"
      />
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'loading');
  });
});
