import { useState, useEffect, useRef } from "react";

type UseDebounceReturn<T> = [T, (value: T | ((prev: T) => T)) => void, T];

function useDebounce<T>(
  initialValue: T,
  delay: number = 500
): UseDebounceReturn<T> {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(immediateValue);
    }, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [immediateValue, delay]);

  return [debouncedValue, setImmediateValue, immediateValue];
}

export default useDebounce;
