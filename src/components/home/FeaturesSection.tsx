import React from 'react';
import { Truck, Shield, Clock, CreditCard } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Free Shipping",
      description: "Free shipping on orders over KES50,000"
    },
    {
      icon: <Shield className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Warranty Guaranteed",
      description: "All parts come with warranty coverage"
    },
    {
      icon: <Clock className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "24/7 Support",
      description: "Expert assistance around the clock"
    },
    {
      icon: <CreditCard className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Secure Payment",
      description: "Multiple secure payment options"
    }
  ];

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-3 md:p-4 lg:p-5 
                bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                flex items-center justify-center rounded-full 
                bg-brand-blue-50 text-brand-blue-500 mb-2.5 md:mb-3 lg:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;