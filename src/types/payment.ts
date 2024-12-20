// src/types/payment.ts
import type { CartItem } from './cart';

export interface MpesaPayment {
  phoneNumber: string;
  amount: number;
  reference: string;
  orderDetails: {
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    deliveryFee: number;
  };
}

export interface MpesaResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  checkoutRequestId: string | null;
}

export interface PaymentContextType {
  initiatePayment: (payment: MpesaPayment) => Promise<MpesaResponse>;
  verifyPayment: (checkoutRequestId: string) => Promise<boolean>;
  isProcessing: boolean;
  error: string | null;
  paymentState: PaymentState;
  resetPayment: () => void;
}