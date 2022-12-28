import Cookies from 'js-cookie';
import { useState } from 'react';

export const useRememberMe = () => {
  const [status, setStatus] = useState(Boolean(Cookies.get('rememberMe')));

  const setRememberMe = (rememberMe: boolean) => {
    setStatus(rememberMe);
    if (rememberMe) {
      Cookies.set('rememberMe', 'true');
    } else {
      Cookies.remove('rememberMe');
    }
  };
  return { rememberMe: status, setRememberMe };
};
