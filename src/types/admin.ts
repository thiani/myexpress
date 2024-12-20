// src/types/admin.ts

export type AdminRole = 'admin' | 'manager' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  growth: {
    revenue: number;
    orders: number;
    customers: number;
  };
}

export interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface AdminMenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: AdminMenuItem[];
  permissions?: AdminRole[];
}

export interface AdminTableColumn<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface AdminPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminSortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface AdminFilterConfig {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains';
  value: string | number | boolean;
}

export interface AdminQueryParams {
  pagination: AdminPagination;
  sort?: AdminSortConfig;
  filters?: AdminFilterConfig[];
  search?: string;
}

export interface AdminResponse<T> {
  data: T;
  pagination?: AdminPagination;
  error?: string;
}

export interface AdminContextType {
  user: AdminUser | null;
  stats: AdminStats | null;
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  updateProfile: (data: Partial<AdminUser>) => Promise<void>;
  fetchStats: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Add CategoryFormData type
export interface CategoryFormData {
  name: string;
  description: string;
  slug: string;
  icon: string;
  featured: boolean;
  parentCategory?: string;
  status: 'active' | 'inactive';
  metaTitle?: string;
  metaDescription?: string;
  displayOrder?: number;
}

export interface Category extends CategoryFormData {
  id: string;
  productsCount: number;
  createdAt: string;
  updatedAt: string;
}
