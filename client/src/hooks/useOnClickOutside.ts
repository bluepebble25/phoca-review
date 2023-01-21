import React, { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: Function
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
