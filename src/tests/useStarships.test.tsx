import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStarships } from "@/hooks/useStarships";
import { rateLimit } from "@/lib/rateLimiter";
import React from 'react';

vi.mock("@/lib/rateLimiter", () => ({
  rateLimit: vi.fn(),
}));


function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    }
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useStarships hook", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("calls rateLimit before making the request", async () => {
    const mockData = { count: 0, next: null, previous: null, results: [] };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response)
    );

    const { result } = renderHook(() => useStarships(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(rateLimit).toHaveBeenCalledTimes(1);
  });

  it("fetches starships from the correct URL and returns data on success", async () => {
    const mockData = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: "Millennium Falcon", manufacturer: "Corellian Engineering" },
        { name: "X-wing", manufacturer: "Incom Corporation" },
      ],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response)
    );

    const { result } = renderHook(() => useStarships(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "https://swapi.info/api/starships",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });

  it("enters loading state initially", () => {
    const { result } = renderHook(() => useStarships(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);
  });

it("handles fetch error when response is not ok", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response)
  );

  const { result } = renderHook(() => useStarships(), { wrapper: createWrapper() });

  await waitFor(() => expect(result.current).not.toBeNull());
  await waitFor(() => expect(result.current!.isError).toBe(true), {
    timeout: 10000, 
  });

  expect(result.current!.error?.message).toBe("Failed to fetch starships");
});

it("handles timeout (AbortError)", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockRejectedValue(new DOMException("The operation was aborted", "AbortError"))
  );

  const { result } = renderHook(() => useStarships(), { wrapper: createWrapper() });

  await waitFor(() => expect(result.current).not.toBeNull());
  await waitFor(() => expect(result.current!.isError).toBe(true), {
    timeout: 10000,
  });

  expect(result.current!.error?.message).toBe("Request timeout. Please try again.");
});

  it("retries up to 3 times on failure", async () => {
    let callCount = 0;

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount < 4) {
          throw new Error("Network error");
        }
        return {
          ok: true,
          json: async () => ({ count: 0, results: [] }),
        } as Response;
      })
    );

    const wrapper = createWrapper();

    const { result } = renderHook(() => useStarships(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 10000,
    });

    expect(callCount).toBe(4);
  });

  it("respects staleTime and does not refetch immediately after success", async () => {
    const mockData = { count: 1, results: [{ name: "Naboo starfighter" }] };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response)
    );

    const { result, rerender } = renderHook(() => useStarships(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    rerender();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});