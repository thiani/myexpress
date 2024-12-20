// src/data/categories.ts
import { 
    Cog, 
    Disc, 
    Zap,
    Car,
    Lightbulb,
    Wrench,
    Filter,
    Fuel,
    LucideIcon
  } from 'lucide-react';
  
  export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    icon: LucideIcon;
    count: number;
    slug: string;
    subcategories: string[];
    featured: boolean;
  }
  
  export const categories: Category[] = [
    {
      id: '1',
      name: 'Engine Parts',
      description: 'Complete engine components and assemblies',
      image: '/api/placeholder/400/400',
      icon: Cog,
      count: 2450,
      slug: 'engine-parts',
      subcategories: [
        'Pistons & Rings',
        'Timing Belts',
        'Engine Mounts',
        'Cylinder Heads',
        'Gaskets'
      ],
      featured: true
    },
    {
      id: '2',
      name: 'Brake System',
      description: 'High-quality brake components for safe stopping',
      image: '/api/placeholder/400/400',
      icon: Disc,
      count: 1890,
      slug: 'brake-system',
      subcategories: [
        'Brake Pads',
        'Brake Discs',
        'Calipers',
        'Brake Fluid',
        'ABS Components'
      ],
      featured: true
    },
    {
      id: '3',
      name: 'Electrical',
      description: 'Comprehensive electrical system solutions',
      image: '/api/placeholder/400/400',
      icon: Zap,
      count: 2100,
      slug: 'electrical',
      subcategories: [
        'Batteries',
        'Alternators',
        'Starters',
        'Spark Plugs',
        'Sensors'
      ],
      featured: true
    },
    // ... add other categories
  ];