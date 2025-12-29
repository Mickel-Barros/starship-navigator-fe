import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIsMobile } from '@/hooks/useMobile';
import React from 'react';

describe('use-m,obile hook', () => {
  let addEventListenerSpy: any;
  let removeEventListenerSpy: any;
  let listeners: Record<string, Function> = {};

  beforeEach(() => {
    listeners = {};

    addEventListenerSpy = vi.fn((event, cb) => {
      listeners[event] = cb;
    });

    removeEventListenerSpy = vi.fn((event) => {
      delete listeners[event];
    });

    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    })));
  });

  it('returns true when screen width is mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('returns false when screen width is desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('updates value on resize (media query change)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 500;
      listeners.change();
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });
});
