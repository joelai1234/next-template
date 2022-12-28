import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useAuth } from '../../hooks/useAuth';

interface Props {
  setInterval: (time: number) => void;
}

export default function RefreshTokenHandler({ setInterval }: Props) {
  const { data: session } = useSession();
  const { logout } = useAuth();

  useEffect(() => {
    console.log(session);
    if (session?.user.error === 'RefreshAccessTokenError') {
      logout();
    }
    if (session && session.user.accessTokenExpires) {
      const timeRemaining = Math.round(
        (session.user.accessTokenExpires - Date.now()) / 1000
      );
      setInterval(timeRemaining > 0 ? timeRemaining : 1);
      // if (timeRemaining <= 0) {
      //   signIn();
      // }
      console.log('timeRemaining', timeRemaining);
    }
  }, [session]);

  return null;
}
