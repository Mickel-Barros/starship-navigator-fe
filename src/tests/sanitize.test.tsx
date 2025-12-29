import { describe, it, expect } from "vitest";
import React from 'react';
import {
  sanitizeInput,
  limitLength,
  removeSpecialChars,
  sanitizeSafe,
} from "@/lib/sanitize";

describe("sanitizeInput", () => {
  it("escapes HTML special characters", () => {
    expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert('xss')&lt;/script&gt;"
    );
  });

  it("preserves plain text without changes", () => {
    expect(sanitizeInput("Hello world")).toBe("Hello world");
  });

  it("handles empty string", () => {
    expect(sanitizeInput("")).toBe("");
  });

  it("trims whitespace", () => {
    expect(sanitizeInput("   hello   ")).toBe("   hello   ".trim());
  });
});

describe("limitLength", () => {
  it("truncates string when longer than maxLength", () => {
    expect(limitLength("Hello world", 5)).toBe("Hello");
  });

  it("returns full string when shorter than maxLength", () => {
    expect(limitLength("Hi", 10)).toBe("Hi");
  });

  it("returns empty string when input is empty", () => {
    expect(limitLength("", 5)).toBe("");
  });

  it("handles maxLength = 0", () => {
    expect(limitLength("test", 0)).toBe("");
  });

  it("handles unicode characters correctly", () => {
    expect(limitLength("café", 3)).toBe("caf");
  });
});

describe("removeSpecialChars", () => {
  it("preserves allowed characters: letters, numbers, space, ., ! ? -", () => {
    expect(removeSpecialChars("Test. !? - 123")).toBe("Test. !? - 123");
  });

  it("removes emojis and unicode symbols", () => {
    expect(removeSpecialChars("Hello 🌍!")).toBe("Hello !");
  });

  it("handles empty string", () => {
    expect(removeSpecialChars("")).toBe("");
  });
});

describe("sanitizeSafe", () => {
  it("respects maxLength parameter", () => {
    const input = "This is a very long string that should be truncated";
    const result = sanitizeSafe(input, 10);

    expect(result.length).toBe(10);
    expect(result).toBe("This is a ");
  });

  it("uses default maxLength of 200 when not provided", () => {
    const longString = "a".repeat(300);
    const result = sanitizeSafe(longString);

    expect(result.length).toBe(200);
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeSafe("")).toBe("");
  });

  it("preserves safe characters after sanitization", () => {
    const safe = "Hello, world! 123 - ? .";
    expect(sanitizeSafe(safe)).toBe(safe);
  });
});