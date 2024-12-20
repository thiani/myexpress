// src/context/PaymentContext.tsx
import React, { createContext, useState, useCallback } from 'react';
import type { 
  PaymentContextType,
  PaymentState, 
  MpesaPayment, 
  MpesaResponse 
} from '../types/payment';

const initialPaymentState: PaymentState = {
  status: 'idle',
  error: null,
  checkoutRequestId: null
};

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentState, setPaymentState] = useState<PaymentState>(initialPaymentState);
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = useCallback(async (payment: MpesaPayment): Promise<MpesaResponse> => {
    setIsProcessing(true);
    setPaymentState({ ...initialPaymentState, status: 'processing' });

    try {
      // Mock API call - replace with your actual API endpoint
      const response = await new Promise<MpesaResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            MerchantRequestID: "12345",
            CheckoutRequestID: "67890",
            ResponseCode: "0",
            ResponseDescription: "Success",
            CustomerMessage: "Success"
          });
        }, 2000);
      });

      if (response.ResponseCode === "0") {
        setPaymentState({
          status: 'processing',
          error: null,
          checkoutRequestId: response.CheckoutRequestID
        });
        return response;
      } else {
        throw new Error(response.ResponseDescription);
      }
    } catch (error) {
      setPaymentState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Payment failed',
        checkoutRequestId: null
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const verifyPayment = useCallback(async (checkoutRequestId: string): Promise<boolean> => {
    try {
      // Mock verification - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPaymentState({
        status: 'success',
        error: null,
        checkoutRequestId
      });
      return true;
    } catch (error) {
      setPaymentState({
        status: 'error',
        error: 'Payment verification failed',
        checkoutRequestId
      });
      return false;
    }
  }, []);

  const resetPayment = useCallback(() => {
    setPaymentState(initialPaymentState);
    setIsProcessing(false);
  }, []);

  return (
    <PaymentContext.Provider value={{
      initiatePayment,
      verifyPayment,
      isProcessing,
      error: paymentState.error,
      paymentState,
      resetPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;