// types/auth.ts
export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Session {
  user?: User;
}

// hooks/use-auth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setSession({ user: JSON.parse(user) });
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('user');
    setSession(null);
  };

  return {
    data: session,
    signOut
  };
};
