import React, { useEffect } from "react";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push("/");
        return;
      }
      //reset user
      setUser({});
      setIsLoading(false);
      history.push("/login");
    });
    //clean functions
    return () => {
      unsubcribed();
    };
  }, [history]);
  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <div>...Loading</div> : children}
    </AuthContext.Provider>
  );
}
