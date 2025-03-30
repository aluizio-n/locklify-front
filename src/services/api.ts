
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

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional pois não queremos expor a senha em todos os lugares
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

  // Authentication endpoints
  auth: {
    // Login user
    async login(email: string, password: string): Promise<{ user: User; token?: string }> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to authenticate');
        }

        return await response.json();
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to login: ${errorMessage}`);
        throw error;
      }
    },

    // Check if user is authenticated
    async checkAuth(): Promise<{ authenticated: boolean; user?: User }> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/auth/check`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          return { authenticated: false };
        }

        return await response.json();
      } catch (error) {
        console.error('Auth check error:', error);
        return { authenticated: false };
      }
    },

    // Logout user
    async logout(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({}), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to logout');
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to logout: ${errorMessage}`);
        throw error;
      }
    }
  },

  // User management endpoints
  users: {
    // Get all users
    async getAll(): Promise<User[]> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        return await response.json();
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to fetch users: ${errorMessage}`);
        throw error;
      }
    },

    // Register a new user
    async register(userData: { name: string; email: string; password: string }): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to register user');
        }

        return await response.json();
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to register user: ${errorMessage}`);
        throw error;
      }
    },

    // Update user
    async update(userId: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update user');
        }

        return await response.json();
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to update user: ${errorMessage}`);
        throw error;
      }
    },

    async updatePassword(userId: string, newPassword: string, currentPassword: string): Promise<{status: number}> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/update-password/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword, currentPassword }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update password');
        }

        return { status: 200 } ;
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error(`Failed to update password: ${errorMessage}`);
        return {status: 400};
      }
    },

    // Delete user
    async delete(userId: string): Promise<void> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/delete/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete user');
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(`Failed to delete user: ${errorMessage}`);
        throw error;
      }
    }
  }
};
