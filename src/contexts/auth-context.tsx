import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<boolean>;
  updatePassword: (currentPassword: string, newPassword: string, userId:string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const authToken = Cookies.get("auth_token");
        if (authToken) {
          const { authenticated, user } = await api.auth.checkAuth();
          if (authenticated && user) {
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await api.auth.login(email, password);
  
      if (response && response.user) {
        setUser(response.user);
        return true;
      } else {
        console.log("Usuário não autenticado, retornando false.");
        return false;
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return false;
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const user = await api.users.register({ name, email, password });
      setUser(user);
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await api.auth.logout();
      setUser(null);
      Cookies.remove("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.users.update(user?.id, updatedUser);
      if (response) {
        setUser((prevUser) => ({ ...prevUser, ...updatedUser } as User));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (userId:string, newPassword: string, currentPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.users.updatePassword( userId, newPassword, currentPassword );
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
