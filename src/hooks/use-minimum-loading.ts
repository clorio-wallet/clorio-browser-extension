import { useState, useEffect, useRef } from 'react';

export function useMinimumLoading(isLoading: boolean, minDuration: number = 500) {
  const [displayLoading, setDisplayLoading] = useState(isLoading);
  const startTime = useRef<number>(0);

  if (isLoading && !displayLoading) {
    setDisplayLoading(true);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      startTime.current = Date.now();
    } else {
      const elapsed = Date.now() - startTime.current;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        timeoutId = setTimeout(() => {
          setDisplayLoading(false);
        }, remaining);
      } else {
        timeoutId = setTimeout(() => {
          setDisplayLoading(false);
        }, 0);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, minDuration]);

  return displayLoading;
}
