// src/utils/adminHelpers.ts

import { 
    AdminRole, 
    AdminPagination, 
    AdminQueryParams,
    AdminFilterConfig,
    AdminUser,
    AdminStats 
  } from '../types/admin';
  
  export const hasPermission = (userRole: AdminRole, requiredRoles: AdminRole[]): boolean => {
    const roleHierarchy: { [key in AdminRole]: number } = {
      admin: 3,
      manager: 2,
      editor: 1
    };
  
    const userRoleLevel = roleHierarchy[userRole];
    const requiredLevel = Math.max(...requiredRoles.map(role => roleHierarchy[role]));
  
    return userRoleLevel >= requiredLevel;
  };
  
  export const formatPaginationParams = (params: Partial<AdminPagination>): AdminQueryParams['pagination'] => {
    return {
      page: params.page || 1,
      limit: params.limit || 10,
      total: params.total || 0,
      totalPages: params.totalPages || 0
    };
  };
  
  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  export const calculateGrowth = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
  
  export const formatDateForAdmin = (date: Date | string): string => {
    return new Intl.DateTimeFormat('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };
  
  export const buildFilterQuery = (filters: AdminFilterConfig[]): string => {
    return filters
      .map(filter => `${filter.field}:${filter.operator}:${filter.value}`)
      .join(',');
  };
  
  export const parseFilterQuery = (query: string): AdminFilterConfig[] => {
    if (!query) return [];
    return query.split(',').map(filter => {
      const [field, operator, value] = filter.split(':');
      return { field, operator, value } as AdminFilterConfig;
    });
  };
  
  export const getUserFullName = (user: AdminUser): string => {
    return `${user.firstName} ${user.lastName}`.trim();
  };
  
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const getStatsDifference = (
    currentStats: AdminStats,
    previousStats: AdminStats
  ): { [key: string]: number } => {
    return {
      revenue: calculateGrowth(currentStats.totalRevenue, previousStats.totalRevenue),
      orders: calculateGrowth(currentStats.totalOrders, previousStats.totalOrders),
      customers: calculateGrowth(currentStats.totalCustomers, previousStats.totalCustomers),
      averageOrder: calculateGrowth(currentStats.averageOrderValue, previousStats.averageOrderValue)
    };
  };
  
  export const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };
  
  export const generateStatsReport = (stats: AdminStats): string => {
    return `
  Revenue: ${formatCurrency(stats.totalRevenue)}
  Orders: ${stats.totalOrders}
  Customers: ${stats.totalCustomers}
  Average Order Value: ${formatCurrency(stats.averageOrderValue)}
  Growth:
  - Revenue: ${stats.growth.revenue.toFixed(1)}%
  - Orders: ${stats.growth.orders.toFixed(1)}%
  - Customers: ${stats.growth.customers.toFixed(1)}%
    `.trim();
  };
  
  export const sanitizeAdminInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  };
  
  export const validatePasswordStrength = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };