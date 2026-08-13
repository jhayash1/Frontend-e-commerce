"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: (token: string, userData: User) => void;
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
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Profile:", data);

      if (response.ok) {
        setIsLoggedIn(true);

        setUser({
          email: data.email,
        });
      }
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  fetchUser();
}, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);

  setIsLoggedIn(true);
  setUser(userData);
  };

  const logout = () => {
   localStorage.removeItem("token");

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