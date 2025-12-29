import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Input } from '@/components/ui/input';

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('passes type prop correctly', () => {
    render(<Input type="email" placeholder="Email" />);

    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('merges custom className with default classes', () => {
    render(<Input data-testid="input" className="custom-class" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass('h-10');
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes other props to input element', () => {
    render(
      <Input
        placeholder="Name"
        disabled
        value="Luke"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Name') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.value).toBe('Luke');
  });
});
