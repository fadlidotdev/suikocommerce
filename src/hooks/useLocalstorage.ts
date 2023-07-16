import {useCallback, useEffect, useState} from "react";

const useLocalstorage = <T>(key: string, fallbackValue?: T) => {
  const [value, setValue] = useState<T | null>(null);

  const readValue = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const stored = window.localStorage.getItem(key);

      return stored ? (JSON.parse(stored) as T) : fallbackValue ?? null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Error reading value key of " + key);
      return null;
    }
  }, [key, fallbackValue]);

  useEffect(
    () => {
      setValue(readValue());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return value;
};

export default useLocalstorage;
