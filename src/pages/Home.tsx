import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import VehicleSearch from '../components/home/VehicleSearch';
import FeaturesSection from '../components/home/FeaturesSection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AutoParts - Quality Auto Parts for Every Vehicle</title>
        <meta 
          name="description" 
          content="Find quality auto parts for your vehicle. Wide selection of genuine and aftermarket parts with fast shipping."
        />
      </Helmet>
      
      <div className="flex flex-col">
        <div className="relative">
          <HeroSection />
          <div className="container mx-auto px-4">
            <VehicleSearch />
          </div>
        </div>
        
        <FeaturesSection />
        
        <CategorySection />
        
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top Rated Parts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and highly-rated auto parts, trusted by mechanics 
                and car enthusiasts worldwide.
              </p>
            </div>
          </div>
          <FeaturedProducts />
        </div>
        
        <section className="bg-brand-blue-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Finding the Right Part?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our auto parts experts are here to help you find the perfect parts for your vehicle.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-brand-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
              <button className="bg-brand-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-green-600 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;