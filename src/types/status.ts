// src/types/status.ts

export type StatusType = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'pending' 
  | 'active' 
  | 'inactive' 
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'paid';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export const mapOrderStatusToStatusType = (status: OrderStatus): StatusType => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'processing':
      return 'processing';
    case 'completed':
      return 'completed';
    case 'cancelled':
      return 'cancelled';
  }
};

export const mapPaymentStatusToStatusType = (status: PaymentStatus): StatusType => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'paid':
      return 'paid';
    case 'failed':
      return 'failed';
  }
};