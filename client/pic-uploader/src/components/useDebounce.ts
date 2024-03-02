import React, {useState, useEffect} from 'react'


export const useDebouncedValue = (inputValue:any, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};
