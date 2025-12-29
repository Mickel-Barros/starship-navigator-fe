import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/Pagination';
import React from 'react';


describe('Pagination component', () => {
  it('renders Previous and Next buttons', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        hasPrevious={false}
        hasNext={true}
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
  it('shows last pages correctly when currentPage is near the end', () => {
  render(
    <Pagination
      currentPage={9}
      totalPages={10}
      onPageChange={vi.fn()}
      hasPrevious={true}
      hasNext={true}
    />
  );

  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('9')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getAllByText('…').length).toBeGreaterThan(0);
});


  it('disables Previous button when hasPrevious is false', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        hasPrevious={false}
        hasNext={true}
      />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next button when hasNext is false', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={vi.fn()}
        hasPrevious={true}
        hasNext={false}
      />
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange when clicking Previous and Next', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
        hasPrevious={true}
        hasNext={true}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders correct page numbers when totalPages <= 3', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        hasPrevious={false}
        hasNext={true}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders ellipsis when there are many pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={vi.fn()}
        hasPrevious={true}
        hasNext={true}
      />
    );

    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('calls onPageChange when clicking a page number', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        hasPrevious={true}
        hasNext={true}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables page buttons when isLoading is true', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={vi.fn()}
        hasPrevious={true}
        hasNext={true}
        isLoading
      />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('2')).toBeDisabled();
  });
});
