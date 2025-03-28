
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import { toast } from "sonner";

export interface PasswordEntry {
  id: string;
  userId: string;
  serviceName: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PasswordsContextType {
  passwords: PasswordEntry[];
  isLoading: boolean;
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

  const loadPasswords = () => {
    setIsLoading(true);
    try {
      // In a real app, this would fetch from an API
      const storedPasswords = localStorage.getItem(`passwords_${user?.id}`);
      if (storedPasswords) {
        setPasswords(JSON.parse(storedPasswords));
      } else {
        setPasswords([]);
      }
    } catch (error) {
      console.error("Failed to load passwords:", error);
      toast.error("Falha ao carregar senhas");
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = new Date().toISOString();
      const newPassword: PasswordEntry = {
        id: crypto.randomUUID(),
        userId: user.id,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      
      const updatedPasswords = [...passwords, newPassword];
      setPasswords(updatedPasswords);
      savePasswords(updatedPasswords);
      return true;
    } catch (error) {
      console.error("Failed to add password:", error);
      toast.error("Falha ao adicionar senha");
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPasswords = passwords.map(password => 
        password.id === id
          ? { ...password, ...data, updatedAt: new Date().toISOString() }
          : password
      );
      
      setPasswords(updatedPasswords);
      savePasswords(updatedPasswords);
      return true;
    } catch (error) {
      console.error("Failed to update password:", error);
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPasswords = passwords.filter(password => password.id !== id);
      setPasswords(updatedPasswords);
      savePasswords(updatedPasswords);
      return true;
    } catch (error) {
      console.error("Failed to delete password:", error);
      toast.error("Falha ao excluir senha");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getPassword = (id: string): PasswordEntry | undefined => {
    return passwords.find(password => password.id === id);
  };

  return (
    <PasswordsContext.Provider
      value={{
        passwords,
        isLoading,
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
