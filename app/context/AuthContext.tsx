"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  email: string;
  userId?: string;
  username?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const fetchUser = async () => {

    try {
      const response = await fetch(
        "https://backend-kiy4.onrender.com/profile",
        {
          credentials:"include"
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  fetchUser();
}, []);

  const login = (userData: User) => {
  setIsLoggedIn(true);
  setUser(userData);
  };

  const logout = async () => {
  try {
    await fetch("https://backend-kiy4.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }

  setIsLoggedIn(false);
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}