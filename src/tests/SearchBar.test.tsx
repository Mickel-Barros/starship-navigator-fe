import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/SearchBar';
import React from 'react';


vi.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

describe('SearchBar component', () => {
  it('renders input with default placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('renders input with custom placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        placeholder="Search starships"
      />
    );

    expect(
      screen.getByPlaceholderText('Search starships')
    ).toBeInTheDocument();
  });

  it('renders controlled value', () => {
    render(
      <SearchBar
        value="Falcon"
        onChange={vi.fn()}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Falcon');
  });

  it('calls onChange with new value when typing', () => {
    const onChange = vi.fn();

    render(
      <SearchBar
        value=""
        onChange={onChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'X-Wing' } });

    expect(onChange).toHaveBeenCalledWith('X-Wing');
  });

  it('renders search icon', () => {
    const { container } = render(
      <SearchBar
        value=""
        onChange={vi.fn()}
      />
    );

    // lucide renderiza um svg
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
