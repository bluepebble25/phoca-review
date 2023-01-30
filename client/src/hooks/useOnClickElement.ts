import React, { useEffect } from 'react';

/**
 * ref가 등록된 엘리먼트를 정확히 클릭하면 handler 함수를 실행하는 hook이다. 주로 모달의 Dimmed 요소를 닫을 때 사용할 수 있다.
 * @param ref
 * @param handler
 */
const useOnClickElement = (
  ref: React.RefObject<HTMLElement>,
  handler: Function
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const target = e.target as HTMLElement;
      if (ref.current === target) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickElement;
