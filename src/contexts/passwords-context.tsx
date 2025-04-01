
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import { toast } from "sonner";

export interface PasswordEntry {
  id: string;
  userId: string;
  serviceName: string;
  email: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PasswordsContextType {
  passwords: PasswordEntry[];
  isLoading: boolean;
  loadPasswords: () => Promise<void>;
  addPassword: (data: Omit<PasswordEntry, "id" | "userId" | "createdAt" | "updatedAt">) => Promise<boolean>;
  updatePassword: (id: string, data: Partial<Omit<PasswordEntry, "id" | "userId">>) => Promise<boolean>;
  deletePassword: (id: string) => Promise<boolean>;
  getPassword: (id: string) => PasswordEntry | undefined;
}

const PasswordsContext = createContext<PasswordsContextType | undefined>(undefined);

export function usePasswords() {
  const context = useContext(PasswordsContext);
  if (context === undefined) {
    throw new Error("usePasswords must be used within a PasswordsProvider");
  }
  return context;
}

export function PasswordsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPasswords();
    } else {
      setPasswords([]);
      setIsLoading(false);
    }
  }, [user]);

  const loadPasswords = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:3000/user/accounts", {
        method: "GET",
        credentials: "include", // Importante para enviar cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Falha ao buscar senhas");
      }
  
      const data = await response.json();
      setPasswords(data);
    } catch (error) {
      console.error("Erro ao carregar senhas:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const savePasswords = (updatedPasswords: PasswordEntry[]) => {
    if (user) {
      localStorage.setItem(`passwords_${user.id}`, JSON.stringify(updatedPasswords));
    }
  };

  const addPassword = async (
    data: Omit<PasswordEntry, "id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Permite enviar cookies automaticamente
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao adicionar senha");
      }
  
      toast.success("Senha adicionada com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar senha:", error);
      toast.error("Erro ao adicionar senha");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (
    id: string,
    data: Partial<Omit<PasswordEntry, "id" | "userId">>
  ): Promise<boolean> => {
    if (!user) return false;
  
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/account/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Permite enviar cookies automaticamente
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao atualizar senha");
      }
  
      const updatedPassword = await response.json();
      const updatedPasswords = passwords.map((password) =>
        password.id === id ? { ...password, ...updatedPassword, updatedAt: new Date().toISOString() } : password
      );
  
      setPasswords(updatedPasswords);
      savePasswords(updatedPasswords);
  
      toast.success("Senha atualizada com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      toast.error("Falha ao atualizar senha");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const deletePassword = async (id: string): Promise<boolean> => {
    if (!user) return false;
  
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/account/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Permite enviar cookies automaticamente
        body: JSON.stringify({})
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir senha");
      }
  
      const updatedPasswords = passwords.filter((password) => password.id !== id);
  
      setPasswords(updatedPasswords);
      savePasswords(updatedPasswords);
  
      toast.success("Senha excluída com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao excluir senha:", error);
      toast.error("Falha ao excluir senha");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const getPassword = (id: string): PasswordEntry | undefined => {
    return passwords.find((password) => password.id === id);
  };

  return (
    <PasswordsContext.Provider
      value={{
        passwords,
        isLoading,
        loadPasswords,
        addPassword,
        updatePassword,
        deletePassword,
        getPassword,
      }}
    >
      {children}
    </PasswordsContext.Provider>
  );
}
