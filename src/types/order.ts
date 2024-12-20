// src/types/order.ts
import type { CartItem } from './cart';
import type { PaymentStatus } from './payment';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentStatus: PaymentStatus;
  deliveryFee: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}