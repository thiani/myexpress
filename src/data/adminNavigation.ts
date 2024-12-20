// src/data/adminNavigation.ts
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tags,
    Settings,
    type LucideIcon,
  } from 'lucide-react';
  
  interface NavigationItem {
    title: string;
    path: string;
    icon: LucideIcon;
  }
  
  interface NavigationGroup {
    title: string;
    items: NavigationItem[];
  }
  
  export const adminNavigation: NavigationGroup[] = [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          path: '/admin',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Catalog',
      items: [
        {
          title: 'Products',
          path: '/admin/products',
          icon: Package,
        },
        {
          title: 'Categories',
          path: '/admin/categories',
          icon: Tags,
        },
      ],
    },
    {
      title: 'Sales',
      items: [
        {
          title: 'Orders',
          path: '/admin/orders',
          icon: ShoppingCart,
        },
        {
          title: 'Customers',
          path: '/admin/customers',
          icon: Users,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          title: 'Settings',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ];