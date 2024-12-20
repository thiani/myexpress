import React from 'react';
import { useForm } from 'react-hook-form';
import type { CategoryFormData } from '../../../types/admin';

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: {
      status: 'active',
      featured: false,
      ...initialData
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.name?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message.toString()}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('slug', { required: 'Slug is required' })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.slug?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.slug.message.toString()}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Category</label>
          <select
            {...register('parentCategory')}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          >
            <option value="">None</option>
            <option value="auto-parts">Auto Parts</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('featured')}
            className="h-4 w-4 rounded border-gray-300 text-brand-blue-500 
              focus:ring-brand-blue-500"
          />
          <label className="text-sm text-gray-700">Featured Category</label>
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon</label>
          <input
            type="text"
            {...register('icon')}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Meta Title</label>
          <input
            type="text"
            {...register('metaTitle')}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea
            {...register('metaDescription')}
            rows={2}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Display Order</label>
          <input
            type="number"
            {...register('displayOrder')}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-brand-blue-500 text-white rounded-lg 
            hover:bg-brand-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed 
            flex items-center"
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSubmitting ? 'Saving...' : 'Save Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;