export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML.trim();
}

export function limitLength(input: string, maxLength: number): string {
  return input.slice(0, maxLength);
}

export function removeSpecialChars(input: string): string {
  return input.replace(/[^a-zA-Z0-9\s.,!?-]/g, '');
}

export function sanitizeSafe(input: string, maxLength = 200): string {
  let sanitized = sanitizeInput(input);
  sanitized = removeSpecialChars(sanitized);
  sanitized = limitLength(sanitized, maxLength);
  return sanitized;
}
