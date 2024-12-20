// src/components/common/Input.tsx
import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: 'search' | 'none';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon = 'none',
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const baseInputStyles = `
    px-4 py-2 
    border rounded-lg 
    bg-white
    transition-colors
    focus:outline-none focus:ring-2 
    focus:border-brand-blue-500 focus:ring-brand-blue-500/20
  `;

  const errorStyles = error ? 
    'border-brand-red-500 focus:border-brand-red-500 focus:ring-brand-red-500/20' : 
    'border-gray-300';

  const widthStyles = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-auto'}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={`
            ${baseInputStyles}
            ${errorStyles}
            ${widthStyles}
            ${icon === 'search' ? 'pl-4 pr-10' : 'px-4'}
            ${className}
          `}
          {...props}
        />
        {icon === 'search' && (
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"
            aria-hidden="true"
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-brand-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;