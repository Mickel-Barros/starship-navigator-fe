import { useQuery } from '@tanstack/react-query';
import { StarshipsResponse } from '@/types/starship';
import { rateLimit } from '@/lib/rateLimiter';

const fetchStarships = async (): Promise<StarshipsResponse> => {
  rateLimit();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('https://swapi.info/api/starships', {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch starships');
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

export function useStarships() {
  return useQuery({
    queryKey: ['starships'],
    queryFn: fetchStarships,
    retry: 3,
    retryDelay: attempt => Math.min(1000 * attempt, 3000),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
