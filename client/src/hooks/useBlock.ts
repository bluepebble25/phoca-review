import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 브라우저에서 뒤로가기, 새로고침, 창 닫기를 하려는 것을 방지할 필요가 있는 페이지에서 useBlock() 형태로 호출해서 사용한다.
 * 현재 페이지를 벗어나려는 행위를 하려고 할 시 confirm 창을 띄우고 의사를 물어본다.
 * @returns void
 * @param message confirm 창에 띄울 메시지
 */
export const useBlock = (message: string) => {
  const navigate = useNavigate();

  const preventGoBack = useCallback(() => {
    window.history.pushState(null, '', window.location.href);
    const result = window.confirm(message);
    if (result) {
      navigate('/');
    }
  }, [message, navigate]);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);
    window.addEventListener('beforeunload', preventClose);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
      window.removeEventListener('beforeunload', preventClose);
    };
  }, [preventGoBack]);
};
