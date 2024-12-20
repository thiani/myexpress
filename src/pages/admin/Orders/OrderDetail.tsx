// src/pages/admin/Orders/OrderDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import { formatPrice, formatDate } from '../../../utils/helpers';

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  deliveryMethod: string;
  trackingNumber?: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrder({
          id: '1',
          orderNumber: 'ORD-001',
          date: '2024-03-20T10:30:00',
          status: 'completed',
          paymentStatus: 'paid',
          paymentMethod: 'M-PESA',
          transactionId: 'MPESA123456',
          deliveryMethod: 'Standard Shipping',
          trackingNumber: 'TRACK123456',
          customer: {
            id: 'CUST001',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+254712345678'
          },
          shippingAddress: {
            street: '123 Main Street',
            city: 'Nairobi',
            state: 'Nairobi',
            country: 'Kenya',
            postalCode: '00100'
          },
          items: [
            {
              id: '1',
              name: 'Premium Brake Pads',
              sku: 'BP-001',
              price: 8500,
              quantity: 2,
              total: 17000
            },
            {
              id: '2',
              name: 'Oil Filter',
              sku: 'OF-002',
              price: 1500,
              quantity: 1,
              total: 1500
            }
          ],
          subtotal: 18500,
          shipping: 500,
          tax: 2960,
          total: 21960
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading || !order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[
          { label: 'Orders', href: '/admin/orders' },
          { label: `Order ${order.orderNumber}` }
        ]} 
      />

      <AdminHeader 
        title={`Order ${order.orderNumber}`}
        actions={
          <div className="flex items-center space-x-4">
            <StatusBadge status={order.status} />
            <button className="px-4 py-2 bg-brand-blue-500 text-white rounded-lg hover:bg-brand-blue-600">
              Update Status
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium">Order Items</h3>
            </div>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Package className="w-10 h-10 text-gray-400" />
                    <div>
                      <Link 
                        to={`/admin/products/${item.id}`}
                        className="font-medium text-gray-900 hover:text-brand-blue-500"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(item.price)} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    {formatPrice(item.total)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Contact Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2" />
                    {order.customer.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {order.customer.phone}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Shipping Address</h4>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 mt-1" />
                  <div>
                    <div>{order.shippingAddress.street}</div>
                    <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                    <div>{order.shippingAddress.country}, {order.shippingAddress.postalCode}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">Payment & Shipping</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Payment Details</h4>
                <div className="space-y-2 text-gray-600">
                  <div>Method: {order.paymentMethod}</div>
                  <div>Status: <StatusBadge status={order.paymentStatus} size="sm" /></div>
                  {order.transactionId && <div>Transaction ID: {order.transactionId}</div>}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shipping Details</h4>
                <div className="space-y-2 text-gray-600">
                  <div>Method: {order.deliveryMethod}</div>
                  {order.trackingNumber && (
                    <div>Tracking Number: {order.trackingNumber}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;