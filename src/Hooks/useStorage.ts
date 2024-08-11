import { useState, useEffect } from "react";

type UseLocalStorageReturnType<T> = [
  T,
  (newValue: T) => void,
  (key: string) => void
];

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturnType<T> => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue) as T);
    }
  }, [key]);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = (key: string) => {
    setValue(defaultValue);
    localStorage.removeItem(key);
  };

  return [value, updateValue, removeValue];
};

export default useLocalStorage;
