import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { AuthContext } from "./AuthContextDef";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return unsub;
  }, []);

  const signIn = () => signInWithPopup(auth, provider);
  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
