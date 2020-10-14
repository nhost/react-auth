interface useAuthProps {
  signedIn: boolean | null;
}
export function NhostAuthProvider(auth: any): JSX.Element;
export function useAuth(): useAuthProps;
