// src/hooks/usePayment.ts
import { useContext } from 'react';
import PaymentContext from '../context/PaymentContext';
import type { PaymentContextType } from '../types/payment';

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};