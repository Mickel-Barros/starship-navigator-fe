import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/components/ErrorBoundary"; 
import React from 'react';


const ThrowError = () => {
  throw new Error("Test error");
};

const NormalComponent = () => <div>Everything is fine!</div>;

describe("ErrorBoundary", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Everything is fine!")).toBeInTheDocument();
  });

  it("renders fallback UI when child throws an error", () => {
    const fallbackText = "Custom fallback message";

    render(
      <ErrorBoundary fallback={<div>{fallbackText}</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });

  it("renders default fallback UI when no fallback prop is provided", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByText("Please refresh the page.")).toBeInTheDocument();
  });

  it("logs the error to console when an error is caught", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "ErrorBoundary caught:",
      expect.objectContaining({
        message: "Test error",
      })
    );

    consoleErrorSpy.mockRestore();
  });

  it("does not render fallback when children do not throw", () => {
    render(
      <ErrorBoundary fallback={<div>Should not appear</div>}>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.queryByText("Should not appear")).not.toBeInTheDocument();
    expect(screen.getByText("Everything is fine!")).toBeInTheDocument();
  });

  it("updates state correctly when error occurs", () => {
    const { rerender } = render(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Everything is fine!")).toBeInTheDocument();

    rerender(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Fallback")).toBeInTheDocument();
  });
});