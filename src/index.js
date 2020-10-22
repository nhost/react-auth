import React, { createContext, useState, useContext, useEffect } from 'react'
export const AuthContext = createContext({ signedIn: null })

export function NhostAuthProvider({ auth, children }) {
  const [signedIn, setSignedIn] = useState()
  useEffect(() => {
    if (typeof signedIn === 'undefined') {
      setSignedIn(auth.isAuthenticated())
    }
    return auth.onAuthStateChanged((data) => {
      setSignedIn(data)
    })
  }, [auth.isAuthenticated, auth.onAuthStateChanged])

  return (
    <AuthContext.Provider value={{ signedIn }}>{children}</AuthContext.Provider>
  )
}
export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
