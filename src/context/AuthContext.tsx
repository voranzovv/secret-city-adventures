import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  avatarId: string | null;
  level: number;
  xp: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setName: (name: string) => Promise<void>;
  setAvatar: (avatarId: string) => Promise<void>;
  hasCompletedOnboarding: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "sca_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved user on app start
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load user", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = async (updated: User) => {
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const login = async (email: string, _password: string) => {
    // TODO: replace with real API call
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: null,
      avatarId: null,
      level: 1,
      xp: 0,
    };
    await persist(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const setName = async (name: string) => {
    if (!user) return;
    await persist({ ...user, name });
  };

  const setAvatar = async (avatarId: string) => {
    if (!user) return;
    await persist({ ...user, avatarId });
  };

  const hasCompletedOnboarding = !!(user?.name && user?.avatarId);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        setName,
        setAvatar,
        hasCompletedOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
