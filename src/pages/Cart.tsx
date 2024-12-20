// src/pages/Cart.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag,
  Phone,
  CreditCard,
  Truck,
  Shield,
  Check
} from 'lucide-react';
import MpesaPayment from '../components/common/MpesaPayment';
import { useCart } from '../hooks/useCart';
import { usePayment } from '../hooks/usePayment';
import { formatPrice } from '../utils/helpers';
import type { MpesaPayment as IMpesaPayment } from '../types/payment';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotals } = useCart();
  const { initiatePayment, isProcessing, paymentState } = usePayment();
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { subtotal, total, deliveryFee } = calculateTotals();
  const tax = subtotal * 0.16; // 16% VAT

  const handleMpesaPayment = async (phoneNumber: string) => {
    const payment: IMpesaPayment = {
      phoneNumber,
      amount: total,
      reference: `ORDER-${Date.now()}`,
      orderDetails: {
        items: cart.items.map(item => ({
          id: item.productId,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        deliveryFee
      }
    };

    try {
      await initiatePayment(payment);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-brand-blue-500 hover:bg-brand-blue-600 
              text-white rounded-lg font-medium transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | AutoParts</title>
        <meta name="description" content="Review and checkout your auto parts order." />
      </Helmet>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg 
          shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <Check className="h-5 w-5" />
          Payment initiated successfully
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {cart.items.map((item) => (
                <div key={item.productId} className="p-6">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                    <img
  src={item.product.images[0]?.url || '/api/placeholder/400/400'}
  alt={item.product.name}
  className="w-full h-full object-contain p-2 rounded-lg"
/>
                    </div>
                    <div className="ml-6 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-brand-blue-500">{item.product.brand}</p>
                          <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-brand-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg
                              disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center border-x py-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg
                              disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-bold text-lg">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Truck className="h-6 w-6 text-brand-blue-500" />
                <div>
                  <h3 className="font-medium">Free Delivery</h3>
                  <p className="text-sm text-gray-600">On orders above KES 5,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="h-6 w-6 text-brand-blue-500" />
                <div>
                  <h3 className="font-medium">Secure Payments</h3>
                  <p className="text-sm text-gray-600">M-PESA and card payments</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link 
                to="/products" 
                className="text-brand-blue-500 hover:text-brand-blue-600 inline-flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (16%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-gray-900">Select Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2
                      transition-colors ${
                        paymentMethod === 'mpesa'
                          ? 'border-brand-green-500 bg-brand-green-50'
                          : 'border-gray-200 hover:border-brand-green-500'
                      }`}
                  >
                    <Phone className={`h-6 w-6 ${
                      paymentMethod === 'mpesa' ? 'text-brand-green-500' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">M-PESA</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2
                      transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-brand-blue-500 bg-brand-blue-50'
                          : 'border-gray-200 hover:border-brand-blue-500'
                      }`}
                  >
                    <CreditCard className={`h-6 w-6 ${
                      paymentMethod === 'card' ? 'text-brand-blue-500' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">Card</span>
                  </button>
                </div>

                {paymentMethod === 'mpesa' && (
                  <MpesaPayment
                    amount={total}
                    onSubmit={handleMpesaPayment}
                    isProcessing={isProcessing}
                  />
                )}

                {paymentMethod === 'card' && (
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-brand-blue-500" />
                    </div>
                    <p className="text-center text-gray-600">
                      Card payment integration coming soon...
                    </p>
                  </div>
                )}

                <div className="text-sm text-gray-500 text-center">
                  <p>By proceeding, you agree to our terms and conditions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;