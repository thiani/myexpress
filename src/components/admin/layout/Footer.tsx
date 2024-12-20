// src/components/admin/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-4 px-6 mt-8">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Zawabu Auto Admin
        </p>
        <div className="text-sm text-gray-500">
          Version 1.0.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;