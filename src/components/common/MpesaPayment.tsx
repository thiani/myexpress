// src/components/common/MpesaPayment.tsx
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { isValidKenyanPhone, formatPhoneForMpesa } from '../../utils/helpers';

interface MpesaPaymentProps {
  amount: number;
  onSubmit: (phoneNumber: string) => Promise<void>;
  isProcessing: boolean;
}

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ amount, onSubmit, isProcessing }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidKenyanPhone(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    try {
      await onSubmit(formatPhoneForMpesa(phoneNumber));
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-center mb-6">
        <img 
          src="/mpesa-logo.png" 
          alt="M-PESA Logo" 
          className="h-12"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            M-PESA Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="e.g., 0712 345 678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 
                focus:ring-brand-blue-500/20 focus:border-brand-blue-500"
            />
          </div>
          {error && <p className="mt-1 text-sm text-brand-red-500">{error}</p>}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Amount:</span>
            <span>KES {amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Transaction Fee:</span>
            <span>KES 0</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 rounded-lg 
            font-medium transition-colors flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay with M-PESA'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          You will receive a prompt on your phone to complete the payment
        </p>
      </form>
    </div>
  );
};

export default MpesaPayment;