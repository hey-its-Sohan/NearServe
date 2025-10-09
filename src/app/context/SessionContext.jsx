"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SessionContext = createContext();

export const SessionProviderCustom = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id || null,
        name: session.user.name || "",
        email: session.user.email || "",
        role: session.user.role,
      });
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <SessionContext.Provider value={{ user, status }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook for easy access
export const useSessionData = () => useContext(SessionContext);
