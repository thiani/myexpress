// src/context/AdminContext.tsx
import React, { createContext, useState, useCallback } from 'react';

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

interface AdminContextType {
  stats: AdminStats;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await new Promise<AdminStats>((resolve) => {
        setTimeout(() => {
          resolve({
            totalOrders: 1250,
            totalRevenue: 2500000,
            totalCustomers: 850,
            totalProducts: 320
          });
        }, 1000);
      });

      setStats(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch admin stats');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshStats = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  return (
    <AdminContext.Provider value={{
      stats,
      isLoading,
      error,
      fetchStats,
      refreshStats
    }}>
      {children}
    </AdminContext.Provider>
  );
};