import React, { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { ProductFormData } from '../../../types/product';

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  submitText?: string;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  initialData, 
  onSubmit,
  submitText = 'Save Product',
  isSubmitting = false
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      brand: '',
      sku: '',
      images: [],
      ...initialData
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviewUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newPreviewUrls.push(URL.createObjectURL(files[i]));
    }
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be greater than 0' }
            })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.price?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          >
            <option value="">Select Category</option>
            <option value="brakes">Brakes</option>
            <option value="engine">Engine</option>
            <option value="suspension">Suspension</option>
            <option value="electrical">Electrical</option>
            <option value="filters">Filters</option>
          </select>
          {errors.category?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('brand', { required: 'Brand is required' })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.brand?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.brand.message.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('sku', { required: 'SKU is required' })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.sku?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.sku.message.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('stock', { 
              required: 'Stock is required',
              min: { value: 0, message: 'Stock cannot be negative' }
            })}
            className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
          />
          {errors.stock?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.stock.message.toString()}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-brand-blue-500"
        />
        {errors.description?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message.toString()}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="mt-1 border-2 border-dashed rounded-lg p-6">
          <div className="text-center">
            <div className="mt-4 flex flex-wrap gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newUrls = [...previewUrls];
                      newUrls.splice(index, 1);
                      setPreviewUrls(newUrls);
                      // You'll need to handle removing the file from the form data as well
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white 
                      hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border
                border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700
                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-brand-blue-500">
                <Upload className="h-5 w-5 mr-2 text-gray-400" />
                <span>Upload Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  {...register('images')}
                  onChange={handleImageChange}
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-brand-blue-500 rounded-lg hover:bg-brand-blue-600 
            disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSubmitting ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;