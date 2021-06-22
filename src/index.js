import React, { createContext, useContext } from "react";

export const AuthContext = createContext({ signedIn: null });

export class NhostAuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.unsubscribe = null;

    this.state = {
      signedIn: props.auth.isAuthenticated(),
    };

    this.unsubscribe = props.auth.onAuthStateChanged((data) => {
        this.setState({ signedIn: data });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <AuthContext.Provider value={{ signedIn: this.state.signedIn }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
