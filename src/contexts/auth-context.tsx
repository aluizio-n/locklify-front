
import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on initial load
    const storedUser = localStorage.getItem("secureVaultUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user data - In real app, this would come from an API
      const users = JSON.parse(localStorage.getItem("secureVaultUsers") || "[]");
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Remove password before storing user in state
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("secureVaultUser", JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("secureVaultUsers") || "[]");
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password, // In a real app, this would be hashed
      };
      
      // Save users
      users.push(newUser);
      localStorage.setItem("secureVaultUsers", JSON.stringify(users));
      
      // Log in the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem("secureVaultUser", JSON.stringify(userWithoutPassword));
      
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("secureVaultUser");
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user in localStorage
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("secureVaultUser", JSON.stringify(updatedUser));
      
      // Also update the user in the users array
      const users = JSON.parse(localStorage.getItem("secureVaultUsers") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem("secureVaultUsers", JSON.stringify(updatedUsers));
      
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
