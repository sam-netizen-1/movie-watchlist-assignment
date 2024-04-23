import { useState, useEffect } from "react";

const useDebounce = (
  value: string,
  effect: (value: string) => void,
  delay: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, effect, delay]);
};

export default useDebounce;
