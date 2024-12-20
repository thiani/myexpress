// src/components/admin/forms/SettingsForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface SettingsFormData {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  taxRate: number;
  shippingThreshold: number;
  metaTitle: string;
  metaDescription: string;
}

const SettingsForm: React.FC<{
  initialData?: Partial<SettingsFormData>;
  onSubmit: (data: SettingsFormData) => void;
}> = ({ initialData, onSubmit }) => {
  const { register, handleSubmit } = useForm<SettingsFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-medium">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input
              type="text"
              {...register('siteName')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              {...register('contactEmail')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="tel"
              {...register('contactPhone')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              {...register('currency')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
            <input
              type="number"
              {...register('taxRate')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Free Shipping Threshold</label>
            <input
              type="number"
              {...register('shippingThreshold')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meta Title</label>
            <input
              type="text"
              {...register('metaTitle')}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea
              {...register('metaDescription')}
              rows={3}
              className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-brand-blue-500 rounded-lg hover:bg-brand-blue-600"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;