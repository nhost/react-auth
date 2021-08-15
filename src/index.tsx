import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

export function NhostAuthProvider({
  children,
  nhost,
}: {
  children: ReactNode;
  nhost: any;
}) {
  const [authContext, setAuthContext] = useState({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  let unsubscribe: Function;

  const [constructorHasRun, setConstructorHasRun] = useState(false);

  // only run once
  const constructor = () => {
    if (constructorHasRun) return;

    unsubscribe = nhost.auth.onAuthStateChanged((_event: any, session: any) => {
      setAuthContext({
        user: session?.user,
        isLoading: false,
        isAuthenticated: session !== null,
      });
    });
    setConstructorHasRun(true);
  };

  constructor();

  useEffect(() => {
    return () => {
      try {
        unsubscribe();
      } catch (error) {}
    };
  });

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export function useNhostAuth() {
  return useContext(AuthContext);
}
