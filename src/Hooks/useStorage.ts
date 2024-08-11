import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Initialize state with the default value
  const [value, setValue] = useState<T>(() => {
    // Get stored value from localStorage if it exists
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useEffect(() => {
    // Update localStorage whenever the value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Function to update the value in state and localStorage
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Only return the updateValue function
  return updateValue;
};

export default useLocalStorage;
