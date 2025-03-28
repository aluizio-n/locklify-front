
import { toast } from "sonner";

// Base API URL - change this to your backend URL
const API_BASE_URL = "http://localhost:3000"; // Update this with your actual backend URL

// Account interface to match the data structure from the backend
export interface Account {
  id: string;
  name: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Error handling helper
const handleApiError = (error: unknown): string => {
  console.error('API Error:', error);
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

// API service with methods for each endpoint
export const api = {
  // Create a new account
  async createAccount(accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE_URL}/account/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }

      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(`Failed to create account: ${errorMessage}`);
      throw error;
    }
  },

  // Get all accounts for the user
  async getAllAccounts(): Promise<Account[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch accounts');
      }

      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(`Failed to fetch accounts: ${errorMessage}`);
      throw error;
    }
  },

  // Get account by name
  async getAccountByName(name: string): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/accounts/${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch account');
      }

      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(`Failed to fetch account: ${errorMessage}`);
      throw error;
    }
  },

  // Update an account
  async updateAccount(accountId: string, accountData: Partial<Omit<Account, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE_URL}/account/update/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update account');
      }

      return await response.json();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(`Failed to update account: ${errorMessage}`);
      throw error;
    }
  },

  // Delete an account
  async deleteAccount(accountId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/account/delete/${accountId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(`Failed to delete account: ${errorMessage}`);
      throw error;
    }
  },
};
