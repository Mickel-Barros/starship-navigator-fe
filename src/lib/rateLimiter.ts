let lastRequestTime = 0;
const MIN_INTERVAL = 5000;

export function rateLimit() {
  const now = Date.now();

  if (now - lastRequestTime < MIN_INTERVAL) {
    throw new Error('Too many requests. Please wait.');
  }

  lastRequestTime = now;
}
