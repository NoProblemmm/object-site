import { useState, useEffect } from "react";

export type TSetter<T> = ((value: T) => T) | T;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : initialValue;

  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.error("Error localStorage:", err);
      }
    }
  }, [key, state]);

  return [
    state,
    (newValue: TSetter<T>) => {
      if (typeof newValue === "function") {
        setState(newValue);
      } else {
        setState(newValue);
      }
    },
  ];
}
