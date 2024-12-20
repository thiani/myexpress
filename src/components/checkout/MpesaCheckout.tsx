// src/components/checkout/MpesaCheckout.tsx
import React, { useState } from 'react';
import { Phone } from 'lucide-react';

interface MpesaCheckoutProps {
  amount: number;
  onSubmit: (phoneNumber: string) => Promise<void>;
}

const MpesaCheckout: React.FC<MpesaCheckoutProps> = ({ amount, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await onSubmit(phoneNumber);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Pay with M-PESA</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="07XX XXX XXX"
              className="pl-10 w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default MpesaCheckout;