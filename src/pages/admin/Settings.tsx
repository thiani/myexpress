import React from 'react';
import AdminHeader from '../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../components/admin/common/AdminBreadcrumb';
import SettingsForm from '../../components/admin/forms/SettingsForm';

const Settings: React.FC = () => {
  // Mock initial settings data
  const initialSettings = {
    siteName: 'Zawabu Auto',
    contactEmail: 'sales@zawabuauto.co.ke',
    contactPhone: '0791314880',
    address: 'Opposite Twiga Sales and Next to Kingdom Bank, Nairobi',
    currency: 'KES',
    taxRate: 16,
    shippingThreshold: 5000,
    metaTitle: 'Zawabu Auto | Quality Auto Parts',
    metaDescription: 'Your trusted source for quality auto parts and accessories in Kenya'
  };

  const handleSubmit = async (data: any) => {
    try {
      // API call to update settings
      console.log('Updating settings:', data);
      // Show success notification
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Show error notification
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Settings"
        onMenuClick={() => {}}
      />

      <div className="max-w-4xl mx-auto px-6">
        <AdminBreadcrumb
          items={[
            { label: 'Settings' }
          ]}
        />

        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Store Settings
          </h2>

          <SettingsForm
            initialData={initialSettings}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;