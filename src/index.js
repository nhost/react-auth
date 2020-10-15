import React, { createContext, useState, useEffect } from 'react'
export const AuthContext = createContext({ signedIn: null })

export function NhostAuthProvider({ auth, children }) {
  const [signedIn, setSignedIn] = useState(auth.isAuthenticated())
  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      setSignedIn(data)
    })
  }, [auth.onAuthStateChanged])

  return (
    <AuthContext.Provider value={{ signedIn }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
